const DataPopulationJSON = require('../data-samples/data-population.json')

module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    const dateCreated = require('moment')().format('YYYY-MM-DD HH:mm:ss')
    await queryInterface.bulkInsert('tbl_monthly_populations', DataPopulationJSON.map(a => ({
      ...a,
      created_at: dateCreated
    })))
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('truncate table tbl_monthly_populations cascade;')
  },
}