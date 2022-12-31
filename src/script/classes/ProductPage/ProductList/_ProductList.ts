import { IFilters, IProduct } from "../../../types/_interfaces";
import { ProductCard } from "./_ProductCard";
import { router, main } from "../../../..";
import { RangeFilters } from "../../../types/_enums";

export class ProductList {
    data: IProduct[];

    currentList: IProduct[] = [];

    container: HTMLElement;

    priceRange: string[];

    stockRange: string[];

    constructor(data: IProduct[], container: HTMLElement) {
        this.data = data;
        this.container = container;
        this.priceRange = main.porductMain.productFilters.rangeFilters.getRangeValue(RangeFilters.price, this.data);
        this.stockRange = main.porductMain.productFilters.rangeFilters.getRangeValue(RangeFilters.stock, this.data);
        this.filterData();
        this.renderList(this.currentList);

        this.container.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event): void {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.classList.contains("product") || e.target.classList.contains("infoButton")) {
            if (router) {
                router.route(`/product-details/${e.target.dataset.id}`);
                router.locHandling();
            }
        }
        if (e.target.classList.contains("add-to-cart")) {
            console.log("Add to cart +++");
        }
    }

    filterData() {
        const filter = main.porductMain.productFilters.filters;
        this.currentList = this.data;
        if (
            filter.brand.length === 0 &&
            filter.category.length === 0 &&
            filter.price.length === 0 &&
            filter.stock.length === 0 &&
            filter.search.length === 0
        ) {
            return;
        }
        this.currentList = this.currentList.filter((e) => {
            let category: boolean, brand: boolean, price: boolean, stock: boolean, search: boolean;
            if (filter.category.length > 0) category = filter.category.includes(e.category);
            else category = true;
            if (filter.brand.length > 0) brand = filter.brand.includes(e.brand);
            else brand = true;
            if (filter.price.length > 0) price = e.price > Number(filter.price[0]) && e.price < Number(filter.price[1]);
            else price = true;
            if (filter.stock.length > 0) stock = e.stock > Number(filter.stock[0]) && e.stock < Number(filter.stock[1]);
            else stock = true;
            if (filter.search.length > 0) search = this.search(filter.search[1], e);
            else search = true;
            if (category && brand && price && stock && search) return true;
        });
    }

    search(str: string, elem: IProduct) {
        let res = false;
        Object.values(elem).forEach((e) => {
            if (e.toString().toLowerCase().includes(str.toLowerCase())) res = true;
        });
        return res;
    }

    sortData() {
        const filter = main.porductMain.productFilters.filters;
        if (filter.sort.length === 0) return;
        const [type, order] = filter.sort[1].split("-");
        if (type === "price") {
            if (order === "ASC") {
                this.currentList = this.currentList.sort((a, b) => a.price - b.price);
            }
            if (order === "DESC") {
                this.currentList = this.currentList.sort((a, b) => b.price - a.price);
            }
        }
        if (type === "rating") {
            if (order === "ASC") {
                this.currentList = this.currentList.sort((a, b) => a.rating - b.rating);
            }
            if (order === "DESC") {
                this.currentList = this.currentList.sort((a, b) => b.rating - a.rating);
            }
        }
    }

    renderList(data: IProduct[]) {
        this.container.replaceChildren();
        data.forEach((e) => {
            const product: HTMLElement = document.createElement("div");
            product.className = `product view-thumb`;
            product.dataset.id = `${e.id}`;
            this.container.appendChild(product);
            new ProductCard(e, product);
        });
    }

    updateList() {
        this.filterData();
        this.sortData();
        this.renderList(this.currentList);
        const data = main.porductMain.view;
        if (data) {
            main.porductMain.setView(data);
        } else {
            main.porductMain.setView("thumb");
        }
    }
}
