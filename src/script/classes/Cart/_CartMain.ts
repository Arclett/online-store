import { loader, router } from "../../..";
import { CartParams } from "../../types/_enums";
import { ICartParams, IProduct } from "../../types/_interfaces";
import { ProductCart } from "../ProductPage/_ProductCart";
import { CartList } from "./_CartList";
import { CartPagination } from "./_CartPagination";

export class CartMain {
    container: HTMLElement;

    data: IProduct[];

    currentCart: IProduct[] = [];

    productCart: ProductCart;

    cartList: CartList;

    cartPagination: CartPagination;

    cartParams: ICartParams = { page: 1, limit: 3 };

    currentPageItems: IProduct[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.cartPagination = new CartPagination();
        this.container.addEventListener("click", this.clickHandler.bind(this));
        this.container.addEventListener("input", this.inputHandler.bind(this));
    }

    clickHandler(e: Event) {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("btn-fwd")) {
            this.nextPage();
        }
        if (e.target.classList.contains("btn-back")) {
            this.prevPage();
        }
    }

    inputHandler(e: Event) {
        if (!(e.target instanceof HTMLInputElement)) return;
        if (e.target.classList.contains("num-input")) {
            this.limitInput(e.target);
        }
    }

    limitInput(elem: HTMLInputElement) {
        if (elem.value === "0" || !elem.value) return;
        this.cartParams.limit = Number(elem.value);
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        this.update();
        this.updateUrl(CartParams.limit);
    }

    nextPage() {
        if (
            this.cartParams.page ===
            Math.ceil(this.cartPagination.getCartSet(this.currentCart).length / this.cartParams.limit)
        )
            return;
        this.cartParams.page += 1;
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        console.log(this.currentPageItems);
        this.update();
        this.updateUrl(CartParams.page);
    }

    prevPage() {
        if (this.cartParams.page === 1) return;
        this.cartParams.page -= 1;
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        console.log(this.currentPageItems);
        this.update();
        this.updateUrl(CartParams.page);
    }

    async render(query: string) {
        this.container.replaceChildren();
        this.container.className = "main-cart";
        await this.getCart();
        this.queryHandler(query);
        this.productCart = new ProductCart(this.data);
        this.currentCart = this.productCart.currentCart;
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        console.log(this.currentPageItems);
        this.cartList = new CartList(
            this.container,
            this.currentPageItems,
            this.cartParams.page,
            this.cartPagination.getCartSet(this.currentCart).length,
            this.cartParams.limit
        );
    }

    async getCart() {
        const data: { products: IProduct[] } = await loader.load();
        this.data = data.products;
    }

    update() {
        this.cartList.render(
            this.currentPageItems,
            this.cartParams.page,
            this.cartPagination.getCartSet(this.currentCart).length,
            this.cartParams.limit
        );
    }

    queryHandler(str: string) {
        const strMod = str.replace("cart", "").split("&");
        strMod.forEach((e) => {
            if (e.includes("page")) {
                this.cartParams.page = Number(e.split("=")[1]);
            }
            if (e.includes("limit")) {
                this.cartParams.limit = Number(e.split("=")[1]);
            }
        });
    }

    updateUrl(type: CartParams) {
        const curPath = window.location.href.split("/");
        console.log(window.location.href);
        const tail = curPath[curPath.length - 1]
            .replace("cart", "")
            .replace("?", "")
            .split("&")
            .filter((e) => e !== "");
        const find = tail.find((e) => e.includes(type));
        if (find) {
            const index = tail.indexOf(find);
            tail[index] = `${type}=${this.cartParams[type]}`;
        } else {
            tail.push(`${type}=${this.cartParams[type]}`);
        }
        console.log(tail);
        const url = `/cart?${tail.join("&")}`;
        router.route(url);
    }
}
