import Big from "big.js";
import { isEmpty } from "rxjs/operators";

export function getProductName(
    productId: number,
    productFullDtos: ProductFullDto[]
) {
    return productFullDtos.find((psd) => psd.id === productId)?.name;
}

export function getTotalOrderPrice(productOrderShortDtos: ProductOrderShortDto[]) {
    if (productOrderShortDtos.length > 0) {
        let result: Big = new Big(0);
        for (const posd of productOrderShortDtos) {
            const priceProducts = new Big(posd.price.replace(',', '.')).times(posd.quantity)
            let priceAdaptions = new Big(0)
            for (const aasd of posd.appliedAdaptionShortDtos) {
                if (aasd.price && aasd.price != "")
                    priceAdaptions = priceAdaptions.plus(new Big(aasd.price.replace(',', '.')).times(posd.quantity));
            }
            result = result.plus(priceProducts);
            result = result.plus(priceAdaptions);
        }
        return result.toFixed(2).replace(".", ",");
    } else {
        return new Big('0').toFixed(2).replace(".", ",");
    }
}

export function isProductOrderCreateUpdateEqual(
    p1: ProductOrderShortDto,
    p2: ProductOrderShortDto
): boolean {
    return (
        // p1.adjustment === p2.adjustment &&
        p1.price === p2.price &&
        p1.productId === p2.productId
    );
}
