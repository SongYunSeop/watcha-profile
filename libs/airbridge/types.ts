export interface initObject {
    app: string;
    webToken: string;
    utmParsing?: boolean
    urlQueryMapping?: {
        channel?: string;
        campaign?: string;
        ad_group?: string;
        ad_creative?: string;
        content?: string;
        term?: string;
        sub_id?: string;
        sub_id_1?: string;
        sub_id_2?: string;
        sub_id_3?: string;
    }
    defaultChannel?: string;
    defaultParams: {
        campaign?: string;
        medium?: string;
        content?: string;
        term?: string;
    }
}

export interface UserObject {
    userId?: string;
    userEmail?: string;
}

export interface ProductObject {
    productID: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
    position: number;
}

export interface eventObject {
    action?: string;
    label?: string;
    value?: number;
    customAttributes?: Object
}

export default interface Airbridge {
    init(obj: initObject): void;

    events: {
        signUp(user: UserObject): void;

        signIn(user: UserObject): void;

        signOut(): void;

        homeViewEvent(): void;

        productDetailsViewEvent({products}: { products: Array<ProductObject> }): void;

        productListViewEvent({productListID, products}: { productListID: number, products: Array<ProductObject> }): void;

        searchResultViewEvent({query, products}: { query: string, products: Array<ProductObject> }): void;

        addedToCart({cartId, totalValue, currency, products}: { cartId: string, totalValue: number, currency: string, products: Array<ProductObject> }): void;

        purchased({inAppPurchased, totalValue, currency, products}: { inAppPurchased: boolean, totalValue: number, currency: string, products: Array<ProductObject> }): void;

        send(category: string, info?: eventObject): void
    }
}
