import CartPagination from "../classes/Cart/_CartPagination";
import { ICartParams, IProduct } from "../types/_interfaces";
import { randomNum } from "./CartSum.test";

const cartPagination = new CartPagination();
const cartParams: ICartParams = {
    page: 1,
    limit: 3,
};

const num = randomNum(10);
const currentCart: IProduct[] = [];

for (let i = 0; i < num; i++) {
    const product = {
        id: i,
        title: "",
        description: "",
        price: i,
        discountPercentage: i,
        rating: i,
        stock: i,
        brand: "",
        category: "",
        thumbnail: "",
        images: [],
    };
    currentCart.push(product);
}

test("is page length less than limit", () => {
    const value = cartPagination.getPage(cartParams, currentCart);
    expect(value.length <= 3).toEqual(true);
});

test("return array of uniqe products", () => {
    const cart = [...currentCart, ...currentCart];
    const set = cartPagination.getCartSet(cart);
    expect(set.length).toEqual(cart.length / 2);
});
