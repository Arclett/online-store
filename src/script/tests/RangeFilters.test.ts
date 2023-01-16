import { RangeFilter } from "../classes/ProductPage/ProductFilters/_RangeFilters";
import { RangeFilters } from "../types/_enums";
import { IProduct } from "../types/_interfaces";
import { randomNum } from "./CartSum.test";

const container = document.createElement("div");
const filters = {
    category: [],
    brand: [],
    price: [],
    stock: [],
    sort: [],
    search: [],
};

const num = randomNum(20);
const productList: IProduct[] = [];
const type = num % 2 === 0 ? RangeFilters.price : RangeFilters.stock;

for (let i = 0; i < num; i++) {
    const product = {
        id: i,
        title: "",
        description: "",
        price: randomNum(20),
        discountPercentage: i,
        rating: i,
        stock: randomNum(20),
        brand: "",
        category: "",
        thumbnail: "",
        images: [],
    };
    productList.push(product);
}

const range = new RangeFilter(container, filters);

test("return array with two prices o stock value", () => {
    const value = range.getRangeValue(type, productList);
    expect(value.length === 2).toEqual(true);
});

test("is array parts are convertable to number", () => {
    const value = range.getRangeValue(type, productList);
    expect(Number.isNaN(value[0]) || Number.isNaN(value[1])).toEqual(false);
});

test("first number in array less than second", () => {
    const value = range.getRangeValue(type, productList);
    expect(Number(value[0]) <= Number(value[1])).toEqual(true);
});
