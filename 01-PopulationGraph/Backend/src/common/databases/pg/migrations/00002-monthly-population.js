module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize')} Sequelize
   * @returns {Promise<any>}
  */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbl_monthly_populations', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      province_code: {
        type: Sequelize.DataTypes.STRING(8),
        allowNull: false
      },
      periode: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
      },
      value: {
        type: Sequelize.DataTypes.DECIMAL(19, 5),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    }, {
      timestamps: false 
    })

    await queryInterface.addIndex('tbl_monthly_populations', ['province_code', 'periode'], {
      unique: true,
      name: 'uniq_province_periode'
    })

    await queryInterface.addConstraint('tbl_monthly_populations', {
      type: 'foreign key',
      name: 'fk_periode_monthly_population',
      fields: ['province_code'],
      references: {
        table: 'tbl_provinces',
        field: 'province_code'
      }
    })
  },
  /**
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').Sequelize} Sequelize
   * @returns {Promise<any>}
  */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('tbl_monthly_populations', 'uniq_province_periode')
    await queryInterface.dropTable('tbl_monthly_populations', { cascade: true, force: true })
  },
}