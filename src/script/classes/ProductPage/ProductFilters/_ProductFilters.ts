import { IProduct } from "../../../types/_interfaces";
import { FilterType } from "../../../types/_enums";
import { IFilters } from "../../../types/_interfaces";

export class ProductFilters {
    data: IProduct[];

    container: HTMLElement;

    filters: IFilters;

    constructor(data: IProduct[], container: HTMLElement, option: string) {
        this.data = data;
        this.container = container;
        this.assignFilters(option);
        this.renderFilters(this.data);
    }

    renderFilters(data: IProduct[]) {
        this.renderFilter(data, FilterType.category);
        this.renderFilter(data, FilterType.brand);
    }

    renderFilter(data: IProduct[], type: FilterType) {
        console.log(type);
        console.log(this.filters);
        const categoryList = document.createElement("div");
        categoryList.className = `${type}-list check-filter`;
        this.container.appendChild(categoryList);
        new Set(data.map((e) => e[type])).forEach((e) => {
            const category = document.createElement("div");
            const categoryInput = document.createElement("input");
            categoryInput.className = type;
            categoryInput.type = "checkbox";
            if (this.filters[type]?.includes(e)) {
                categoryInput.checked = true;
            }
            categoryInput.id = e;
            categoryInput.name = e;
            category.appendChild(categoryInput);
            const categoryLabel = document.createElement("label");
            categoryLabel.className = type;
            categoryLabel.htmlFor = e;
            categoryLabel.textContent = e;
            category.appendChild(categoryLabel);
            categoryList.appendChild(category);
        });
    }

    assignFilters(data: string) {
        let [category, brand, price, stock] = data.replace("?", "").split("&");
        this.filters = {
            category: this.splitFilters(category),
            brand: this.splitFilters(brand),
            price: this.splitFilters(price),
            stock: this.splitFilters(stock),
        };
    }

    splitFilters(str: string | undefined) {
        if (str) return str.split("=")[1].split("%E2%86%95");
        return [];
    }

    makeUrl(): string {
        const filter = this.filters;
        if (
            filter.brand.length === 0 &&
            filter.category.length === 0 &&
            filter.price.length === 0 &&
            filter.stock.length === 0
        ) {
            return "/";
        }
        let url: string = "/?";
        if (filter.category.length > 0) url += `category=${filter.category.join("↕")}&`;
        if (filter.brand.length > 0) url += `brand=${filter.brand.join("↕")}&`;
        if (url[url.length - 1] === "&") return url.slice(0, url.length - 1);

        return url;
    }
}
