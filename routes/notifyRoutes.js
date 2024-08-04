const express = require("express");
const admin = require("firebase-admin");
const { DeviceToken } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, body, imageUrl } = req.body;

  try {
    // Cihaz tokenlarını veritabanından al
    const tokens = await DeviceToken.findAll();

    if (tokens.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No device tokens found" });
    }
    const registrationTokens = tokens.map((token) => token.token);

    const message = {
      notification: {
        title: title,
        body: body,
        imageUrl: imageUrl,
      },
      tokens: registrationTokens,
    };

    const response = await admin.messaging().sendMulticast(message);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
