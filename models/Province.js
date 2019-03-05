'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('Province', {
    code: DataTypes.INTEGER,
    name: DataTypes.STRING,
    regionId: DataTypes.INTEGER
  }, {});
  Province.associate = function(models) {
    // associations can be defined here
    // Province has many municipalities
    Province.hasMany(models.Municipality, { foreignKey: 'provinceId' });
    Province.belongsTo(models.Region, {foreignKey: 'regionId'});
  };
  return Province;
};