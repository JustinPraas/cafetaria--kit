import { environment } from "src/environments/environment";

export const ORGANIZATION: string = "Snackywok";

export const PRICE_DECIMAL_COMMA_SEPERATED_REGEX = /^[+-]?(\d*|\d{1,3}(\.\d{3})*)(,\d+)?\b$/gm;

export const API_CATEGORY_URL: string = environment.baseUrl + "/categories";

export const API_ADAPTION_URL: string = environment.baseUrl + "/adaptions";

export const API_ORDER_URL: string = environment.baseUrl + "/orders";

export const API_PRODUCT_URL: string = environment.baseUrl + "/products"
