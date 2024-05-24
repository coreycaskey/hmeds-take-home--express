import dayjs from 'dayjs';
import { DayJS } from './types';

export const formatDayJs = (date: DayJS) => date.format('MM/DD/YYYY');

export const formatIsoDate = (isoDate: string) => formatDayJs(dayjs(isoDate));
