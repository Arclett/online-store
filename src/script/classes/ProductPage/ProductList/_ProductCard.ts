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
        const category: HTMLElement = document.createElement("div");
        category.textContent = this.product.category;
        const brand: HTMLElement = document.createElement("div");
        brand.textContent = this.product.brand;
        const price: HTMLElement = document.createElement("div");
        price.textContent = `${this.product.price}€`;
        const discount: HTMLElement = document.createElement("div");
        discount.textContent = `${this.product.discountPercentage}%`;
        const rating: HTMLElement = document.createElement("div");
        rating.textContent = `${this.product.rating}`;
        const stock: HTMLElement = document.createElement("div");
        stock.textContent = `${this.product.stock}`;
        const addButton: HTMLElement = document.createElement("div");
        addButton.className = "add-to-cart";
        addButton.textContent = "Add to Cart";
        const infoButton: HTMLElement = document.createElement("div");
        infoButton.className = "infoButton";
        infoButton.textContent = "Details";
        infoButton.dataset.id = `${this.product.id}`;
        if (main.porductMain) {
            const img = main.porductMain.getImage(this.product.id);
            if (img) {
                this.container.appendChild(img);
            }
        }
        [productName, category, brand, price, discount, rating, stock, addButton, infoButton].forEach((e) => {
            this.container.appendChild(e);
        });
    }
}
