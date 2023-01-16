import { main } from "../..";

export class Router {
    constructor() {
        this.locHandling();
        window.addEventListener("popstate", this.locHandling);
    }

    public route(url: string) {
        window.history.pushState({}, "", `${url}`);
    }

    public locHandling() {
        if (!main) return;
        const path = window.location.href.split("/");
        if (path[path.length - 1].includes("cart")) {
            const tail = path[path.length - 1].replace("?", "");
            this.route(tail);
            main.cart.render(tail);
            return;
        } else if (path[path.length - 1].includes("product-details")) {
            main.details.render(path);
            return;
        } else if (path[path.length - 1] === "" || path[path.length - 1][0] === "?") {
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
        } else {
            main.render404();
        }
    }
}
