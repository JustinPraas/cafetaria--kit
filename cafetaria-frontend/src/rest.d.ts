/* tslint:disable */
// Generated using typescript-generator version 2.9.456 on 2021-10-23 14:17:28.

interface ReorderEntitiesDto {
    idToSequenceOrderMap: { [index: string]: number };
}

interface AdaptionCreateUpdateDto {
    name: string;
    price: string;
}

interface AdaptionFullDto extends AdaptionShortDto {
    linkedProductShortDtos: ProductShortDto[];
    createdOn: Date;
    modifiedOn: Date;
    registered: boolean;
    archived: boolean;
}

interface AdaptionShortDto {
    id?: number;
    name: string;
    price: string;
}

interface CategoryCreateUpdateDto {
    name: string;
    active: boolean;
    colorHex: string;
}

interface CategoryFullDto extends CategoryShortDto {
    productShortDtos: ProductShortDto[];
}

interface CategoryShortDto {
    id: number;
    name: string;
    colorHex: string;
    sequenceOrder?: number;
    productIds: number[];
    createdOn: Date;
    modifiedOn: Date;
    active: boolean;
    archived: boolean;
}

interface OrderCreateUpdateDto {
    customerName: string;
    productOrderCreateUpdateDtos: ProductOrderCreateUpdateDto[];
    paymentType: PaymentType;
}

interface OrderFullDto {
    id: number;
    customerName: string;
    productOrderShortDtos: ProductOrderShortDto[];
    createdOn: Date;
    modifiedOn: Date;
    paidOn: Date;
    paymentType: PaymentType;
}

interface ProductOrderCreateUpdateDto {
    id: number;
    productId: number;
    price: string;
    appliedAdaptionShortDtos: AdaptionShortDto[];
    quantity: number;
}

interface ProductOrderShortDto {
    id: number;
    orderId: number;
    productId: number;
    price: string;
    appliedAdaptionShortDtos: AdaptionShortDto[];
    quantity: number;
}

interface ProductCreateUpdateDto {
    name: string;
    categoryId: number;
    priceType: PriceType;
    possibleAdaptionIds: number[];
    price: string;
    active: boolean;
}

interface ProductFullDto extends ProductShortDto {
    possibleAdaptionShortDtos: AdaptionShortDto[];
}

interface ProductShortDto {
    id: number;
    name: string;
    categoryId: number;
    priceType: PriceType;
    price: string;
    sequenceOrder?: number;
    createdOn: Date;
    modifiedOn: Date;
    active: boolean;
    archived: boolean;
}

type PaymentType = "CARD" | "CASH" | "UNKNOWN";

type PriceType = "FIXED" | "FREE" | "VARIABLE";
