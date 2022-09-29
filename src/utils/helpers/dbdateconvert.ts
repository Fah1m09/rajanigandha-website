import moment from "moment";

export const dbdateconvert = (date) => {
  return moment(date).format("MMMM D, YYYY");
};