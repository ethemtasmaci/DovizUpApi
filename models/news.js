module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
      resim: {
        type: DataTypes.STRING,
        allowNull: false
      },
      baslik: {
        type: DataTypes.STRING,
        allowNull: false
      },
      aciklama: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      haberKaynagi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      haberKaynakUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    return News;
  };
  