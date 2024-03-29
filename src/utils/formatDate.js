export const formatDate = (inputDate) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
