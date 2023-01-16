import { IProduct } from "../../types/_interfaces";

export class ProductCart {
    data: IProduct[];

    cartPrice: HTMLElement;

    currentCart: IProduct[];

    cartStatus: HTMLElement;

    constructor(data: IProduct[]) {
        this.data = data;
        this.currentCart = [];
        this.loadCart();
        window.addEventListener("beforeunload", this.saveCart.bind(this));
        const price: HTMLElement | null = document.querySelector(".cart-total");
        if (!price) return;
        this.cartPrice = price;
        const status: HTMLElement | null = document.querySelector(".cart-status");
        if (!status) return;
        this.cartStatus = status;
        this.updateCart();
    }

    removeFromCart(prod: IProduct, elem: HTMLElement) {
        this.currentCart = this.currentCart.filter((e) => e !== prod);
        this.updateCart();
        elem.classList.remove("added");
        elem.textContent = "Add to cart";
    }

    addToCart(prod: IProduct, elem: HTMLElement) {
        this.currentCart.push(prod);
        this.updateCart();
        elem.classList.add("added");
        elem.textContent = "Drop from cart";
    }

    loadCart() {
        if (localStorage.getItem("cart")) {
            const data = localStorage.getItem("cart");
            if (data === "" || !data) return;
            data.split(",").forEach((e) => {
                const prod: IProduct | undefined = this.data.find((elem) => elem.id === Number(e));
                if (prod) this.currentCart.push(prod);
            });
        }
    }

    saveCart() {
        const cartIdList = this.currentCart.map((e) => e.id).join(",");
        localStorage.setItem("cart", cartIdList);
    }

    updateCart() {
        if (this.currentCart.length === 0) {
            this.cartPrice.textContent = "Cart total: € 0.00";
            this.cartStatus.textContent = "Cart is empty";
        } else {
            const price = this.getTotalPrice();
            this.cartPrice.textContent = `Cart total: € ${price}`;
            if (this.currentCart.length === 1) this.cartStatus.textContent = "In Cart: 1 product";
            else this.cartStatus.textContent = `In Cart: ${this.currentCart.length} products`;
        }
        this.saveCart();
    }

    getTotalPrice() {
        return this.currentCart.reduce((acc, e) => acc + e.price, 0);
    }
}
