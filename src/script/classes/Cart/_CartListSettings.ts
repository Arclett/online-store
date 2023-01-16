export class CartListSettings {
    container: HTMLElement;

    constructor(container: HTMLElement, pageNumber: number, maxLimit: number, limit: number) {
        this.container = container;
        this.render(pageNumber, maxLimit, limit);
    }

    render(pageNumber: number, maxLimit: number, limit: number) {
        const title = document.createElement("h2");
        title.textContent = "Products in Cart";
        title.className = "list-title";
        const numberLabel = document.createElement("label");
        numberLabel.textContent = "Limit:";
        numberLabel.htmlFor = "num-input";
        const numInput = document.createElement("input");
        numInput.type = "number";
        numInput.min = "1";
        numInput.step = "1";
        numInput.max = `${maxLimit}`;
        numInput.id = "num-input";
        numInput.className = "num-input";
        numInput.value = `${limit}`;
        const pageLabel = document.createElement("span");
        pageLabel.textContent = "Page:";
        const btnBack = document.createElement("button");
        btnBack.className = "btn-back";
        btnBack.textContent = "<";
        const pageNum = document.createElement("span");
        pageNum.className = "page-number";
        pageNum.textContent = `${pageNumber}`;
        const btnFwd = document.createElement("button");
        btnFwd.className = "btn-fwd";
        btnFwd.textContent = ">";
        [title, numberLabel, numInput, pageLabel, btnBack, pageNum, btnFwd].forEach((e) =>
            this.container.appendChild(e)
        );
    }
}
