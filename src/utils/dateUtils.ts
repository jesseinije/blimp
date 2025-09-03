export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const weeksDiff = Math.floor(daysDiff / 7);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(daysDiff / 365);

  if (secondsDiff < 60) return "now";
  if (minutesDiff < 60) return `${minutesDiff}m`;
  if (hoursDiff < 24) return `${hoursDiff}h`;
  if (daysDiff < 7) return `${daysDiff}d`;
  if (weeksDiff < 4) return `${weeksDiff}w`;
  if (monthsDiff < 12) return `${monthsDiff}mo`;
  return `${yearsDiff}y`;
};
