import { isElement } from "../types/_typeguards";
import { loader } from "../..";
import { IProduct, IProductCard } from "../types/_interfaces";
import { ProductCard } from "./_ProductCard";

export class ProductList {
    currentList: IProductCard[] = [];
    container: HTMLElement;

    constructor() {
        this.renderList();
        const container: HTMLElement | null = document.querySelector(".product-list");
        if (isElement(container)) {
            this.container = container;
            this.container.addEventListener("click", this.clickHandler.bind(this));
        }
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

    async renderList() {
        const data: { products: IProduct[] } = await loader.load();
        console.log(data);
        data.products.forEach((e) => {
            const product: HTMLElement = document.createElement("div");
            product.className = "product";
            product.dataset.id = `${e.id}`;
            this.container.appendChild(product);
            this.currentList.push(new ProductCard(e, product));
        });
    }
}
