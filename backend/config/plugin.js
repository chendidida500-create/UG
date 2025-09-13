'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },
};