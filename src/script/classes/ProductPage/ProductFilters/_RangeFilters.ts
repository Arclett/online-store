import { IProduct, IFilters } from "../../../types/_interfaces";
import { RangeFilters } from "../../../types/_enums";
import { main } from "../../../..";

export class RangeFilter {
    container: HTMLElement;
    filters: IFilters;

    constructor(container: HTMLElement, filters: IFilters) {
        this.container = container;
        this.filters = filters;
    }
    renderRange(data: IProduct[], type: RangeFilters) {
        const [dataMin, dataMax] = this.getRangeValue(type, data);
        const rangeContainer = document.createElement("div");
        rangeContainer.className = "range-container";
        this.container.appendChild(rangeContainer);
        const minInput = document.createElement("input");
        minInput.type = "range";
        minInput.min = `${dataMin}`;
        minInput.max = `${dataMax}`;

        minInput.className = `${type} low-range`;
        rangeContainer.appendChild(minInput);
        const maxInput = document.createElement("input");
        maxInput.type = "range";
        maxInput.min = `${dataMin}`;
        maxInput.max = `${dataMax}`;
        maxInput.className = `${type} max-range`;
        rangeContainer.appendChild(maxInput);
        if (this.filters[type].length > 0) {
            minInput.value = this.filters[type][0];
            maxInput.value = this.filters[type][1];
        } else {
            maxInput.value = `${dataMax}`;
            minInput.value = `${dataMin}`;
        }
    }

    getRangeValue(type: RangeFilters, data: IProduct[]) {
        const dataSorted = data.slice().sort((a, b) => a[type] - b[type]);
        const dataMin = dataSorted[0][type] + "";
        const dataMax = dataSorted[dataSorted.length - 1][type] + "";
        return [dataMin, dataMax];
    }

    updateFilters() {}
}
