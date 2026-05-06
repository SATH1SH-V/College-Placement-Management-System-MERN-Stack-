const Drive = require("../models/Drive");

// ADD DRIVE (already working)
exports.addDrive = async (req, res) => {
  try {
    const drive = await Drive.create(req.body);
    res.status(201).json(drive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ALL DRIVES
exports.getAllDrives = async (req, res) => {
  const drives = await Drive.find().populate("company");
  res.json(drives);
};

// UPCOMING DRIVES
exports.getUpcomingDrives = async (req, res) => {
  const today = new Date();
  const drives = await Drive.find({ date: { $gte: today } }).populate("company");
  res.json(drives);
};

// PAST DRIVES
exports.getPastDrives = async (req, res) => {
  const today = new Date();
  const drives = await Drive.find({ date: { $lt: today } }).populate("company");
  res.json(drives);
};

exports.deleteDrive = async (req, res) => {
  try {
    await Drive.findByIdAndDelete(req.params.id);
    res.json({ message: "Drive deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
