export class ProductListSettings {
    container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;

        this.render();
    }

    render() {
        this.renderSort();
        this.renderSearch();
        this.renderView();
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
            .map((e, i) => {
                const option = document.createElement("option");
                option.value = e;
                option.className = "sort-option";
                option.textContent = `Sort by ${e.split("-")[0]} ${e.split("-")[1]}`;
                return option;
            })
            .forEach((e) => sortSecelt.appendChild(e));
        sortWrapper.appendChild(sortLabel);
        sortWrapper.appendChild(sortSecelt);
        this.container.appendChild(sortWrapper);
    }

    renderSearch() {
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        const searchCount = document.createElement("label");
        searchCount.textContent = "Found: 99";
        searchCount.className = "search-count";
        searchCount.htmlFor = "search-input";
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "search item";
        searchInput.id = "search-count";
        searchInput.className = "search";
        searchWrapper.appendChild(searchCount);
        searchWrapper.appendChild(searchInput);
        this.container.appendChild(searchWrapper);
    }

    renderView() {
        const viewWrapper = document.createElement("div");
        viewWrapper.className = "view-wrapper";
        const thumbnails = document.createElement("div");
        thumbnails.className = "thumb";
        thumbnails.textContent = "thumb";
        const list = document.createElement("div");
        list.className = "list";
        list.textContent = "list";

        viewWrapper.appendChild(thumbnails);
        viewWrapper.appendChild(list);
        this.container.appendChild(viewWrapper);
    }
}
