/**
 * Created by dee on 2018/5/14.
 */
const MKODBAction = require('./MKODBAction')
const redisClient = require('./MKORedis')
const redisKey = 'FP_PRIZE'

class PrizeDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_prize';
  }

  async getPrize(page = 1, count = 50) {
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

  async addPrize(params) {
    let dbConnection = null;
    let dataResult = null;
    try {
      dbConnection = await this.getDBConnection();
      let sql = `INSERT INTO ${this.tableName} SET ?`;
      params['gmt_create'] = new Date();
      let dataResult = await this.execSQL(sql, params, dbConnection);
      if (dataResult) {
        redisClient.set(`${redisKey}_${dataResult.insertId}_${params.type}`, params.prize_count);
      }
    } catch (e) {
      LOGGER.error(`addPrize error: ${e.toString()}`);
    } finally {
      if (dbConnection)
        dbConnection.release();
    }
    return dataResult;
  }

  async getPrizeDetailById(id) {
    let dbConnection = null
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      sql = `${sql} LIMIT 1`;
      let records = await this.execSQL(sql, [id], dbConnection);
      dataResult = records[0];
    } catch (e) {
      LOGGER.error(`getPrizeDetailById error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }

  async editPrize(id, params) {
    let dbConnection = null;
    try {
      dbConnection = await this.getDBConnection();
      let sql = `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`;
      let records = await this.execSQL(sql, [id], dbConnection);
      if(records[0].id) {
        let key = `${redisKey}_${records[0].id}_${records[0].type}`;
        sql = `UPDATE ${this.tableName} SET prize_name = ?, prize_count = ?, prize_prob = ?, type = ? WHERE id = ?`;
        await this.execSQL(sql, [params.prize_name, params.prize_count, params.prize_prob, params.type,  id], dbConnection);
        if(redisClient.get(key)) {
          redisClient.del(key);
          redisClient.set(`${redisKey}_${id}_${params.type}`, params.prize_count);
        }
      }
    } catch (e) {
      LOGGER.error(`editPrize error: ${e.toString()}`);
    } finally {
      if (dbConnection)
        dbConnection.release();
    }
  }
}

module.exports = PrizeDBAction;
