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
        this.rangeFilters.updateRangeLabel();
    }

    assignFilters(data: string) {
        const arr = data.replace("?", "").split("&");

        this.filters = {
            category: this.splitFilters("category", arr),
            brand: this.splitFilters("brand", arr),
            price: this.splitFilters("price", arr),
            stock: this.splitFilters("stock", arr),
            sort: this.splitFilters("sort", arr),
            search: this.splitFilters("search", arr),
        };
    }

    splitFilters(str: string, arr: string[]) {
        let res: string[] = [];
        arr.forEach((e) => {
            if (e.includes(str)) {
                res = e.split("=")[1].split("%E2%86%95");
            }
        });
        return res;
    }

    makeUrl(): string {
        const filter = this.filters;
        if (this.isFiltersEmpty(filter)) return "/";
        if (this.isPriceEmpty(filter) && this.isStockEmpty(filter)) return "/";

        let url = "/?";
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
        if (filter.sort.length > 0) url += `sort=${filter.sort[1]}&`;
        if (filter.search.length > 0) url += `search=${filter.search[0]}&`;
        if (main.porductMain.view) url += `view=${main.porductMain.view}&`;
        if (url[url.length - 1] === "&") return url.slice(0, url.length - 1);

        return url;
    }

    isFiltersEmpty(filter: IFilters) {
        if (
            filter.brand.length === 0 &&
            filter.category.length === 0 &&
            filter.price.length === 0 &&
            filter.stock.length === 0 &&
            filter.sort.length === 0 &&
            filter.search.length === 0 &&
            !main.porductMain.view
        ) {
            return true;
        }
        return false;
    }

    isPriceEmpty(filter: IFilters) {
        if (
            filter.price[0] === main.porductMain.productList.priceRange[0] &&
            filter.price[1] === main.porductMain.productList.priceRange[1]
        ) {
            return true;
        }
        return false;
    }

    isStockEmpty(filter: IFilters) {
        if (
            filter.stock[0] === main.porductMain.productList.stockRange[0] &&
            filter.stock[1] === main.porductMain.productList.stockRange[1]
        ) {
            return true;
        } else return false;
    }
}
