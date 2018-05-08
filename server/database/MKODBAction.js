/**
 * Created by Kevin on 18/8/2016.
 */
'use strict'
const mysql = require('mysql')
const config = require('../config');

var mysqlPool = null
if (!mysqlPool) {
  mysqlPool = mysql.createPool(config.db)
}

class MKODBAction {
  constructor(tableName) {
    this.tableName = tableName;
    this.primaryKeyName = 'id'
  }

  getDBConnection() {
    return new Promise((resolve, reject) => {
      mysqlPool.getConnection((err, dbConnection) => {
        if (err) {
          reject(err)
          return
        }
        resolve(dbConnection)
      })
    })
  }

  async execSQL(sql, values, dbConnection) {
    return new Promise((resolve, reject) => {
      let start = new Date()
      let query = dbConnection.query(sql, values, function (err, result) {
        let ms = new Date() - start
        LOGGER.info(`EXEC SQL: "${query.sql}" ${ms}ms`)
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
    })
  }

  async newRecord(params) {
    let dbConnection = null
    let insertId = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `INSERT INTO ${this.tableName} SET ?`
      let insertResult = await this.execSQL(sql, params, dbConnection)
      insertId = insertResult.insertId
    } catch (e) {
      LOGGER.error(`newRecord error: ${e.toString()}`)
    } finally {
      if (dbConnection) {
        dbConnection.release()
      }
    }
    return insertId
  }

  async getRecordByID(id, fields) {
    let dbConnection = null
    fields = fields || '*'
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT ${fields} FROM ${this.tableName} WHERE ${this.primaryKeyName} = ? LIMIT 1`
      dataResult = await this.execSQL(sql, [id], dbConnection)
      if (dataResult && dataResult.length > 0) {
        dataResult = dataResult[0]
      }
    } catch (e) {
      LOGGER.error(`getRecordByID error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult
  }

  async updateRecordById(params, id) {
    let dbConnection = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `UPDATE ${this.tableName} SET ? WHERE ${this.primaryKeyName} = ?`
      await this.execSQL(sql, [params, id], dbConnection)
    } catch (e) {
      LOGGER.error(`updateRecordById error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
  }

  async removeRecordByID(fields, interFace, id) {
    let dbConnection = null
    fields = fields || '*'
    try {
      dbConnection = await this.getDBConnection()
      let querySQL = `SELECT ${fields} FROM ${this.tableName} WHERE ${this.primaryKeyName} = ? LIMIT 1`
      let records = await this.execSQL(querySQL, [id], dbConnection)
      if (records.length > 0) {
        let sql = `DELETE FROM ${this.tableName} WHERE ${this.primaryKeyName} = ?`
        await this.execSQL(sql, [id], dbConnection)
      }
    } catch (e) {
      LOGGER.error(`removeRecordByID error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
  }

  async getRecords(fields, condition = '', orderBy = '', page = 1, count = 30) {
    fields = fields || '*'
    let dbConnection = null
    let dataResult = null
    try {
      dbConnection = await this.getDBConnection()
      let sql = `SELECT count(*) as recordCount FROM ${this.tableName}`
      if (condition && condition.length > 0) {
        sql = `${sql} WHERE ${condition}`
      }
      let resultCount = await this.execSQL(sql, null, dbConnection)
      let recordCount = resultCount[0].recordCount
      let pageCount = Math.floor((recordCount - 1) / count + 1)

      if (recordCount > 0) {
        sql = `SELECT ${fields} FROM ${this.tableName}`
        if (condition && condition.length > 0) {
          sql = `${sql} WHERE ${condition}`
        }
        if (orderBy && orderBy.length > 0) {
          sql = `${sql} ORDER BY ${orderBy}`
        }
        sql = `${sql} LIMIT ${(page - 1) * count}, ${count}`
        let records = await this.execSQL(sql, null, dbConnection)
        dataResult = { page: page, pageCount: pageCount, count: count, countNumber: recordCount, datas: records }
      } else {
        dataResult = { page: page, pageCount: 0, count: count, countNumber: 0, datas: [] }
      }
    } catch (e) {
      LOGGER.error(`getRecords error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
    return dataResult;
  }

  async updatePersonPhoneByID(id, phone) {
    let dbConnection = null
    try {
      dbConnection = await this.getDBConnection()
      let querySQL = `SELECT * FROM EAP_User WHERE id = ? LIMIT 1`
      let records = await this.execSQL(querySQL, [id], dbConnection)
      if (records.length > 0) {
        let sql = `UPDATE EAP_User SET phone = ? WHERE id = ?`
        await this.execSQL(sql, [phone, id], dbConnection)
      }
    } catch (e) {
      LOGGER.error(`updatePersonPhoneByID error: ${e.toString()}`)
    } finally {
      if (dbConnection)
        dbConnection.release()
    }
  }
}

module.exports = MKODBAction
