import { main } from "../..";

export class Router {
    constructor() {
        this.locHandling();
        window.addEventListener("popstate", this.locHandling);
    }
    route(url: string) {
        window.history.pushState({}, "", `${url}`);
    }
    locHandling() {
        if (!main) return;
        const path = window.location.pathname;
        if (path === "/") {
            main.porductMain.init();
        }
        if (path === "/product-details/1") {
            main.details.render();
        }
    }
}
