import { IProduct } from "../../../types/_interfaces";
import { ProductCard } from "./_ProductCard";
import { router, main } from "../../../..";

export class ProductList {
    data: IProduct[];

    currentList: IProduct[] = [];

    container: HTMLElement;

    constructor(data: IProduct[], container: HTMLElement) {
        this.data = data;
        this.container = container;
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
        console.log(filter);
        this.currentList = this.data;
        if (
            filter.brand.length === 0 &&
            filter.category.length === 0 &&
            filter.price.length === 0 &&
            filter.stock.length === 0
        ) {
            return;
        }
        console.log(Object.entries(filter));
        Object.entries(filter).forEach((e: string[]) => {
            if (e[1].length > 0) {
                this.currentList = this.currentList.filter((elem) => {
                    if (e[1].includes(`${elem[e[0]]}`)) {
                        return true;
                    }
                });
            }
        });
        console.log("filtered");
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
