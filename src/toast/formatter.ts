export const formatTime = (time: Date) => {
  // Check if time is a string, and convert it to a Date object if necessary
  if (typeof time === 'string') {
    time = new Date(time);
  }

  // Check if time is a valid Date object
  if (!(time instanceof Date) || isNaN(time.getTime())) {
    // Handle invalid date
    return '';
  }
  return time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (time: Date | string) => {
  if (typeof time === 'string') {
    time = new Date(time);
  }
  return time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};