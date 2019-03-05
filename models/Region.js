'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    code: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Region.associate = function(models) {
    // associations can be defined here

    // Region hasMany Provinces, 1 to many
    Region.hasMany(models.Province, {foreignKey: 'regionId'});
  };
  return Region;
};