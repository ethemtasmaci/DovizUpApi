const { DeviceToken } = require('../models');

exports.createDeviceToken = async (req, res) => {
  const { token } = req.body;

  try {
    const [deviceToken, created] = await DeviceToken.findOrCreate({
      where: { token }
    });
    res.status(201).json(deviceToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeviceTokens = async (req, res) => {
  try {
    const tokens = await DeviceToken.findAll();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
