export function dateTwoMonthsFromNow() {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}
