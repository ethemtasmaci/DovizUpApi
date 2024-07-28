const { Issue } = require('../models');

exports.createIssue = async (req, res) => {
  const { baslik, aciklama, email } = req.body;

  try {
    const issue = await Issue.create({ baslik, aciklama, email });
    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.findAll();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
