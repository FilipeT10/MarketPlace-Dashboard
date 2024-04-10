import moment from 'moment';

export default (data) => {
  var dat = moment(data).format('DD/MM/YYYY  HH:mm:ss');
  return dat;
};
