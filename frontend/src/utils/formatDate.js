import { format } from 'date-fns';

export const formatDisplayDate = (date, pattern = 'PPP') => {
  if (!date) return '';
  return format(new Date(date), pattern);
};
