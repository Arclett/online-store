import { IFilters, IProduct } from "../../../types/_interfaces";
import { ProductCard } from "./_ProductCard";
import { router, main } from "../../../..";
import { RangeFilters } from "../../../types/_enums";

export class ProductList {
    data: IProduct[];

    currentList: IProduct[] = [];

    container: HTMLElement;

    priceRange: string[];

    stockRange: string[];

    constructor(data: IProduct[], container: HTMLElement) {
        this.data = data;
        this.container = container;
        this.priceRange = main.porductMain.productFilters.rangeFilters.getRangeValue(RangeFilters.price, this.data);
        this.stockRange = main.porductMain.productFilters.rangeFilters.getRangeValue(RangeFilters.stock, this.data);
        this.filterData();
        this.renderList(this.currentList);

        this.container.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event): void {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("product") || e.target.classList.contains("infoButton")) {
            if (router) {
                router.route(`/product-details/${e.target.dataset.id}`);
                router.locHandling();
            }
        }
        if (e.target.classList.contains("add-to-cart")) {
            console.log("Add to cart +++");
        }
    }

    filterData() {
        const filter = main.porductMain.productFilters.filters;
        this.currentList = this.data;
        this.filterCheck(filter);
        this.filterRange(filter, RangeFilters.price);
        this.filterRange(filter, RangeFilters.stock);
    }

    filterCheck(filter: IFilters) {
        if (filter.brand.length === 0 && filter.category.length === 0) {
            return;
        }
        Object.entries(filter).forEach((e: string[]) => {
            if (e[1].length > 0) {
                this.currentList = this.currentList.filter((elem) => {
                    if (e[1].includes(`${elem[e[0]]}`)) {
                        return true;
                    }
                });
            }
        });
    }

    filterRange(filter: IFilters, type: RangeFilters) {
        if (filter[type].length === 0) return;
        if (
            filter[type][0] === main.porductMain.productList[`${type}Range`][0] &&
            filter[type][1] === main.porductMain.productList[`${type}Range`][1]
        ) {
            return;
        }
        this.currentList = this.currentList.filter((e) => {
            if (e.price > Number(filter[type][0]) && e.price < Number(filter[type][1])) {
                return true;
            }
        });
        console.log(this.currentList);
    }

    renderList(data: IProduct[]) {
        this.container.replaceChildren();
        data.forEach((e) => {
            const product: HTMLElement = document.createElement("div");
            product.className = "product";
            product.dataset.id = `${e.id}`;
            this.container.appendChild(product);
            new ProductCard(e, product);
        });
    }

    updateList() {
        this.filterData();
        this.renderList(this.currentList);
    }
}
