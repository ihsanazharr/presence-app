import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { formatDate } from '../utils/dateFormatter';

dayjs.locale('id');

export const useCurrentTime = () => {
  const [time, setTime] = useState(dayjs().format('HH:mm:ss'));
  const [date, setDate] = useState(formatDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format('HH:mm:ss'));
      setDate(formatDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time, date };
};
