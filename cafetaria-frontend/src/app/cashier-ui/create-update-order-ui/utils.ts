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


export function getTotalOrderPrice(productOrderCreateUpdateDtos: ProductOrderCreateUpdateDto[]) {
    if (productOrderCreateUpdateDtos.length > 0) {
        let result: Big = new Big(0);
        for (const pocud of productOrderCreateUpdateDtos) {
            const priceProducts = pocud.price == "" ? new Big(0) : new Big(pocud.price.replace(',', '.')).times(pocud.quantity)
            let priceAdaptions = new Big(0)
            for (const aasd of pocud.appliedAdaptionShortDtos) {
                if (aasd.price && aasd.price != "")
                    priceAdaptions = priceAdaptions.plus(new Big(aasd.price.replace(',', '.')).times(pocud.quantity));
            }
            result = result.plus(priceProducts);
            result = result.plus(priceAdaptions);
        }
        return result.toFixed(2);
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
                appliedAdaptionShortDtos: posd.appliedAdaptionShortDtos,
                price: posd.price,
                quantity: posd.quantity,
            })
        ),
    };
}

export function arraysContainSameElements(arr1: any[], arr2: any[]) {
    for (const a1 of arr1) {
        if (!arr2.includes(a1)) return false;
    }

    for (const a2 of arr2) {
        if (!arr1.includes(a2)) return false;
    }

    return true;
}

export function isProductOrderCreateUpdateEqual(
    p1: ProductOrderCreateUpdateDto,
    p2: ProductOrderCreateUpdateDto
): boolean {
    return (
        arraysContainSameElements(
            p1.appliedAdaptionShortDtos.map((it) => it.id!),
            p2.appliedAdaptionShortDtos.map((it) => it.id!)
        ) &&
        p1.quantity == p2.quantity &&
        p1.price == p2.price &&
        p1.productId == p2.productId
    );
}
