const { Story } = require('../models');

exports.createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);
    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.findAll();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    await Story.update(req.body, { where: { id } });
    res.status(200).json({ message: 'Story updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    await Story.destroy({ where: { id } });
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
