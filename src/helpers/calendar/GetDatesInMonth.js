import moment from "moment";

const GetDatesInMonth = (monthDate) => {
  let dates = [];
  const startDate = moment(monthDate).startOf("month").startOf("week");
  const endDate = moment(monthDate).endOf("month").endOf("week");
  let day = startDate;
  while (day <= endDate) {
    dates.push(day.toDate());
    day = day.clone().add(1, "d");
  }

  return dates;
};

export default GetDatesInMonth;
