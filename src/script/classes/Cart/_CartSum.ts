import { Promo } from "../../types/_types";

export class CartSum {
    container: HTMLElement;

    productsNumber: number;

    totalPrice: number;

    curentDiscount: number;

    promoCodes: Promo[];

    currentPromo: string[] = [];

    promoInput: HTMLInputElement;

    selectedPromo: HTMLElement;

    wrapper: HTMLElement;

    constructor(container: HTMLElement, productsNumber: number, price: number) {
        this.promoCodes = [
            ["hehe", 5],
            ["haha", 10],
            ["hoho", 15],
        ];
        this.container = container;
        this.productsNumber = productsNumber;
        this.totalPrice = price;

        this.wrapper = document.createElement("div");
        this.wrapper.className = "summary-wrapper";

        this.render(this.productsNumber, this.totalPrice);
        window.addEventListener("beforeunload", this.savePromo.bind(this));
    }

    addPromo() {
        if (
            this.promoCodes.map((e) => e[0]).includes(this.promoInput.value) &&
            !this.currentPromo.includes(this.promoInput.value)
        ) {
            this.currentPromo.push(this.promoInput.value);
            this.savePromo();
            this.render(this.productsNumber, this.totalPrice);
        }
    }

    removePromo(elem: HTMLElement) {
        const promo = elem.dataset.promo;
        if (!promo) return;
        this.currentPromo = this.currentPromo.filter((e) => e !== promo);
        this.savePromo();
        this.render(this.productsNumber, this.totalPrice);
    }

    promoField(elem: HTMLInputElement) {
        if (this.promoCodes.map((e) => e[0]).includes(elem.value)) {
            if (this.currentPromo.includes(elem.value)) {
                this.selectedPromo.textContent = "This promocode already used";
            } else {
                const promo = this.getPromoByName(elem.value);
                if (!promo) return;
                this.selectedPromo.textContent = `${promo[0]}: -${promo[1]}%`;
            }
        } else {
            this.selectedPromo.textContent = "";
        }
    }

    getPromoByName(str: string): Promo | undefined {
        return this.promoCodes.find((e) => str === e[0]);
    }

    getDiscountPrice(): number {
        const disc = this.currentPromo.reduce((acc, e) => {
            const promo = this.getPromoByName(e);
            if (promo) return acc + promo[1];
            return acc;
        }, 0);
        return (this.totalPrice * (100 - disc)) / 100;
    }

    getSelectedPromo(): string {
        return "";
    }

    savePromo() {
        localStorage.setItem("promo", this.currentPromo.join(","));
    }

    loadPromo() {
        const data = localStorage.getItem("promo");
        if (!data) return;
        this.currentPromo = data.split(",");
    }

    render(productNumber: number, priceTotal: number) {
        this.loadPromo();
        this.wrapper.replaceChildren();

        const title = document.createElement("h2");
        title.className = "summary-title";
        title.textContent = "Summary";

        const prodNumber = document.createElement("div");
        prodNumber.textContent = `Products: ${productNumber}`;
        prodNumber.className = "sum-products-number";

        const price = document.createElement("div");
        price.textContent = `Price: ${priceTotal}€`;
        price.className = "total-price";

        this.promoInput = document.createElement("input");
        this.promoInput.type = "text";
        this.promoInput.className = "promo-input";
        this.promoInput.placeholder = "for test: hehe, haha, hoho";

        const addPromoWrapper = document.createElement("div");
        addPromoWrapper.className = "add-promo-wrapper";

        this.selectedPromo = document.createElement("div");
        this.selectedPromo.className = "selected-promo invis";
        addPromoWrapper.appendChild(this.selectedPromo);

        const addPromoButton = document.createElement("button");
        addPromoButton.textContent = "add";
        addPromoButton.className = "add-promo";
        addPromoWrapper.appendChild(addPromoButton);

        [title, prodNumber, price, this.promoInput, addPromoWrapper].forEach((e) => this.wrapper.appendChild(e));

        if (this.currentPromo.length !== 0) {
            const priceDisc = document.createElement("div");
            priceDisc.textContent = `PRICE NOW: ${this.getDiscountPrice()}€`;
            priceDisc.className = "price-discount";
            price.className = "total-price line-through";

            const appliedCodesWrapper = document.createElement("div");
            appliedCodesWrapper.className = "apl-promo-wrapper";

            const appliedPromoTitle = document.createElement("h3");
            appliedPromoTitle.textContent = "Applied promocodes";
            appliedCodesWrapper.appendChild(appliedPromoTitle);

            this.currentPromo.forEach((e) => {
                const promo = this.getPromoByName(e);
                if (!promo) return;
                const applPromo = document.createElement("div");
                applPromo.textContent = `${promo[0]}: -${promo[1]}%`;
                const dropPromoButton = document.createElement("button");
                dropPromoButton.textContent = "drop";
                dropPromoButton.className = "drop-promo";
                dropPromoButton.dataset.promo = `${promo[0]}`;
                appliedCodesWrapper.appendChild(applPromo);
                appliedCodesWrapper.appendChild(dropPromoButton);
            });
            this.wrapper.appendChild(appliedPromoTitle);
            this.wrapper.appendChild(appliedCodesWrapper);
            this.wrapper.appendChild(priceDisc);
        }

        const buyButton = document.createElement("button");
        buyButton.textContent = "BUY NOW!";
        buyButton.className = "buy-button";
        this.wrapper.appendChild(buyButton);
        this.container.appendChild(this.wrapper);
    }
}
