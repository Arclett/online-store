import { ProductMain } from "./ProductPage/_ProductMain";
import { Details } from "./ProductDetails/_DetailsMain";
import { isElement } from "../types/_typeguards";
import { CartMain } from "./Cart/_CartMain";
import { router } from "../..";

export class Main {
    porductMain: ProductMain;

    details: Details;

    cart: CartMain;

    container: HTMLElement | null;

    constructor() {
        const mainElement: HTMLElement | null = document.querySelector(".main");
        if (!isElement(mainElement)) return;
        this.container = document.createElement("div");
        mainElement.appendChild(this.container);
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
        if (
            e.target.classList.contains("cart-logo") ||
            e.target.classList.contains("cart-total") ||
            e.target.classList.contains("cart-status")
        ) {
            if (router) {
                router.route("/cart");
                router.locHandling();
            }
        }
        if (e.target.classList.contains("main-title")) {
            if (router) {
                router.route("/");
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

    render404() {
        if (!this.container) return;
        this.container.replaceChildren();

        const notFound = document.createElement("div");
        notFound.textContent = "PAGE NOT FOUND (404)";
        notFound.className = "no-product";

        this.container.appendChild(notFound);
    }
}
