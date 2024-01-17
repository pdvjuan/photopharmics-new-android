import moment from "moment";

const GetMonths = () => {
  const thisMonth = new Date();
  const months = [];
  for (let i = -5; i < 2; i++) {
    months.push(moment(thisMonth).add(i, "month").toDate());
  }
  return months;
};

export default GetMonths;
