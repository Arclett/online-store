import { ProductMain } from "./ProductPage/_ProductMain";
import { Details } from "./ProductDetails/_Details";
import { isElement } from "../types/_typeguards";
import { CartMain } from "./Cart/_CartMain";
import { router } from "../..";

export class Main {
    porductMain: ProductMain;

    details: Details;

    cart: CartMain;

    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector(".main");
        if (!isElement(this.container)) return;
        this.porductMain = new ProductMain(this.container);
        this.details = new Details(this.container);
        this.cart = new CartMain(this.container);
        const body: HTMLElement | null = document.querySelector(".body-wrapper");
        if (isElement(body)) {
            body.addEventListener("click", this.clickHandler);
            body.addEventListener("input", this.inputHandler.bind(this));
            body.addEventListener("change", this.changeHandler.bind(this));
        }
    }

    clickHandler(e: Event) {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("cart-logo")) {
            if (router) {
                router.route("/cart");
                router.locHandling();
            }
        }
    }

    inputHandler(e: Event) {
        this.porductMain.update(e);
    }

    changeHandler(e: Event) {
        this.porductMain.sort(e);
    }
}
