/**
 * Created by dee on 2018/5/14.
 */
const MKODBAction = require('./MKODBAction')

class PrizeDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_prize';
  }

  async getPrize(page = 1, count = 50){
    let dbConnection = null
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT count(*) as recordCount FROM ${this.tableName}`
      let resultCount = await this.execSQL(sql, [], dbConnection);
      let recordCount = resultCount[0].recordCount;
      let pageCount = Math.floor((recordCount - 1) / count + 1);
      if (recordCount > 0) {
        sql = `SELECT * FROM ${this.tableName}`;
        sql = `${sql} LIMIT ${(page - 1) * count}, ${count}`;
        let records = await this.execSQL(sql, [], dbConnection)
        dataResult = {page: page, pageCount: pageCount, count: count, countNumber: recordCount, datas: records}
      } else {
        dataResult = {page: page, pageCount: 0, count: count, countNumber: 0, datas: []}
      }
    } catch (e) {
      LOGGER.error(`getPrize error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }
}

module.exports = PrizeDBAction;
