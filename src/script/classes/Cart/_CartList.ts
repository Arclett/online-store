import { IProduct } from "../../types/_interfaces";
import { CartListSettings } from "./_CartListSettings";
import { CartProductCard } from "./_CartProductCard";

export class CartList {
    container: HTMLElement;

    cartListSettings: CartListSettings;

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

        this.cartListSettings = new CartListSettings(listSettings, currentPageNumber, maxLimit, limit);

        curentPage.forEach((e, i) => new CartProductCard(e, listWrapper, i));
    }
}
