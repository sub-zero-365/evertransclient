export default function formatDate(date = new Date()) {
    const formateDate = new Date(date);
    return {
        date: formateDate.toLocaleDateString(),
        time: formateDate.toLocaleTimeString(),
    }
}