import Big from 'big.js';

export function getQuantityOf(
    productOrder: ProductOrderCreateUpdateDto,
    productOrderCreateUpdateDtos: ProductOrderCreateUpdateDto[]
) {
    return productOrderCreateUpdateDtos.filter((pocud) =>
        isProductOrderCreateUpdateEqual(productOrder, pocud)
    ).length;
}

export function getUniqueProductOrderCreateUpdateDtos(
    productOrderCreateUpdateDtos: ProductOrderCreateUpdateDto[]
) {
    const unique = (
        arr: any[],
        encoder = JSON.stringify,
        decoder = JSON.parse
    ) =>
        [...new Set(arr.map((item) => encoder(item)))].map((item) =>
            decoder(item)
        );

    return unique(productOrderCreateUpdateDtos);
}

export function getTotalOrderPrice(
    productOrderCreateUpdateDtos: ProductOrderCreateUpdateDto[]
) {
    if (productOrderCreateUpdateDtos.length > 0) {
        return productOrderCreateUpdateDtos
            .map((pocud) =>
                new Big(pocud.price.replace(',', '.')).times(pocud.quantity)
            )
            .reduceRight((acc, curr) => acc.plus(curr))
            .toFixed(2);
    } else {
        return new Big('0').toFixed(2);
    }
}

export function createOrderCreateDtoFromOrderFullDto(
    orderFullDto: OrderFullDto
) {
    return {
        customerName: orderFullDto.customerName,
        paymentType: orderFullDto.paymentType,
        productOrderCreateUpdateDtos: orderFullDto.productOrderShortDtos.map(
            (posd) => ({
                id: posd.id,
                productId: posd.productId,
                appliedAdaptionShortDtos: [], // TODO
                price: posd.price,
                quantity: posd.quantity,
            })
        ),
    };
}

export function isProductOrderCreateUpdateEqual(
    p1: ProductOrderCreateUpdateDto,
    p2: ProductOrderCreateUpdateDto
): boolean {
    return (
        p1.price == p2.price &&
        p1.productId == p2.productId
    );
}
