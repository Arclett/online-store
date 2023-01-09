import { main, router } from "../../..";

export class BuyWindow {
    nameInput: HTMLInputElement;

    phoneInput: HTMLInputElement;

    adressInput: HTMLInputElement;

    emailInput: HTMLInputElement;

    ccnLabel: HTMLImageElement;

    ccnInput: HTMLInputElement;

    cardDateLabel: HTMLLabelElement;

    cardDateInput: HTMLInputElement;

    cvvLabel: HTMLLabelElement;

    cvvInput: HTMLInputElement;

    submit: HTMLInputElement;

    errorWindow: HTMLElement;

    buyForm: HTMLElement;

    constructor(container: HTMLElement) {
        container.addEventListener("input", this.inputHandler.bind(this));
        container.addEventListener("submit", this.submitHandler.bind(this));
    }

    submitHandler(e: Event) {
        e.preventDefault();
        this.confirmOrder();
    }

    inputHandler(e: Event) {
        e.preventDefault();
        if (!(e.target instanceof HTMLInputElement)) return;
        if (e.target.classList.contains("buy-window-input") || e.target.classList.contains("card-input")) {
            this.inputValidation(e.target);
        }
    }

    inputValidation(elem: HTMLInputElement) {
        if (elem.value === "") {
            elem.classList.remove("valid");
            elem.classList.remove("invalid");
            return;
        }
        const valueLast = elem.value[elem.value.length - 1];
        if (elem.classList.contains("name-input")) {
            if (!this.isInputChar(valueLast) && valueLast !== " ") {
                this.redoInput(elem);
                return;
            }
            this.checkInputValidity(this.checkName, elem);
        }
        if (elem.classList.contains("tel-input")) {
            if (this.isInputChar(valueLast) && valueLast !== "+") {
                this.redoInput(elem);
                return;
            }
            this.checkInputValidity(this.checkPhone, elem);
        }
        if (elem.classList.contains("adress-input")) this.checkInputValidity(this.checkAdress, elem);
        if (elem.classList.contains("email-input")) this.checkInputValidity(this.checkEmail, elem);
        if (elem.classList.contains("ccn-input")) {
            if (elem.value[0] === "4") {
                this.ccnLabel.src = "../../assets/svg/visa-logo.svg";
            } else if (elem.value[0] === "3") {
                this.ccnLabel.src = "../../assets/svg/ae-logo.svg";
            } else if (elem.value.slice(0, 2) === "55") {
                this.ccnLabel.src = "../../assets/svg/vc-logo.svg";
            } else this.ccnLabel.src = "../../assets/svg/credit-card-logo.svg";
            this.formatCcn(elem);
            this.checkInputValidity(this.checkCcn, elem);
        }
        if (elem.classList.contains("card-date-input")) {
            this.formateCardDate(elem);
            this.checkInputValidity(this.checkDate, elem);
        }
        if (elem.classList.contains("cvv-input")) {
            if (this.isInputChar(elem.value)) {
                this.redoInput(elem);
                return;
            }
            this.checkInputValidity(this.checkCvv, elem);
        }
    }

    confirmOrder() {
        const error = this.checkFormValidity();
        if (error.length > 0) {
            this.errorWindow.textContent = `Something went wrong. Plese check ${error} fields and try again`;
        } else {
            this.errorWindow.textContent = "";
            this.renderSuccess();
            setTimeout(function () {
                main.cart.currentCart = [];
                main.cart.productCart.currentCart = [];
                main.cart.productCart.saveCart();
                router.route("/");
                router.locHandling();
            }, 2000);
        }
    }

    checkFormValidity(): string {
        let error = "";
        if (!this.checkName(this.nameInput.value)) error += "Name ";
        if (!this.checkAdress(this.adressInput.value)) error += "Adress ";
        if (!this.checkCcn(this.ccnInput.value)) error += "Card Number ";
        if (!this.checkCvv(this.cvvInput.value)) error += "CVV ";
        if (!this.checkDate(this.cardDateInput.value)) error += "Card Date ";
        if (!this.checkEmail(this.emailInput.value)) error += "Email ";
        if (!this.checkPhone(this.phoneInput.value)) error += "Phone ";
        return error.slice(0, -1);
    }

    checkInputValidity(func: (str: string) => boolean, elem: HTMLInputElement) {
        if (func(elem.value)) {
            elem.classList.add("valid");
            elem.classList.remove("invalid");
        } else {
            elem.classList.remove("valid");
            elem.classList.add("invalid");
        }
    }

    formateCardDate(elem: HTMLInputElement) {
        if (elem.value[elem.value.length - 1] === " ") {
            elem.value = elem.value.slice(0, -3);
            return;
        }
        if (elem.value.length === 3) elem.value = `${elem.value.slice(0, -1)} / ${elem.value.slice(-1)}`;
    }

    checkDate(str: string): boolean {
        if (str.length !== 7) return false;
        const now = new Date();
        const curYear = now.getFullYear() - 2000;
        const curMonth = now.getMonth() + 1;
        const date = str.split(" / ");
        const year = Number(date[1]);
        const month = date[0];
        if (month[0] === "0") month.replace("0", "");
        if (Number(month) < curMonth && year >= curYear) return false;
        if (year < curYear) return false;

        return true;
    }

    checkCvv(str: string): boolean {
        if (str.length < 3) return false;
        return true;
    }

    formatCcn(elem: HTMLInputElement) {
        if (elem.value[elem.value.length - 1] === " ") {
            elem.value = elem.value.slice(0, -1);
            return;
        }
        if (elem.value.length === 5 || elem.value.length === 10 || elem.value.length === 15)
            elem.value = `${elem.value.slice(0, -1)} ${elem.value.slice(-1)}`;
    }

    redoInput(elem: HTMLInputElement) {
        elem.value = elem.value.slice(0, -1);
    }

    checkName(str: string): boolean {
        const res = str.split(" ");
        if (res.length !== 2 || res[0].length < 3 || res[1].length < 3) return false;
        return true;
    }

    checkPhone(str: string): boolean {
        if (str[0] !== "+" || str.length < 8) return false;
        return true;
    }

    checkAdress(str: string): boolean {
        const res = str.split(" ");
        if (res.length < 3 || res.some((e) => e.length < 5)) return false;
        return true;
    }

    checkEmail(str: string): boolean {
        if (str.includes(".") && str.includes("@") && str.length > 5) return true;
        return false;
    }

    checkCcn(str: string): boolean {
        if (str.length === 19 && (str[0] === "4" || str[0] === "3" || str.slice(0, 2) === "55")) {
            return true;
        }
        return false;
    }

    isInputChar(char: string) {
        return Number.isNaN(Number(char));
    }

    render(container: HTMLElement) {
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        container.appendChild(overlay);

        this.buyForm = document.createElement("form");
        this.buyForm.className = "buy-window-wrapper";
        container.appendChild(this.buyForm);

        const subtitle = document.createElement("h3");
        subtitle.textContent = "Presonal details";
        subtitle.className = "buy-window-details";

        this.nameInput = document.createElement("input");
        this.nameInput.type = "text";
        this.nameInput.className = "buy-window-input name-input";
        this.nameInput.placeholder = "Name";

        this.phoneInput = document.createElement("input");
        this.phoneInput.type = "tel";
        this.phoneInput.className = "buy-window-input tel-input";
        this.phoneInput.placeholder = "Phone Number";
        this.phoneInput.inputMode = "numeric";

        this.adressInput = document.createElement("input");
        this.adressInput.type = "text";
        this.adressInput.className = "buy-window-input adress-input";
        this.adressInput.placeholder = "Delivery Adress";

        this.emailInput = document.createElement("input");
        this.emailInput.type = "email";
        this.emailInput.className = "buy-window-input email-input";
        this.emailInput.placeholder = "Email";

        [subtitle, this.nameInput, this.phoneInput, this.adressInput, this.emailInput].forEach((e) =>
            this.buyForm.appendChild(e)
        );

        this.renderCard(this.buyForm);

        this.submit = document.createElement("input");
        this.submit.type = "submit";
        this.submit.className = "submit";
        this.submit.value = "Confirm";
        this.buyForm.appendChild(this.submit);

        this.errorWindow = document.createElement("div");
        this.errorWindow.className = "error-window";
        this.buyForm.appendChild(this.errorWindow);
    }

    renderCard(container: HTMLElement) {
        const cardWrapper = document.createElement("fieldset");
        cardWrapper.className = "card-details-wrapper";

        const cardSubtitle = document.createElement("legend");
        cardSubtitle.textContent = "Card details";

        this.ccnLabel = new Image();
        this.ccnLabel.className = "ccn-logo";
        this.ccnLabel.src = "../../assets/svg/credit-card-logo.svg";

        this.ccnInput = document.createElement("input");
        this.ccnInput.type = "tel";
        this.ccnInput.id = "ccn-input";
        this.ccnInput.className = "card-input ccn-input";
        this.ccnInput.placeholder = "Card Number";
        this.ccnInput.inputMode = "numeric";
        this.ccnInput.autocomplete = "cc-number";
        this.ccnInput.maxLength = 19;

        this.cardDateLabel = document.createElement("label");
        this.cardDateLabel.textContent = "Date";
        this.cardDateLabel.htmlFor = "card-date-input";

        this.cardDateInput = document.createElement("input");
        this.cardDateInput.type = "tel";
        this.cardDateInput.inputMode = "numeric";
        this.cardDateInput.id = "card-date-input";
        this.cardDateInput.className = "card-input card-date-input";
        this.cardDateInput.placeholder = "MM/YY";
        this.cardDateInput.maxLength = 7;

        this.cvvLabel = document.createElement("label");
        this.cvvLabel.textContent = "CVV";
        this.cvvLabel.htmlFor = "cvv-input";

        this.cvvInput = document.createElement("input");
        this.cvvInput.type = "tel";
        this.cvvInput.inputMode = "numeric";
        this.cvvInput.maxLength = 3;
        this.cvvInput.id = "cvv-input";
        this.cvvInput.className = "card-input cvv-input";
        this.cvvInput.placeholder = "Code";

        [
            cardSubtitle,
            this.ccnLabel,
            this.ccnInput,
            this.cardDateLabel,
            this.cardDateInput,
            this.cvvLabel,
            this.cvvInput,
        ].forEach((e) => cardWrapper.appendChild(e));

        container.appendChild(cardWrapper);
    }

    renderSuccess() {
        this.buyForm.replaceChildren();

        const success = document.createElement("div");
        success.textContent = "Order is confermed. Soon you will be redirected to main page";
        success.className = "success";

        this.buyForm.appendChild(success);
    }
}
