export const getCurrentDateTime = () => {
  const pad = n => n.toString().padStart(2, '0');

  const now = new Date();
  const dd = pad(now.getDate());
  const mm = pad(now.getMonth() + 1);
  const yyyy = now.getFullYear();

  const hh = pad(now.getHours());
  const min = pad(now.getMinutes());
  const sec = pad(now.getSeconds());

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${sec}`;
}
