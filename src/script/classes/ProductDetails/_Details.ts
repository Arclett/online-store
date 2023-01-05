export class Details {
    container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    render(details: string[]) {
        console.log(details);
        this.container.replaceChildren();
        const title = document.createElement("h2");
        title.textContent = "PRODUCT INFO TITLE";
        this.container.appendChild(title);
    }
}
