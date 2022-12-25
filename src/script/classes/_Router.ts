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
        const path = window.location.href.split("/");
        console.log(path);
        if (path[path.length - 1] === "" || path[path.length - 1][0] === "?") {
            main.porductMain.render(path[path.length - 1]);
        }
        if (path[path.length - 2] === "product-details") {
            main.details.render();
        }
        if (path[path.length - 1] === "cart") {
            main.cart.render();
        }
    }
}
