'use strict';
const bcrypt = require("bcrypt");
const { Admin, Watch, Image } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Admin.create({ login: 'vano', password: bcrypt.hashSync('123', 10) });
    const watch = await Watch.create({ name: 'Rolex for vano', description: 'This is description for vano' });
    const image = await Image.create({ path: 'images/d23lKC6.jpg' });
    await watch.addImage(image);
  },

  async down (queryInterface, Sequelize) {
    await Admin.truncate({ cascade: true });
    await Watch.truncate({ cascade: true });
    await Image.truncate({ cascade: true });
  }
};
