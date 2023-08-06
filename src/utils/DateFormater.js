import dayjs from 'dayjs'
export default function formatDate(date = new Date()) {
    const formateDate = new Date(date);
    return {
        // date: formateDate.toLocaleDateString('en-ZA'),
        // time: formateDate.toLocaleTimeString('en-ZA'),
        date: dayjs(date).format("DD/MM/YYYY"),
        time:formateDate.toLocaleTimeString('en-ZA')
    }
}