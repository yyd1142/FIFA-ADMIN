/**
 * Created by dee on 2018/5/15.
 */

const redis = require('redis');
const redisConfig = require('../config').redis;

let redisClient = redis.createClient(redisConfig.RDS_PORT, redisConfig.RDS_HOST, {
  auth_pass: redisConfig.RDS_PWD,
  connect_timeout: 10000,
  retry_strategy: (options) => {
    if (options.error.code === 'ECONNREFUSED') {
      LOGGER.info('连接被拒绝');
    }

    if(options.times_connected > 10) {
      LOGGER.info('重试连接超过十次');
    }

    return Math.max(options.attempt * 100, 3000);
  }
});



redisClient.on("connect", (err, data) => {
  LOGGER.info("Redis 连接成功!");
});

redisClient.on('error', (err) => {
  LOGGER.info("Redis 断开连接!");
  LOGGER.info("Redis 错误: " + err.toString());
});

module.exports = redisClient;
