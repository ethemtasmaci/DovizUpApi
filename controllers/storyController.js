const { Story } = require('../models');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../assets/img/veriTabaniResim');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('resim'); // Dosya alanı adı 'resim' olarak kalabilir

exports.createStory = async (req, res) => {
  try {
    const { paylasiciAdi, aciklama } = req.body;
    const resimUrl = req.file ? `/assets/img/veriTabaniResim/${req.file.filename}` : '';

    const story = await Story.create({
      paylasiciAdi, // Bu alanda da doğru isimlendirmeyi kullanın
      aciklama,
      resimUrl // Bu alanı güncellediğinizden emin olun
    });

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
