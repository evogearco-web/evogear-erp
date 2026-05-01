export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '-';

  return new Intl.DateTimeFormat('en-SG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Singapore'
  }).format(date);
}
