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
        if (
            filter.brand.length === 0 &&
            filter.category.length === 0 &&
            filter.price.length === 0 &&
            filter.stock.length === 0
        ) {
            return;
        }
        this.currentList = this.currentList.filter((e) => {
            let category: boolean, brand: boolean, price: boolean, stock: boolean;
            if (filter.category.length > 0) category = filter.category.includes(e.category);
            else category = true;
            if (filter.brand.length > 0) brand = filter.brand.includes(e.brand);
            else brand = true;
            if (filter.price.length > 0) price = e.price > Number(filter.price[0]) && e.price < Number(filter.price[1]);
            else price = true;
            if (filter.stock.length > 0) stock = e.stock > Number(filter.stock[0]) && e.stock < Number(filter.stock[1]);
            else stock = true;

            if (category && brand && price && stock) return true;
        });
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
