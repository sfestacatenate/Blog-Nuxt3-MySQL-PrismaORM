export function getFirstCharactersContent(text: string): string {
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
}

export function getFirstCharactersTitle(text: string): string {
    return text.length > 35 ? text.substring(0, 40) + '...' : text;
}

export function wordsCount(text: string): number {
    return text.split(' ').length;
}

export function formatToItalianDate(date: string): string {
    const dateObj = new Date(date);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    let stringDay = day.toString();
    let stringMonth = month.toString();

    if (day < 10) {
        stringDay = '0' + day;
    }
    if (month < 10) {
        stringMonth = '0' + month;
    }
    return `${stringDay}/${stringMonth}/${year}`;
}