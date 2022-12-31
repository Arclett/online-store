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
        if (path[path.length - 1] === "" || path[path.length - 1][0] === "?") {
            let tail = path[path.length - 1];
            let view: string | undefined;
            if (tail === "?view=list" || tail === "?view=thumb") {
                view = tail.split("=")[1];
                tail = "";
            }
            if (tail.includes("view=list")) {
                tail = tail.replace("&view=list", "");
                view = "list";
            }
            if (tail.includes("view=thumb")) {
                tail = tail.replace("&view=thumb", "");
                view = "thumb";
            }
            main.porductMain.render(tail, view);
        }
        if (path[path.length - 2] === "product-details") {
            main.details.render();
        }
        if (path[path.length - 1] === "cart") {
            main.cart.render();
        }
    }
}
