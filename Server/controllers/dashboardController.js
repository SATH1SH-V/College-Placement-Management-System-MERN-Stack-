const Company = require("../models/Company");
const Drive = require("../models/Drive");
const Student = require("../models/Student");

exports.getDashboardStats = async (req, res) => {
    try {
        const today = new Date();

        // Run all count queries in parallel for performance
        const [
            companyCount,
            upcomingDriveCount,
            pastDriveCount,
            placedStudentCount
        ] = await Promise.all([
            Company.countDocuments(),
            Drive.countDocuments({ date: { $gte: today } }),
            Drive.countDocuments({ date: { $lt: today } }),
            Student.countDocuments()
        ]);

        res.json({
            companies: companyCount,
            upcomingDrives: upcomingDriveCount,
            pastDrives: pastDriveCount,
            placedStudents: placedStudentCount
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
