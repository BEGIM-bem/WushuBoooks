const getDate = (date) => {
    const fileDate = new Date(date.date);
    const fileDay = fileDate.getDate();
    const fileMonth = fileDate.getMonth();
    const fileYear = fileDate.getFullYear();
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const prevDay = currentDay - 1;
    const prevMonth = currentMonth;
    const prevYear = currentYear;

    if (fileDay === currentDay && fileMonth === currentMonth && fileYear === currentYear) return 'Today';
    if (fileDay === prevDay && fileMonth === prevMonth && fileYear === prevYear) return 'Yesterday';
    return 'Other';
}

const useFile = (data) => {
    const ExportData = {
        Today: [],
        Yesterday: [],
        Other: []
    }
    data.forEach((item) => ExportData[getDate(item)] = [...ExportData[getDate(item)], item]);
    return ExportData;
}

export default useFile;