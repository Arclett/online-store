import { loader, main, router } from "../../..";
import { IProduct } from "../../types/_interfaces";
import { ProductCart } from "../ProductPage/_ProductCart";

export class Details {
    container: HTMLElement;

    data: IProduct[];

    currentProduct: IProduct;

    productCart: ProductCart;

    addButton: HTMLElement;

    imgCurrent: HTMLImageElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.container.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e: Event) {
        if (!(e.target instanceof HTMLElement || e.target instanceof HTMLImageElement)) return;
        if (e.target.classList.contains("details-cart-button")) {
            this.updateCart(e.target);
        }
        if (e.target.classList.contains("image-preview")) {
            if (!(e.target instanceof HTMLImageElement)) return;
            this.imgCurrent.src = e.target.src;
        }
        if (e.target.classList.contains("details-buy")) {
            if (!this.productCart.currentCart.includes(this.currentProduct)) {
                this.productCart.currentCart.push(this.currentProduct);
                this.productCart.saveCart();
            }
            this.fastBuy();
        }
    }

    async fastBuy() {
        router.route("/cart");
        await main.cart.render("/");
        main.cart.buyWindow.render(this.container);
    }

    updateCart(elem: HTMLElement) {
        if (elem.classList.contains("added")) {
            this.productCart.removeFromCart(this.currentProduct, elem);
        } else {
            this.productCart.addToCart(this.currentProduct, elem);
        }
    }

    async render(data: string[]) {
        await this.getData();
        const product = this.getProduct(data);
        if (!product) return;
        this.currentProduct = product;
        this.container.replaceChildren();
        this.container.className = "product-details-main";
        this.productCart = new ProductCart(this.data);
        this.renderPath();

        this.renderDetails();
    }

    async getData() {
        const data: { products: IProduct[] } = await loader.load();
        this.data = data.products;
    }

    getProduct(details: string[]) {
        console.log(details);
        const str = details[details.length - 1].split("-");
        const id = str[str.length - 1];
        console.log(id);
        return this.data.find((e) => e.id === Number(id));
    }

    renderPath() {
        const pathWrapper = document.createElement("div");
        pathWrapper.className = "path-wrapper";

        const store = document.createElement("div");
        store.textContent = "STORE";

        const category = document.createElement("div");
        category.textContent = this.currentProduct.category;

        const brand = document.createElement("div");
        brand.textContent = this.currentProduct.brand;

        const title = document.createElement("div");
        title.textContent = this.currentProduct.title;

        [store, category, brand, title].forEach((e) => pathWrapper.appendChild(e));

        this.container.appendChild(pathWrapper);
    }

    renderDetails() {
        const mainTitle = document.createElement("h2");
        mainTitle.textContent = this.currentProduct.title;
        mainTitle.className = "details-title";

        const detWrapper = document.createElement("div");
        detWrapper.className = "details-wrapper";

        const imagesWrapper = document.createElement("div");
        imagesWrapper.className = "image-wrapper";

        const imgPrev = document.createElement("div");
        imgPrev.className = "image-preview-wrapper";

        this.currentProduct.images.forEach((e) => {
            const img = new Image();
            img.loading = "lazy";
            img.src = e;
            img.className = "image-preview";
            imgPrev.appendChild(img);
        });
        imagesWrapper.appendChild(imgPrev);

        this.imgCurrent = new Image();
        this.imgCurrent.src = this.currentProduct.images[0];
        this.imgCurrent.className = "current-image";
        imagesWrapper.appendChild(this.imgCurrent);

        const infoWrapper = document.createElement("div");
        infoWrapper.className = "info-wrapper";

        [
            this.currentProduct.brand,
            this.currentProduct.category,
            this.currentProduct.description,
            this.currentProduct.discountPercentage,
            this.currentProduct.rating,
            this.currentProduct.stock,
        ].forEach((e) => {
            const title = document.createElement("div");
            const key = Object.keys(this.currentProduct).find((elem) => e === this.currentProduct[elem]);
            if (!key) return;
            title.className = "subtitle";
            title.textContent = `${key}`;

            const info = document.createElement("div");
            info.className = "details-info";
            info.textContent = `${e}`;

            infoWrapper.appendChild(title);
            infoWrapper.appendChild(info);
        });

        const price = document.createElement("div");
        price.className = "details-price";
        price.textContent = `${this.currentProduct.price}€`;

        this.addButton = document.createElement("button");
        this.addButton.className = "details-cart-button";
        this.updateCartButton();

        const buyButton = document.createElement("button");
        buyButton.className = "details-buy";
        buyButton.textContent = "BUY NOW!";

        [imagesWrapper, infoWrapper, price, this.addButton, buyButton].forEach((e) => detWrapper.appendChild(e));

        this.container.appendChild(mainTitle);
        this.container.appendChild(detWrapper);
    }

    updateCartButton() {
        if (this.productCart.currentCart.includes(this.currentProduct)) {
            this.addButton.textContent = "Drop from Cart";
            this.addButton.classList.add("added");
        } else {
            this.addButton.textContent = "Add to Cart";
            this.addButton.classList.remove("added");
        }
    }
}
