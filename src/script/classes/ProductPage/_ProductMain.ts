import { IProduct } from "../../types/_interfaces";
import { loader, main, router } from "../../..";
import { ProductList } from "./ProductList/_ProductList";
import { ProductFilters } from "./ProductFilters/_ProductFilters";
import { ProductListSettings } from "./ProductList/_ProductListSettings";
import { ProductCart } from "./_ProductCart";

export class ProductMain {
    data: { products: IProduct[] } = { products: [] };

    listContainer: HTMLElement;

    filtersContainer: HTMLElement;

    settingsContainer: HTMLElement;

    thumbnails: HTMLImageElement[] = [];

    productList: ProductList;

    productFilters: ProductFilters;

    productSettings: ProductListSettings;

    productCart: ProductCart;

    mainContainer: HTMLElement;

    view: string | undefined;

    constructor(container: HTMLElement) {
        this.mainContainer = container;
        this.mainContainer.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event) {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("list")) {
            this.view = "list";
            this.setView(this.view);
            const link: string = this.productFilters.makeUrl();
            router.route(link);
        }
        if (e.target.classList.contains("thumb")) {
            this.view = "thumb";
            this.setView(this.view);
            const link: string = this.productFilters.makeUrl();
            router.route(link);
        }
        if (e.target.classList.contains("copy")) {
            const link: string = window.location.href;
            navigator.clipboard.writeText(link);
        }
        if (e.target.classList.contains("reset")) {
            router.route("/");
            router.locHandling();
        }
    }

    setView(data: string) {
        const view = data;
        const viewInactive = view === "list" ? "thumb" : "list";
        this.listContainer.classList.add(`product-${view}`);
        this.listContainer.classList.remove(`product-${viewInactive}`);
        const cards: NodeListOf<Element> = document.querySelectorAll(".product");
        if (cards.length > 0) {
            cards.forEach((e) => {
                e.classList.add(`view-${view}`);
                e.classList.remove(`view-${viewInactive}`);
            });
        }
    }

    async render(option: string, data: string | undefined) {
        let view = data;
        if (!view) {
            view = "thumb";
        }
        this.mainContainer.className = "main-product";
        await this.renderProductPage();
        this.productFilters = new ProductFilters(this.data.products, this.filtersContainer, option);
        this.productList = new ProductList(this.data.products, this.listContainer);
        this.productSettings = new ProductListSettings(this.settingsContainer);
        this.productCart = new ProductCart(this.data.products);
        this.productSettings.updateSearchCount(main.porductMain.productList.currentList.length);
        this.productSettings.updateSearchInput(this.productFilters.filters.search[0]);
        this.productList.updateListCartStatus();
        this.setView(view);
    }

    async renderProductPage() {
        const data: { products: IProduct[] } = await loader.load();
        this.data = data;
        if (this.thumbnails.length === 0) {
            this.loadImages(this.data.products);
        }
        this.mainContainer.replaceChildren();
        this.listContainer = document.createElement("section");
        this.listContainer.className = `product-${this.view}`;
        this.filtersContainer = document.createElement("aside");
        this.filtersContainer.className = "filters";
        this.settingsContainer = document.createElement("div");
        this.settingsContainer.className = "list-settings";
        this.mainContainer.appendChild(this.filtersContainer);
        this.mainContainer.appendChild(this.settingsContainer);
        this.mainContainer.appendChild(this.listContainer);
    }

    async loadImages(data: IProduct[]) {
        data.forEach((e) => {
            const img = new Image();
            img.src = e.thumbnail;
            img.loading = "lazy";
            img.className = "thumbnail";
            img.dataset.id = `${e.id}`;
            this.thumbnails.push(img);
        });
    }

    getImage(id: number) {
        return this.thumbnails.find((e) => e.dataset.id === `${id}`);
    }

    update(e: Event) {
        if (!(e.target instanceof HTMLInputElement)) return;
        if (e.target.classList.contains("num-input") || e.target.classList.contains("promo-input")) return;
        const type: string = e.target.className.split(" ")[0];

        if (type === "category" || type === "brand") {
            const id = e.target.id;
            if (this.productFilters.filters[type]?.includes(e.target.id)) {
                this.productFilters.filters[type] = this.productFilters.filters[type]?.filter((elem) => elem !== id);
            } else {
                this.productFilters.filters[type]?.push(e.target.id);
            }
        }

        if (type === "price") {
            if (this.productFilters.filters.price.length === 0) {
                this.productFilters.filters.price = [e.target.min, e.target.max];
            }
            if (e.target.className.split(" ")[1] === "range-min") {
                this.productFilters.filters.price[0] = e.target.value;
            }
            if (e.target.className.split(" ")[1] === "range-max") {
                this.productFilters.filters.price[1] = e.target.value;
            }
        }
        if (type === "stock") {
            if (this.productFilters.filters.stock.length === 0) {
                this.productFilters.filters.stock = [e.target.min, e.target.max];
            }
            if (e.target.className.split(" ")[1] === "range-min") {
                this.productFilters.filters.stock[0] = e.target.value;
            }
            if (e.target.className.split(" ")[1] === "range-max") {
                this.productFilters.filters.stock[1] = e.target.value;
            }
        }
        if (type === "search") {
            const value = e.target.value;
            if (value === "") {
                this.productFilters.filters.search = [];
            } else {
                this.productFilters.filters.search = [value];
            }
        }

        this.productList.updateList();
        const url: string = this.productFilters.makeUrl();

        router.route(url);
    }

    sort(e: Event) {
        if (!(e.target instanceof HTMLSelectElement)) return;
        this.productFilters.filters.sort = ["sort", e.target.value];
        this.productList.updateList();
        const url: string = this.productFilters.makeUrl();
        router.route(url);
    }
}
