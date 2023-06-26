const DateUi = ({ dayOfWeek, date, time }) => {
    const weekDay = (index = 0) => {
        const _days = [
  
          "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"
        ]
        if (index < 0 || index > 6) {
          index = 0
        }
        return _days[index]
      }
    return (
        <div className="flex justify-between px-2 items-center">
            <h1 className="text-sm">{weekDay(new Date().getDay()) || "invalid date"}</h1>
            <h1 className="text-sm pb-4">On {new Date(date).toLocaleDateString()}  at </h1>
            <h2 className="text-sm">{time}</h2>
        </div>)

}

export default DateUi