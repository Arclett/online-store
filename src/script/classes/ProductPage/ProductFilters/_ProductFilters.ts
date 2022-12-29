import { IProduct, IFilters } from "../../../types/_interfaces";
import { FilterType, RangeFilters } from "../../../types/_enums";
import { CheckFilter } from "./_CheckFilters";
import { RangeFilter } from "./_RangeFilters";
import { main } from "../../../..";

export class ProductFilters {
    data: IProduct[];

    container: HTMLElement;

    filters: IFilters;

    checkFilters: CheckFilter;

    rangeFilters: RangeFilter;

    constructor(data: IProduct[], container: HTMLElement, option: string) {
        this.data = data;
        this.container = container;
        this.assignFilters(option);
        this.checkFilters = new CheckFilter(this.container, this.filters);
        this.rangeFilters = new RangeFilter(this.container, this.filters);
        this.renderFilters(this.data);
    }

    renderFilters(data: IProduct[]) {
        this.checkFilters.renderFilter(data, FilterType.category);
        this.checkFilters.renderFilter(data, FilterType.brand);
        this.rangeFilters.renderRange(data, RangeFilters.price);
        this.rangeFilters.renderRange(data, RangeFilters.stock);
    }

    assignFilters(data: string) {
        let [category, brand, price, stock, sort] = data.replace("?", "").split("&");
        this.filters = {
            category: this.splitFilters(category),
            brand: this.splitFilters(brand),
            price: this.splitFilters(price),
            stock: this.splitFilters(stock),
            sort: this.splitFilters(sort),
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
            filter.stock.length === 0 &&
            filter.sort.length === 0
        ) {
            return "/";
        }
        if (
            filter.price[0] === main.porductMain.productList.priceRange[0] &&
            filter.price[1] === main.porductMain.productList.priceRange[1] &&
            filter.stock[0] === main.porductMain.productList.stockRange[0] &&
            filter.stock[1] === main.porductMain.productList.stockRange[1]
        ) {
            return "/";
        }

        let url: string = "/?";
        if (filter.category.length > 0) url += `category=${filter.category.join("↕")}&`;
        if (filter.brand.length > 0) url += `brand=${filter.brand.join("↕")}&`;
        if (
            !(
                filter.price[0] === main.porductMain.productList.priceRange[0] &&
                filter.price[1] === main.porductMain.productList.priceRange[1]
            ) &&
            filter.price.length > 0
        ) {
            url += `price=${filter.price[0]}↕${filter.price[1]}&`;
        }
        if (
            !(
                filter.stock[0] === main.porductMain.productList.stockRange[0] &&
                filter.stock[1] === main.porductMain.productList.stockRange[1]
            ) &&
            filter.stock.length > 0
        ) {
            url += `stock=${filter.stock[0]}↕${filter.stock[1]}&`;
        }
        if (filter.sort.length > 0) console.log(filter.sort);
        if (url[url.length - 1] === "&") return url.slice(0, url.length - 1);

        return url;
    }
}
