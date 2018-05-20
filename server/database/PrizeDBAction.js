/**
 * Created by dee on 2018/5/14.
 */
const MKODBAction = require('./MKODBAction')
const redisClient = require('./MKORedis')
const redisKey = 'FP_PRIZE'
const fp_rankKey = `fp_rank`

redisClient.select("2", (err) => {
  if (err) {
    return false;
  } else {
    console.log('redis连接数据库2');
  }
});

class PrizeDBAction extends MKODBAction {
  constructor() {
    super();
    this.tableName = 'fifa_prize';
  }

  async getPrize(page = 1, count = 20) {
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
      if (records[0].id) {
        let key = `${redisKey}_${records[0].id}_${records[0].type}`;
        sql = `UPDATE ${this.tableName} SET prize_name = ?, prize_count = ?, prize_prob = ?, type = ? WHERE id = ?`;
        await this.execSQL(sql, [params.prize_name, params.prize_count, params.prize_prob, params.type, id], dbConnection);
        if (redisClient.get(key)) {
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

  async getLottery(page = 1, count = 20) {
    let dbConnection = null
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let fileds = `a.id , a.open_id , a.gmt_create , b.prize_name , c.address , c.name , c.phone , c.area , c.zip_code`;
      let sql = `SELECT count(*) as recordCount FROM fifa_lottery a LEFT JOIN fifa_prize b ON a.prize_id = b.id LEFT JOIN fifa_user c ON c.open_id = a.open_id`
      let resultCount = await this.execSQL(sql, [], dbConnection);
      let recordCount = resultCount[0].recordCount;
      let pageCount = Math.floor((recordCount - 1) / count + 1);
      if (recordCount > 0) {
        sql = `SELECT ${fileds} FROM fifa_lottery a LEFT JOIN fifa_prize b ON a.prize_id = b.id LEFT JOIN fifa_user c ON c.open_id = a.open_id`;
        sql = `${sql} LIMIT ${(page - 1) * count}, ${count}`;
        let records = await this.execSQL(sql, [], dbConnection)
        dataResult = {page: page, pageCount: pageCount, count: count, countNumber: recordCount, datas: records}
      } else {
        dataResult = {page: page, pageCount: 0, count: count, countNumber: 0, datas: []}
      }
    } catch (e) {
      LOGGER.error(`getLottery error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }

  async editLotteryAddressByOpenID(openId, params) {
    let dbConnection = null;
    try {
      dbConnection = await this.getDBConnection();
      let sql = `SELECT * FROM fifa_user WHERE open_id = ? LIMIT 1`;
      let records = await this.execSQL(sql, [openId], dbConnection);
      if (records[0].open_id) {
        sql = `UPDATE fifa_user SET address = ?, name = ?, phone = ?, area = ?, zip_code = ? WHERE open_id = ?`;
        await this.execSQL(sql, [params.address, params.name, params.phone, params.area, params.zip_code, openId], dbConnection);
      }
    } catch (e) {
      LOGGER.error(`editLotteryAddressByOpenID error: ${e.toString()}`);
    } finally {
      if (dbConnection)
        dbConnection.release();
    }
  }

  async updateRank() {
    return new Promise((resolve, reject) => {
      redisClient.get(fp_rankKey, (error, reply) => {
        let value = parseInt(reply);
        if(value >= 0) {
          if(value < 6) {
           redisClient.incr(fp_rankKey);
          }
        } else {
          redisClient.set(fp_rankKey, 0);
        }
        if(error) {
          reject(error);
          return;
        }
        if(value === null) {
          value = 0;
        } else if(value < 6){
          value = value + 1;
        }
        resolve(value);
      });
    })
  }
}

module.exports = PrizeDBAction;
