const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS paketini import edin
const path = require("path");
require("dotenv").config();
const { sequelize } = require("./models");
const admin = require("firebase-admin");

// Firebase Admin SDK yapılandırması
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();
app.use(cors()); // CORS'u etkinleştirin
app.use(bodyParser.json());

// Statik dosyaların sunulacağı dizini ayarlayın
app.use("/assets/img", express.static(path.join(__dirname, "assets/img")));

// Rotalar
const newsRoutes = require("./routes/newsRoutes");
const storyRoutes = require("./routes/storyRoutes");
const issueRoutes = require("./routes/issueRoutes");
const deviceTokenRoutes = require("./routes/deviceTokenRoutes");
const fetchDataRoutes = require("./routes/fetchDataRoutes");
const fetchDataRoutesDetay = require("./routes/fetchDataRoutesDetay");
const notifyRoutes = require("./routes/notifyRoutes");

app.use("/api/news", newsRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/device-tokens", deviceTokenRoutes);
app.use("/api/fetch-data", fetchDataRoutes);
app.use("/api/fetch-data-detay", fetchDataRoutesDetay);
app.use("/api/notify", notifyRoutes);

// Sunucu ayarları
const PORT = process.env.PORT || 3030;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
