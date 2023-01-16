import ProductListSettings from "../classes/ProductPage/ProductList/_ProductListSettings";
import { randomNum } from "./CartSum.test";

const container = document.createElement("div");

test("is number of found item is updated", () => {
    const prod = new ProductListSettings(container);
    const num = randomNum(20);
    prod.updateSearchCount(num);
    expect(prod.searchCount.textContent).toEqual(`Found: ${num}`);
});

test("is search input value updated", () => {
    const prod = new ProductListSettings(container);
    const str = randomNum(20).toString();
    prod.updateSearchInput(str);
    expect(prod.searchInput.value).toEqual(str);
});

test("is search input not updated when string empty", () => {
    const prod = new ProductListSettings(container);
    const str = randomNum(20).toString();
    prod.updateSearchInput(str);
    prod.updateSearchInput("");
    expect(prod.searchInput.value).toEqual(str);
});
