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

Vue.filter('rankFilter', (value) => {
//  1.小组赛，2.1/8决赛，3.1/4决赛，4.半决赛，5.三四名，6.决赛
  let ranks = ['- -', '小组赛', '1/8决赛', '1/4决赛', '半决赛', '三四名', '决赛'];
  return ranks[value];
})
