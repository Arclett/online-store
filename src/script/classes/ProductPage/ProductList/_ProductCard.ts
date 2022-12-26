import { IProduct } from "../../../types/_interfaces";
import { isElement } from "../../../types/_typeguards";
import { main } from "../../../..";

export class ProductCard {
    product: IProduct;

    container: HTMLElement;

    constructor(product: IProduct, container: HTMLElement) {
        this.product = product;
        if (isElement(container)) {
            this.container = container;
        }
        this.renderCard();
    }

    renderCard() {
        const productName: HTMLElement = document.createElement("div");
        productName.textContent = this.product.title;
        productName.className = "product-title";
        const category: HTMLElement = document.createElement("div");
        category.textContent = `Category: ${this.product.category}`;
        const brand: HTMLElement = document.createElement("div");
        brand.textContent = `Brand: ${this.product.brand}`;
        const price: HTMLElement = document.createElement("div");
        price.textContent = `Price: ${this.product.price}€`;
        const discount: HTMLElement = document.createElement("div");
        discount.textContent = `Discount: ${this.product.discountPercentage}%`;
        const rating: HTMLElement = document.createElement("div");
        rating.textContent = `Rating: ${this.product.rating}`;
        const stock: HTMLElement = document.createElement("div");
        stock.textContent = `Stock: ${this.product.stock}`;
        const addButton: HTMLElement = document.createElement("div");
        addButton.className = "add-to-cart";
        addButton.textContent = "Add to Cart";
        const infoButton: HTMLElement = document.createElement("div");
        infoButton.className = "infoButton";
        infoButton.textContent = "Details";
        infoButton.dataset.id = `${this.product.id}`;
        const infoContainer = document.createElement("div");
        infoContainer.className = "product-info";
        if (main.porductMain) {
            const img = main.porductMain.getImage(this.product.id);
            if (img) {
                this.container.appendChild(img);
            }
        }
        this.container.appendChild(infoContainer);
        [productName, category, brand, price, discount, rating, stock, addButton, infoButton].forEach((e) => {
            infoContainer.appendChild(e);
        });
    }
}
