/**
 * Created by dee on 2018/5/16.
 */
const MKODBAction = require('./MKODBAction')

class TeamDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_team';
  }

  async getTeam(page = 1, count = 20) {
    let dbConnection = null;
    let dataResult = null;
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT count(*) as recordCount FROM ${this.tableName}`
      let resultCount = await this.execSQL(sql, [], dbConnection);
      let recordCount = resultCount[0].recordCount;
      let pageCount = Math.floor((recordCount - 1) / count + 1);
      if (recordCount > 0) {
        sql = `SELECT a.id , b.type, b.open_id , b.gmt_create , b.nation_name , a.winner , c.id lotteryId FROM fifa_competition a LEFT JOIN fifa_team b ON a.id = b.competition_id LEFT JOIN fifa_lottery c ON a.id = c.competition_id WHERE b.open_id IS NOT NULL`;
        sql = `${sql} LIMIT ${(page - 1) * count}, ${count}`;
        let records = await this.execSQL(sql, [], dbConnection)
        dataResult = {page: page, pageCount: pageCount, count: count, countNumber: recordCount, datas: records}
      } else {
        dataResult = {page: page, pageCount: 0, count: count, countNumber: 0, datas: []}
      }
    } catch (e) {
      LOGGER.error(`getTeam error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }

  async getSLTeam(page = 1, count = 20) {
    let dbConnection = null;
    let dataResult = null;
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT count(*) as recordCount FROM fifa_image`
      let resultCount = await this.execSQL(sql, [], dbConnection);
      let recordCount = resultCount[0].recordCount;
      let pageCount = Math.floor((recordCount - 1) / count + 1);
      if (recordCount > 0) {
        sql = `SELECT * FROM fifa_image`;
        sql = `${sql} LIMIT ${(page - 1) * count}, ${count}`;
        let records = await this.execSQL(sql, [], dbConnection)
        dataResult = {page: page, pageCount: pageCount, count: count, countNumber: recordCount, datas: records}
      } else {
        dataResult = {page: page, pageCount: 0, count: count, countNumber: 0, datas: []}
      }
    } catch (e) {
      LOGGER.error(`getSLTeam error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }
}

module.exports = TeamDBAction;
