module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    resimUrl: { // 'resim' yerine 'resimUrl' kullanın
      type: DataTypes.STRING,
      allowNull: true // Resim URL'si opsiyonel olabilir
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
