'use strict';
module.exports = (sequelize, DataTypes) => {
  const Municipality = sequelize.define('Municipality', {
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    provinceId: DataTypes.INTEGER
  }, {});
  Municipality.associate = function(models) {
    // associations can be defined here
    Municipality.belongsTo(models.Province, { foreginKey: 'provinceId' });
  };
  return Municipality;
};