import { IProduct, IFilters } from "../../../types/_interfaces";
import { RangeFilters } from "../../../types/_enums";
import { main } from "../../../..";

export class RangeFilter {
    container: HTMLElement;
    filters: IFilters;

    priceLabelMin: HTMLLabelElement;
    priceLabelMax: HTMLLabelElement;
    stockLabelMax: HTMLLabelElement;
    stockLabelMin: HTMLLabelElement;

    priceInputMax: HTMLInputElement;
    priceInputMin: HTMLInputElement;
    stockInputMin: HTMLInputElement;
    stockInputMax: HTMLInputElement;

    stock: HTMLLabelElement;

    constructor(container: HTMLElement, filters: IFilters) {
        this.container = container;
        this.filters = filters;
    }
    renderRange(data: IProduct[], type: RangeFilters) {
        const [dataMin, dataMax] = this.getRangeValue(type, data);
        const labelContainer = document.createElement("div");
        labelContainer.className = "range-label-wrapper";
        const labelMin = document.createElement("label");
        labelMin.className = `${type}-range-min`;
        labelMin.htmlFor = `${type}-range-min`;
        labelMin.textContent = `${dataMin}`;
        this[`${type}LabelMin`] = labelMin;

        const labelMax = document.createElement("label");
        labelMax.className = `${type}-range-max`;
        labelMax.htmlFor = `${type}-range-max`;
        labelMax.textContent = `${dataMax}`;
        this[`${type}LabelMax`] = labelMax;

        labelContainer.appendChild(this[`${type}LabelMin`]);
        labelContainer.appendChild(this[`${type}LabelMax`]);

        const rangeContainer = document.createElement("div");
        rangeContainer.className = "range-container";
        this.container.appendChild(labelContainer);
        this.container.appendChild(rangeContainer);

        const minInput = document.createElement("input");
        minInput.type = "range";
        minInput.id = `${type}-range-min`;
        minInput.min = `${dataMin}`;
        minInput.max = `${dataMax}`;
        minInput.className = `${type} range-min`;
        this[`${type}InputMin`] = minInput;
        rangeContainer.appendChild(this[`${type}InputMin`]);

        const maxInput = document.createElement("input");
        maxInput.type = "range";
        maxInput.id = `${type}-range-max`;
        maxInput.min = `${dataMin}`;
        maxInput.max = `${dataMax}`;
        maxInput.className = `${type} range-max`;
        this[`${type}InputMax`] = maxInput;
        rangeContainer.appendChild(this[`${type}InputMax`]);

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

    updateRangeLabel() {
        this.priceLabelMin.textContent = this.priceInputMin.value;
        this.priceLabelMax.textContent = this.priceInputMax.value;
        this.stockLabelMin.textContent = this.stockInputMin.value;
        this.stockLabelMax.textContent = this.stockInputMax.value;
    }
}
