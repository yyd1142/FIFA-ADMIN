/**
 * Created by Kevin on 7/17/17.
 */
const MKODBAction = require('./MKODBAction')

class UserDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_admin_user';
  }

  async getUserByNameAndJobNumber(id) {
    let dbConnection = null
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      let records = await this.execSQL(sql, [id], dbConnection)
      dataResult = records[0];
    } catch (e) {
      LOGGER.error(`getUserByNameAndJobNumber error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }

  async getAdminUserByUserName(name, password) {
    let dbConnection = null;
    let dataResult = null;
    try {
      dbConnection = await this.getDBConnection();
      let sql = `SELECT * FROM ${this.tableName} WHERE user_name = ? AND password = ? LIMIT 1`;
      let records = await this.execSQL(sql, [name, password], dbConnection)
      dataResult = records[0];
    } catch (e) {
      LOGGER.error(`getAdminUserByUserName error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }
}

module.exports = UserDBAction;
