import { IProduct } from "../../types/_interfaces";
import { main } from "../../..";

export class CartProductCard {
    product: IProduct;

    container: HTMLElement;

    index: number;

    constructor(product: IProduct, container: HTMLElement, index: number) {
        this.container = container;
        this.product = product;
        this.index = index;
        this.render();
    }

    render() {
        const wrapper = document.createElement("div");
        wrapper.className = "cart-product";
        wrapper.dataset.id = `${this.product.id}`;

        const thumb = new Image();
        thumb.src = this.product.thumbnail;
        thumb.className = "cart-thumb";

        const title = document.createElement("div");
        title.className = "cart-title";
        title.textContent = `${this.index + 1}. ${this.product.title}`;

        const stock = document.createElement("div");
        stock.className = "cart-stock";
        stock.textContent = `Stock: ${this.product.stock}`;

        const desc = document.createElement("div");
        desc.className = "cart-description";
        desc.textContent = `${this.product.description}`;

        const amountWrapper = document.createElement("div");
        amountWrapper.className = "amount-wrapper";

        const rmv = document.createElement("button");
        rmv.textContent = "-";
        rmv.className = "amount-remove";

        const amount = document.createElement("div");
        amount.className = "amount";
        amount.textContent = `${this.getAmount(this.product.id)}`;

        const add = document.createElement("button");
        add.textContent = "+";
        add.className = "amount-add";

        [rmv, amount, add].forEach((e) => amountWrapper.appendChild(e));

        const prodInfo = document.createElement("div");
        prodInfo.className = "product-cart-info";

        const rating = document.createElement("div");
        rating.className = "cart-rating";
        rating.textContent = `${this.product.rating}`;

        const disc = document.createElement("div");
        disc.className = "cart-discount";
        disc.textContent = `${this.product.discountPercentage}%`;

        prodInfo.appendChild(rating);
        prodInfo.appendChild(disc);

        const price = document.createElement("div");
        price.className = "cart-price";
        price.textContent = `${this.product.price}€`;

        [thumb, title, price, desc, amountWrapper, prodInfo, stock].forEach((e) => wrapper.appendChild(e));

        this.container.appendChild(wrapper);
    }

    getAmount(id: number): number {
        const cart = main.cart.currentCart;
        return cart.filter((e) => e.id === id).length;
    }
}
