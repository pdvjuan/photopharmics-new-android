import moment from "moment";

const GetOneMonth = () => {
  const thisMonth = new Date();
  const months = [];
  months.push(moment(thisMonth).add(0, "month").toDate());
  return months;
};

export default GetOneMonth;
