const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, DeviceToken } = require('./models');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');
require('dotenv').config();

// Firebase Admin SDK yapılandırması
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

// Models ve Route'lar
const newsRoutes = require('./routes/newsRoutes');
const storyRoutes = require('./routes/storyRoutes');
const issueRoutes = require('./routes/issueRoutes');
const deviceTokenRoutes = require('./routes/deviceTokenRoutes');

// API Endpoints
app.use('/api/news', newsRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/device-tokens', deviceTokenRoutes);

// Veri çekme endpoint'i
app.get('/api/fetch-data', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://kur.doviz.com/');

    const data = await page.evaluate(() => {
      const results = [];
      const rows = document.querySelectorAll('.value-table .sortable .tablesorter tbody tr');
      rows.forEach(row => {
        const imgElement = row.querySelector('td a img');
        const imgSrc = imgElement ? imgElement.getAttribute('data-src') : '';
        const currencyDetails = row.querySelector('td a .currency-details div')?.innerText || '';
        const cname = row.querySelector('td a .currency-details .cname')?.innerText || '';
        const textBoldElements = row.querySelectorAll('td.text-bold');
        const textBold = Array.from(textBoldElements).map(element => element.innerText).join(' | ');

        results.push({ imgSrc, currencyDetails, cname, textBold });
      });
      return results;
    });

    await browser.close();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Bildirim gönderme endpoint'i
app.post('/api/notify', async (req, res) => {
  const { title, body, imageUrl } = req.body;

  try {
    // Cihaz tokenlarını veritabanından al
    const tokens = await DeviceToken.findAll();

    if (tokens.length === 0) {
      return res.status(400).json({ success: false, error: 'No device tokens found' });
    }
    const registrationTokens = tokens.map(token => token.token);
    
    const message = {
      notification: {
        title: title,
        body: body,
        imageUrl: imageUrl
      },
      tokens: registrationTokens,
    };

    const response = await admin.messaging().sendMulticast(message);
    res.status(200).json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Sunucu ayarları
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
