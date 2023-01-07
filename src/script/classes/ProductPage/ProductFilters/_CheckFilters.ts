import { IProduct, IFilters } from "../../../types/_interfaces";
import { FilterType } from "../../../types/_enums";

export class CheckFilter {
    container: HTMLElement;
    filters: IFilters;
    constructor(container: HTMLElement, filters: IFilters) {
        this.container = container;
        this.filters = filters;
    }
    renderFilter(data: IProduct[], type: FilterType) {
        const categoryList = document.createElement("div");
        categoryList.className = `${type}-list check-filter`;
        this.container.appendChild(categoryList);
        const arr = Array.from(new Set(data.map((e) => e[type])));
        arr.forEach((e) => {
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
}
