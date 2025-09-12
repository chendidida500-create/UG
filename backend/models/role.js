"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, {
        through: "UserRoles",
        foreignKey: "roleId",
        otherKey: "userId",
      });

      Role.belongsToMany(models.Permission, {
        through: "RolePermissions",
        foreignKey: "roleId",
        otherKey: "permissionId",
      });
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role",
      underscored: true,
      timestamps: true,
    }
  );
  return Role;
};
