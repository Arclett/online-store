import { IProduct, IProductCard } from "../types/_interfaces";
import { ProductCard } from "./_ProductCard";

export class ProductList {
    currentList: IProduct[];
    container: HTMLElement;
    currentProducts: ProductCard[] = [];

    constructor(data: IProduct[], container: HTMLElement) {
        this.currentList = data;
        this.container = container;
        this.renderList(this.currentList);

        this.container.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event): void {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("product") || e.target.classList.contains("infoButton")) {
            console.log("Going to Details --->");
        }
        if (e.target.classList.contains("add-to-cart")) {
            console.log("Add to cart +++");
        }
    }

    renderList(data: IProduct[]) {
        data.forEach((e) => {
            const product: HTMLElement = document.createElement("div");
            product.className = "product";
            product.dataset.id = `${e.id}`;
            this.container.appendChild(product);
            this.currentProducts.push(new ProductCard(e, product));
        });
    }
}
