/**
 * Created by dee on 2018/5/15.
 */
import Vue from 'vue'
import moment from 'moment'

// 日期格式化
Vue.filter('formatDate', (value, format) => {
  if (!value) return "";
  format = format || "YYYY-MM-DD HH:mm";
  return moment(value).format(format);
});
