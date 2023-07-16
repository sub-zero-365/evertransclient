export default function formatDate(date = new Date()) {
    const formateDate = new Date(date);
    return {
        date: formateDate.toLocaleDateString('en-ZA'),
        time: formateDate.toLocaleTimeString('en-ZA'),
    }
}