const express = require('express');
const app = express();
const { sequelize } = require('./models');
require('dotenv').config();

app.use(express.json());

const newsRoutes = require('./routes/newsRoutes');
const storyRoutes = require('./routes/storyRoutes');

app.use('/api/news', newsRoutes);
app.use('/api/stories', storyRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
