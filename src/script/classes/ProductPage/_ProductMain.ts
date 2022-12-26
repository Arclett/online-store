import { IProduct } from "../../types/_interfaces";
import { loader, router } from "../../..";
import { ProductList } from "./ProductList/_ProductList";
import { ProductFilters } from "./ProductFilters/_ProductFilters";

export class ProductMain {
    data: { products: IProduct[] } = { products: [] };

    listContainer: HTMLElement;

    filtersContainer: HTMLElement;

    thumbnails: HTMLImageElement[] = [];

    productList: ProductList;

    productFilters: ProductFilters;

    mainContainer: HTMLElement;

    constructor(container: HTMLElement) {
        this.mainContainer = container;
    }

    async render(option: string) {
        await this.renderProductPage();
        this.productFilters = new ProductFilters(this.data.products, this.filtersContainer, option);
        this.productList = new ProductList(this.data.products, this.listContainer);
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
        this.mainContainer.appendChild(this.filtersContainer);
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
        if (!(e.target instanceof HTMLElement)) return;
        const type: string = e.target.className;
        if (type === "category" || type === "brand") {
            const id = e.target.id;
            if (this.productFilters.filters[type]?.includes(e.target.id)) {
                this.productFilters.filters[type] = this.productFilters.filters[type]?.filter((elem) => elem !== id);
            } else {
                this.productFilters.filters[type]?.push(e.target.id);
            }
        }
        console.log(this.productFilters.filters);
        this.productList.updateList();
        const url: string = this.productFilters.makeUrl();
        console.log(url);
        router.route(url);
    }
}
