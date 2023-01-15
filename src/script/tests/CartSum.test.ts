import { CartSum } from "../classes/Cart/_CartSum";

const container = document.createElement("div");
export const randomNum = (x: number) => Math.ceil(Math.random() * x) + 1;

const cartSum = new CartSum(container, randomNum(200), randomNum(200));
cartSum.promoCodes = [];
for (let i = 0; i < 3; i++) {
    const num = randomNum(10);
    cartSum.promoCodes.push([num.toString(), num]);
}

test("is price updating by promo codes", () => {
    cartSum.currentPromo = [cartSum.promoCodes[0][0]];
    const discount = cartSum.getDiscountPrice();
    expect(cartSum.totalPrice > discount).toEqual(true);
});

test("is price not updated when no promo codes", () => {
    cartSum.currentPromo = [];
    const discount = cartSum.getDiscountPrice();
    expect(cartSum.totalPrice === discount).toEqual(true);
});

test("discount works correctly with more than one promos", () => {
    cartSum.currentPromo = [cartSum.promoCodes[0][0]];
    const discount = cartSum.getDiscountPrice();
    cartSum.currentPromo.push(cartSum.promoCodes[1][0]);
    const discountSecond = cartSum.getDiscountPrice();
    expect(discount > discountSecond).toEqual(true);
});
