export function dateFormatter(date) {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  const day = dateObj.getDate(); // 일
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${year}/${month}/${day} ${hour}시 ${minute}분`;
}
