import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export const formatDate = (date, format = 'dddd, DD MMMM YYYY') => {
  return dayjs(date).format(format);
};

export const getCurrentTime = () => {
  return dayjs().format('HH:mm:ss');
};

export const getCurrentDate = () => {
  return dayjs().format('dddd, DD MMMM YYYY');
};

export const getTimeFormatted = (timestamp) => {
  return dayjs(timestamp).format('HH:mm:ss');
};

export const getDateFormatted = (timestamp) => {
  return dayjs(timestamp).format('DD MMMM YYYY');
};

export const getDurationBetween = (startTime, endTime) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  
  const hours = end.diff(start, 'hour');
  const minutes = end.diff(start, 'minute') % 60;
  
  return { hours, minutes };
};
