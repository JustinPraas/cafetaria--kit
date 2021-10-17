import Big from "big.js";

export function getProductName(
    productId: number,
    productShortDtos: ProductShortDto[]
) {
    return productShortDtos.find((psd) => psd.id === productId)?.name;
}
export function getTotalOrderPrice(productOrderShortDtos: ProductOrderShortDto[]) {
    if (productOrderShortDtos.length > 0) {
        return productOrderShortDtos
            .map((pocud) => (new Big(pocud.price.replace(',', '.')).times(pocud.quantity)))
            .reduceRight((acc, curr) => acc.plus(curr))
            .toFixed(2);
    } else {
        return new Big('0').toFixed(2);
    }
}

export function isProductOrderCreateUpdateEqual(
    p1: ProductOrderShortDto,
    p2: ProductOrderShortDto
): boolean {
    return (
        p1.adjustment === p2.adjustment &&
        p1.price === p2.price &&
        p1.productId === p2.productId
    );
}
