
module.exports = {
  dialect: 'postgres',
  timezone: '+07:00',
  dialectOptions: {
    decimalNumbers: true
  },
  host: process.env['AFX_PG_URL'],
  port: parseInt(process.env['AFX_PG_PORT']),
  username: process.env['AFX_PG_USER'],
  password: String(process.env['AFX_PG_PSW']),
  database: process.env['AFX_PG_DBNAME']
}