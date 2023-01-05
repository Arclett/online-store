import { ICartParams, IProduct } from "../../types/_interfaces";
import { cartListSettings } from "./_CartListSettings";
import { main } from "../../..";
import { CartProductCard } from "./_CartProductCard";

export class CartList {
    container: HTMLElement;

    cartListSettings: cartListSettings;

    constructor(
        container: HTMLElement,
        currentPage: IProduct[],
        currentPageNumber: number,
        maxLimit: number,
        limit: number
    ) {
        this.container = container;
        this.render(currentPage, currentPageNumber, maxLimit, limit);
    }

    render(curentPage: IProduct[], currentPageNumber: number, maxLimit: number, limit: number) {
        this.container.replaceChildren();
        const listWrapper = document.createElement("div");
        listWrapper.className = "cart-list-wrapper";
        this.container.appendChild(listWrapper);

        const listSettings = document.createElement("div");
        listSettings.className = "cart-list-settings";
        listWrapper.appendChild(listSettings);

        this.cartListSettings = new cartListSettings(listSettings, currentPageNumber, maxLimit, limit);

        curentPage.forEach((e) => new CartProductCard(e, listWrapper));
    }
}
