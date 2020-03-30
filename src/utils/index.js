import moment from 'moment'

export function momentDate (num, type = 'date_time') {
    if (num) {
      if (Object.prototype.toString.call(num) === '[object Date]') {
        num = num.getTime()
      }
      switch (type) {
        case 'date':
          return moment(parseInt(num, 10)).format('YYYY-MM-DD')
        case 'date_h':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD')
        case 'date_time':
          return moment(parseInt(num, 10)).format('YYYY-MM-DD HH:mm:ss')
        case 'data_h_time':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD HH:mm:ss')
        case 'data_h_time_h':
          return moment(parseInt(num, 10)).format('YYYY/MM/DD HH:mm')
        case 'time':
          return moment(parseInt(num, 10)).format('HH:mm:ss')
        case 'time_h':
          return moment(parseInt(num, 10)).format('HH:mm')
        default:
          return moment(parseInt(num, 10)).format('YYYY-MM-DD HH:mm:ss')
      }
    } else {
      return ''
    }
  }