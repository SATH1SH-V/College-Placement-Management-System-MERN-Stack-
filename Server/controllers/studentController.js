const Student = require("../models/Student");
const Company = require("../models/Company");
const xlsx = require("xlsx");

exports.addPlacedStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPlacedStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("company");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Process each student row
    const results = [];
    const errors = [];

    // Pre-fetch all companies to avoid N+1 queries
    const allCompanies = await Company.find();

    for (const row of data) {
      // Flexible column mapping (try to find name-like, id-like etc)
      const name = row.Name || row.name || row["Student Name"];
      const studentId = row.StudentID || row.studentId || row["Roll No"] || row["ID"];
      const department = row.Department || row.department || row["Dept"];
      const companyName = row.CompanyName || row.companyName || row["Company"] || row["Placed In"];

      if (!name || !studentId || !department || !companyName) {
        errors.push(`Missing fields for student ${name || 'unknown'}`);
        continue;
      }

      // Find company by name (case-insensitive)
      const company = allCompanies.find(c => c.name.toLowerCase() === companyName.toLowerCase());

      if (!company) {
        errors.push(`Company "${companyName}" not found for student ${name}`);
        continue;
      }

      // Handle department capitalization/enum
      const deptUpper = department.toUpperCase();
      const validDepts = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "AIDS"];
      
      if (!validDepts.includes(deptUpper)) {
        errors.push(`Invalid department "${department}" for student ${name}`);
        continue;
      }

      results.push({
        name,
        studentId: studentId.toString(),
        department: deptUpper,
        company: company._id
      });
    }

    if (results.length > 0) {
      // Use insertMany with ordered: false to skip duplicates if unique index fails
      await Student.insertMany(results, { ordered: false });
    }

    res.status(201).json({
      message: `Successfully imported ${results.length} students.`,
      errors: errors.length > 0 ? errors : null
    });

  } catch (error) {
    console.error("Excel Upload Error:", error);
    res.status(500).json({ message: error.message });
  }
};
