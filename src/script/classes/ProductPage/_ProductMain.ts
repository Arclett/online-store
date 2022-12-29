import { IProduct } from "../../types/_interfaces";
import { loader, router } from "../../..";
import { ProductList } from "./ProductList/_ProductList";
import { ProductFilters } from "./ProductFilters/_ProductFilters";
import { ProductListSettings } from "./ProductList/_ProductListSettings";

export class ProductMain {
    data: { products: IProduct[] } = { products: [] };

    listContainer: HTMLElement;

    filtersContainer: HTMLElement;

    settingsContainer: HTMLElement;

    thumbnails: HTMLImageElement[] = [];

    productList: ProductList;

    productFilters: ProductFilters;

    productSettings: ProductListSettings;

    mainContainer: HTMLElement;

    constructor(container: HTMLElement) {
        this.mainContainer = container;
    }

    async render(option: string) {
        await this.renderProductPage();
        this.productFilters = new ProductFilters(this.data.products, this.filtersContainer, option);
        this.productList = new ProductList(this.data.products, this.listContainer);
        this.productSettings = new ProductListSettings(this.settingsContainer);
    }

    async renderProductPage() {
        const data: { products: IProduct[] } = await loader.load();
        this.data = data;
        if (this.thumbnails.length === 0) {
            this.loadImages(this.data.products);
        }
        this.mainContainer.replaceChildren();
        this.listContainer = document.createElement("section");
        this.listContainer.className = "product-list";
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
            if (e.target.className.split(" ")[1] === "low-range") {
                this.productFilters.filters.price[0] = e.target.value;
            }
            if (e.target.className.split(" ")[1] === "max-range") {
                this.productFilters.filters.price[1] = e.target.value;
            }
        }
        if (type === "stock") {
            if (this.productFilters.filters.stock.length === 0) {
                this.productFilters.filters.stock = [e.target.min, e.target.max];
            }
            if (e.target.className.split(" ")[1] === "low-range") {
                this.productFilters.filters.stock[0] = e.target.value;
            }
            if (e.target.className.split(" ")[1] === "max-range") {
                this.productFilters.filters.stock[1] = e.target.value;
            }
        }

        this.productList.updateList();
        const url: string = this.productFilters.makeUrl();

        router.route(url);
    }

    sort(e: Event) {
        if (!(e.target instanceof HTMLSelectElement)) return;
        this.productFilters.filters.sort = ["sort", e.target.value];
        console.log(this.productFilters.filters);
        this.productList.updateList();
        const url: string = this.productFilters.makeUrl();
        router.route(url);
    }
}
