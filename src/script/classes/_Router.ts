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
        const path = window.location.pathname.split("/");
        console.log(path);
        if (path[path.length - 1] === "") {
            main.porductMain.render();
        }
        if (path[path.length - 2] === "product-details") {
            main.details.render();
        }
        if (path[path.length - 1] === "cart") {
            main.cart.render();
        }
    }
}
