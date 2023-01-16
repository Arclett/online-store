export default class ProductListSettings {
    container: HTMLElement;

    searchCount: HTMLLabelElement;

    searchInput: HTMLInputElement;

    thumbnails: HTMLElement;

    list: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.render();
    }

    render() {
        this.renderSort();
        this.renderSearch();
        this.renderView();
        this.renderCopyFilter();
        this.renderResetFilter();
    }

    renderSort() {
        const sortWrapper = document.createElement("div");
        sortWrapper.className = "sort-wrapper";
        const sortSecelt = document.createElement("select");
        sortSecelt.name = "sort";
        sortSecelt.setAttribute("id", "sort");
        const sortLabel = document.createElement("label");
        sortLabel.htmlFor = "sort";
        sortLabel.textContent = "Sort option: ";
        const option = document.createElement("option");
        option.disabled = true;
        option.selected = true;
        sortSecelt.appendChild(option);
        ["price-ASC", "price-DESC", "rating-ASC", "rating-DESC"]
            .map((e) => {
                const opt = document.createElement("option");
                opt.value = e;
                opt.className = "sort-option";
                opt.textContent = `Sort by ${e.split("-")[0]} ${e.split("-")[1]}`;
                return opt;
            })
            .forEach((e) => sortSecelt.appendChild(e));
        sortWrapper.appendChild(sortLabel);
        sortWrapper.appendChild(sortSecelt);
        this.container.appendChild(sortWrapper);
    }

    renderSearch() {
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        this.searchCount = document.createElement("label");
        this.searchCount.className = "search-count";
        this.searchCount.htmlFor = "search-input";
        this.searchInput = document.createElement("input");
        this.searchInput.type = "text";
        this.searchInput.placeholder = "search item";
        this.searchInput.id = "search-count";
        this.searchInput.className = "search";
        searchWrapper.appendChild(this.searchCount);
        searchWrapper.appendChild(this.searchInput);
        this.container.appendChild(searchWrapper);
    }

    renderView() {
        const viewWrapper = document.createElement("div");
        viewWrapper.className = "view-wrapper";
        this.thumbnails = document.createElement("div");
        this.thumbnails.className = "thumb";
        this.thumbnails.textContent = "Thumbnails";
        this.list = document.createElement("div");
        this.list.className = "list";
        this.list.textContent = "List";

        viewWrapper.appendChild(this.thumbnails);
        viewWrapper.appendChild(this.list);
        this.container.appendChild(viewWrapper);
    }

    renderResetFilter() {
        const reset = document.createElement("div");
        reset.className = "reset";
        reset.textContent = "Reset Filters";
        this.container.appendChild(reset);
    }

    renderCopyFilter() {
        const copy = document.createElement("div");
        copy.className = "copy";
        copy.textContent = "Copy Link";
        this.container.appendChild(copy);
    }

    updateSearchCount(num: number) {
        this.searchCount.textContent = `Found: ${num}`;
    }

    updateSearchInput(str: string) {
        if (str) this.searchInput.value = str;
    }
}
