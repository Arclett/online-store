import { ICartParams, IProduct } from "../../types/_interfaces";

export class CartPagination {
    getPage(params: ICartParams, currentCart: IProduct[]) {
        const data: IProduct[] = this.getCartSet(currentCart);
        let res: IProduct[][] = [];
        const page = params.page;
        const limit = params.limit;
        while (data.length >= limit) {
            const page = data.splice(0, limit);
            res.push(page);
        }
        if (data.length > 0) {
            res.push(data);
        }
        return res[page - 1];
    }

    getCartSet(currentCart: IProduct[]) {
        return Array.from(new Set(currentCart));
    }
}
