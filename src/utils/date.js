const formatDate = (newDate) => {
    const months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "June",
      6: "July",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
    const d = new Date(newDate);
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = d.getMonth();
    const monthName = months[monthIndex];
    const formatted = `${monthName} ${date}, ${year}`;
    return formatted.toString();
  }

export default formatDate;
