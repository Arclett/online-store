import { ProductMain } from "./_ProductMain";
import { Details } from "./_Details";
import { isElement } from "../types/_typeguards";

export class Main {
    porductMain: ProductMain;
    details: Details;
    container: HTMLElement | null;
    constructor() {
        this.container = document.querySelector(".main");
        if (!isElement(this.container)) return;
        this.porductMain = new ProductMain(this.container);
        this.details = new Details(this.container);
    }
}
