module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define('Story', {
      resim: {
        type: DataTypes.STRING,
        allowNull: false
      },
      paylasiciAdi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      aciklama: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
  
    return Story;
  };
  