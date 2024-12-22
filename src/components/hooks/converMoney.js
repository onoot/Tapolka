export function convertMoneyToReduction(money) {
    if (money == null || isNaN(money)) return "0";

    const multipliers = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    const str = money.toString();
    const length = str.length;

    if (length <= 3) {
        return money.toString(); // Если число меньше 1000, возвращаем как есть
    }

    let a = Math.floor(length / 3);
    const b = length % 3;
    let res1, res2;

    if (b) {
        res1 = str.substring(0, b);
        res2 = str.substring(b, b + 2);
    } else {
        res1 = str.substring(0, 3);
        res2 = str.substring(3, 5);
        a--;
    }

    // Убираем лишние нули в конце
    res2 = res2.replace(/0+$/, "");

    if (multipliers[a - 1] && res2) {
        return `${res1},${res2}${multipliers[a - 1]}`;
    } else if (multipliers[a - 1]) {
        return `${res1}${multipliers[a - 1]}`;
    }
    return res1;
}

export function convertMoneyToRCommasIsFull(money) {
    if (money == null || isNaN(money)) return "0";

    // Если число меньше 1000, возвращаем его как есть
    if (money < 1000) {
        return money.toString();
    }

    const str = money.toString();
    const strLength = str.length;
    const remainder = strLength % 3;
    const mainPart = remainder ? str.slice(0, remainder) : "";
    const groups = str.slice(remainder).match(/.{1,3}/g) || [];

    return mainPart
        ? `${mainPart},${groups.join(",")}`
        : groups.join(",");
}

export function convertMoneyToRCommas(money) {
    if (money == null || isNaN(money)) return "0";

    return money.toLocaleString(); // Простое форматирование чисел с запятыми
}
