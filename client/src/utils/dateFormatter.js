export function dateFormatter(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', options);
  return formattedDate;
}
