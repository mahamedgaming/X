export function formatFinishDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();

  const diffDays = Math.round((startOfToday - startOfTarget) / (24 * 3600 * 1000));

  if (diffDays === 0) return 'اكتمل اليوم';
  if (diffDays === 1) return 'اكتمل أمس';

  return new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
