import { loader, router } from "../../..";
import { CartParams } from "../../types/_enums";
import { ICartParams, IProduct } from "../../types/_interfaces";
import { CartList } from "./_CartList";
import { ProductCart } from "../ProductPage/_ProductCart";
import { CartPagination } from "./_CartPagination";
import { CartSum } from "./_CartSum";
import { BuyWindow } from "../Buy/_BuyWindow";

export class CartMain {
    container: HTMLElement;

    data: IProduct[];

    currentCart: IProduct[] = [];

    productCart: ProductCart;

    cartList: CartList;

    cartSum: CartSum;

    cartPagination: CartPagination;

    cartParams: ICartParams = { page: 1, limit: 3 };

    currentPageItems: IProduct[];

    buyWindow: BuyWindow;

    constructor(container: HTMLElement) {
        this.container = container;
        this.cartPagination = new CartPagination();
        this.buyWindow = new BuyWindow(this.container);
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
        if (e.target.classList.contains("amount-add") || e.target.classList.contains("amount-remove")) {
            this.changeAmount(e.target);
        }
        if (e.target.classList.contains("add-promo")) {
            this.cartSum.addPromo();
        }
        if (e.target.classList.contains("drop-promo")) {
            this.cartSum.removePromo(e.target);
        }
        if (e.target.classList.contains("buy-button")) {
            this.buyWindow.render(this.container);
        }
        if (e.target.classList.contains("overlay")) {
            this.update();
        }
        if (e.target.classList.contains("cart-thumb")) {
            const parent: HTMLElement | null = e.target.closest(".cart-product");
            const id = parent?.dataset.id;
            if (id) {
                router.route(`/product-details-${id}`);
                router.locHandling();
            }
        }
    }

    inputHandler(e: Event) {
        if (!(e.target instanceof HTMLInputElement)) return;
        if (e.target.classList.contains("num-input")) {
            this.limitInput(e.target);
        }
        if (e.target.classList.contains("promo-input")) {
            this.cartSum.promoField(e.target);
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
        this.update();
        this.updateUrl(CartParams.page);
    }

    prevPage() {
        if (this.cartParams.page === 1) return;
        this.cartParams.page -= 1;
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        this.update();
        this.updateUrl(CartParams.page);
    }

    changeAmount(elem: HTMLElement) {
        const parent: HTMLElement | null = elem.closest(".cart-product");
        const id = parent?.dataset.id;
        if (!id) return;
        const product: IProduct | undefined = this.data.find((e) => e.id === Number(id));
        if (!product) return;
        const count: HTMLElement | null = parent.querySelector(".amount");
        if (!count) return;
        const curCount = count.textContent;
        if (!curCount) return;
        if (elem.classList.contains("amount-add")) {
            this.addAmount(product, curCount);
        }
        if (elem.classList.contains("amount-remove")) {
            this.removeAmount(product, curCount);
        }
    }

    addAmount(product: IProduct, curCount: string) {
        if (Number(curCount) >= product.stock) return;
        this.currentCart.push(product);
        this.productCart.currentCart = this.currentCart;
        this.productCart.updateCart();
        this.update();
    }

    removeAmount(product: IProduct, curCount: string) {
        if (Number(curCount) > 1) {
            const data = this.currentCart.slice().reverse();
            const index = data.indexOf(product);
            data.splice(index, 1);
            this.currentCart = data.reverse();
            this.productCart.currentCart = this.currentCart;
            this.productCart.updateCart();
            this.update();
        }
        if (Number(curCount) === 1) {
            this.currentCart = this.currentCart.filter((e) => e !== product);
            this.productCart.currentCart = this.currentCart;
            if (this.currentPageItems.length === 1) {
                this.cartParams.page -= 1;
            }
            this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
            this.productCart.updateCart();
            this.update();
        }
    }

    async render(query: string) {
        this.container.replaceChildren();
        this.container.className = "main-cart";
        await this.getCart();
        this.queryHandler(query);
        this.productCart = new ProductCart(this.data);
        this.currentCart = this.productCart.currentCart;
        if (this.currentCart.length === 0) {
            this.renderEmpty();
            return;
        }
        this.currentPageItems = this.cartPagination.getPage(this.cartParams, this.currentCart);
        this.cartList = new CartList(
            this.container,
            this.currentPageItems,
            this.cartParams.page,
            this.cartPagination.getCartSet(this.currentCart).length,
            this.cartParams.limit
        );
        this.cartSum = new CartSum(this.container, this.currentCart.length, this.productCart.getTotalPrice());
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
        this.cartSum.render(this.currentCart.length, this.productCart.getTotalPrice());
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
        const url = `/cart?${tail.join("&")}`;
        router.route(url);
    }

    renderEmpty() {
        const empty = document.createElement("div");
        empty.className = "cart-empty";
        empty.textContent = "Cart is Empty";

        this.container.appendChild(empty);
    }
}
