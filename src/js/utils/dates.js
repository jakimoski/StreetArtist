export function generateDateLabels(daysAgo = 7) {
  const labels = [];

  for (let i = 0; i < daysAgo; i++) {
    const now = new Date();

    const startDate = now.getDate();

    const offsetDate = now.setDate(startDate - i);

    const formattedDate = formatDate(offsetDate);
    labels.push(formattedDate);
  }

  return labels;
}
// fUNCTION TO FORMAT DATE
export function formatDate(dateUnix) {
  const date = new Date(dateUnix);

  return date.toLocaleDateString("en-gb");
}
// Function to generate new dates for last 30 days
export function getRandomDate() {
  const currentDate = new Date();
  const randomDay = Math.floor(Math.random() * 30) + 1;

  // Subtract the random number of days from the current date
  currentDate.setDate(currentDate.getDate() - randomDay);

  // Format the date as a string in the desired format
  const formattedDate = currentDate.toISOString();

  return formattedDate;
}
