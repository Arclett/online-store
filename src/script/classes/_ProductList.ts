import { isElement } from "../types/_typeguards";
import { loader } from "../..";
import { IProduct, IProductCard } from "../types/_interfaces";
import { ProductCard } from "./_ProductCard";

export class ProductList {
    currentList: IProductCard[] = [];

    constructor() {
        this.renderList();
    }

    async renderList() {
        const container: HTMLElement | null = document.querySelector(".product-list");
        if (isElement(container)) {
            const data: { products: IProduct[] } = await loader.load();
            data.products.forEach((e) => {
                const product: HTMLElement = document.createElement("div");
                product.className = "product";
                product.dataset.id = `${e.id}`;
                container.appendChild(product);
                this.currentList.push(new ProductCard(e, product));
            });
        }
    }
}
