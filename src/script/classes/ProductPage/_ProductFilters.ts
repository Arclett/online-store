import { IProduct } from "../../types/_interfaces";
import { FilterType } from "../../types/_enums";

export class ProductFilters {
    data: IProduct[];

    container: HTMLElement;

    constructor(data: IProduct[], container: HTMLElement) {
        this.data = data;
        this.container = container;
        this.renderFilters(this.data);
    }

    renderFilters(data: IProduct[]) {
        this.renderCategory(data, FilterType.category);
        this.renderCategory(data, FilterType.brand);
    }

    renderCategory(data: IProduct[], type: FilterType) {
        const categoryList = document.createElement("div");
        categoryList.className = `${type}-list`;
        this.container.appendChild(categoryList);
        new Set(data.map((e) => e[type])).forEach((e) => {
            const category = document.createElement("div");
            const categoryInput = document.createElement("input");
            categoryInput.type = "checkbox";
            categoryInput.id = e;
            categoryInput.name = e;
            category.appendChild(categoryInput);
            const categoryLabel = document.createElement("label");
            categoryLabel.htmlFor = e;
            categoryLabel.textContent = e;
            category.appendChild(categoryLabel);
            categoryList.appendChild(category);
        });
    }
}
