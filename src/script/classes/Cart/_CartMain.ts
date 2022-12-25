export class CartMain {
    container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    render() {
        this.container.replaceChildren();
        const title = document.createElement("h2");
        title.textContent = "CART PAGE";
        this.container.appendChild(title);
    }
}
