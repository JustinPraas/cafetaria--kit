/* tslint:disable */
// Generated using typescript-generator version 2.9.456 on 2021-10-17 12:55:33.

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
    quantity: number;
    adjustment: string;
}

interface ProductOrderShortDto {
    id: number;
    orderId: number;
    productId: number;
    price: string;
    quantity: number;
    adjustment: string;
}

interface ProductCreateUpdateDto {
    name: string;
    categoryId: number;
    priceType: PriceType;
    price: string;
    active: boolean;
}

interface ProductShortDto {
    id: number;
    name: string;
    categoryId: number;
    priceType: PriceType;
    price: string;
    createdOn: Date;
    modifiedOn: Date;
    active: boolean;
    archived: boolean;
}

type PaymentType = "CARD" | "CASH" | "UNKNOWN";

type PriceType = "FIXED" | "FREE" | "VARIABLE";
