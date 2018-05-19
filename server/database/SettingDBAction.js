/**
 * Created by dee on 2018/5/19.
 */
const MKODBAction = require('./MKODBAction')

class SettingDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_admin_user';
  }

  async editPwdById(password, userId) {
    let dbConnection = null
    try {
      dbConnection = await this.getDBConnection();
      let sql = `UPDATE fifa_admin_user SET password = ? WHERE id = ?`;
      await this.execSQL(sql, [password, userId], dbConnection);
    } catch (e) {
      LOGGER.error(`editPwdById error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
  }
}

module.exports = SettingDBAction;
