import * as moment from "moment";

moment.locale("nl")

export function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}

export function getPriceString(price: string, priceType: PriceType) {
    if (priceType == 'FREE') {
        return 'Gratis';
    } else if (priceType == 'FIXED') {
        if (+price == 0) {
            return 'Gratis';
        } else {
            return '€' + price;
        }
    } else if (priceType == 'VARIABLE') {
        return price ? '€' + price : 'Variabel';
    } else {
        return '???';
    }
}

export function getFriendlyLocaleString(date: Date) {
    return moment(date).format('llll'); // wo. 20 okt. 2021 16:26
}

export const sequenceOrder: (e1: {sequenceOrder?: number}, e2: {sequenceOrder?: number}) => number = (e1, e2) => e1.sequenceOrder! - e2.sequenceOrder!;

export const getNumpadPriceValue: (nonSanitizedPriceValue: string) => string = (nonSanitizedPriceValue: string) => {
    if (nonSanitizedPriceValue == '') {
        return "0"
    } else {
        return nonSanitizedPriceValue.replace(",", ".")
    }
}

export const getNumpadQuantityValue: (nonSanitizedQuantityValue: string) => number = (nonSanitizedQuantityValue: string) => {
    if (nonSanitizedQuantityValue == '') {
        return 1;
    } else {
        return Math.floor(+nonSanitizedQuantityValue.replace(",","."))
    }
}
