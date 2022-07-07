"use strict";
class BillData {
    constructor(pr) {
        this.ticketNumber = Math.round(Math.random() * 9999999);
        this.date = new Date();
        this.paymentType = pr.paymentType;
        this.shoppingCart = pr.shoppingCart;
        this.taxValue = 0.16;
    }
    get totalPrice() {
        return this.shoppingCart.reduce((a, b) => a + b.price * b.quantity, 0);
    }
    get totalPriceAndIva() {
        return parseFloat((this.totalPrice * (this.taxValue + 1)).toFixed(2));
    }
    get ActualDate() {
        return `${this.date.getDay()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`;
    }
    get ExpireDate() {
        return `${this.date.getDay()}/${this.date.getMonth() + 2}/${this.date.getFullYear()}`;
    }
    get PaymentType() {
        return `${this.paymentType.name} (${this.paymentType.entidad})`;
    }
    get billInfo() {
        return {
            ticketNumber: ['Nº Factura: ', this.ticketNumber],
            date: ['Fecha de factura: ', this.ActualDate],
            expires: ['Fecha de vencimiento: ', this.ExpireDate],
            totalPrice: ['Monto total ($): ', this.totalPrice],
            paymentType: ['Forma de pago: ', this.PaymentType]
        };
    }
    createBillInfo() {
        for (const prop in this.billInfo) {
            createHTMLElement({
                tag: "p",
                innerHTML: this.billInfo[prop].join(""),
                classes: "align-right",
                parent: billInfoSection,
                id: "",
                after: null,
            });
        }
    }
    createPriceBoxes() {
        createHTMLElement({
            tag: "p",
            innerHTML: `$${this.totalPrice}`,
            classes: "align-right",
            parent: subtotalPriceHTML,
            id: "",
            after: null,
        }).classList.add("caja", "no-margin");
        return this.createTaxPrice();
    }
    createTaxPrice() {
        createHTMLElement({
            tag: "p",
            innerHTML: `$${(this.totalPrice * this.taxValue).toFixed(2)}`,
            classes: "align-right",
            parent: tax,
            id: "",
            after: null,
        }).classList.add("caja", "no-margin");
        return this.createTotalPrice();
    }
    createTotalPrice() {
        createHTMLElement({
            tag: "p",
            innerHTML: `$${this.totalPriceAndIva}`,
            classes: "align-right",
            parent: totalPriceHTML,
            id: "",
            after: null,
        }).classList.add("caja", "no-margin");
    }
    createArticlesList() {
        this.shoppingCart.forEach((item, index) => {
            //Div del Articulo
            const articlesDiv = createHTMLElement({
                tag: "div",
                innerHTML: "",
                classes: "articulos__detalles",
                parent: articlesContainer,
                id: index.toString(),
                after: null
            });
            //Nombre del Articulo
            createHTMLElement({
                tag: "p",
                innerHTML: `${item.quantity}  -  ${item.description}`,
                classes: "align-left",
                parent: articlesDiv,
                id: "",
                after: null
            }).classList.add("caja", "no-margin");
            //Precio del Articulo
            createHTMLElement({
                tag: "p",
                innerHTML: `$${item.price * item.quantity}`,
                classes: "align-right",
                parent: articlesDiv,
                id: "",
                after: null
            }).classList.add("caja", "no-margin");
        });
    }
    createCopy() {
        let nombreCopia = "Empresa";
        for (let i = 1; i <= 2; i++) {
            const copyDiv = createHTMLElement({
                tag: "div",
                innerHTML: "",
                classes: "factura__copia",
                parent: copySection,
                id: "",
                after: null
            });
            const copyDetailsDiv = createHTMLElement({
                tag: "div",
                innerHTML: `
            <p class="align-center" >${this.ticketNumber}</p>
            <p class="align-center" >${this.ActualDate}</p>
            <p class="align-center" >${this.PaymentType}</p>
            `,
                classes: "empresa__detalles",
                parent: copyDiv,
                id: "",
                after: null
            });
            const copyArticlesDiv = createHTMLElement({
                tag: "div",
                innerHTML: "",
                classes: "empresa__articulos",
                parent: copyDiv,
                id: "",
                after: null
            });
            const copyArticles = this.shoppingCart.forEach((item) => {
                createHTMLElement({
                    tag: "p",
                    innerHTML: `${item.quantity}  -  ${item.description} - $${item.price * item.quantity}`,
                    classes: "align-left",
                    parent: copyArticlesDiv,
                    id: "",
                    after: null
                });
            });
            createHTMLElement({
                tag: "div",
                innerHTML: `
            <p>${nombreCopia}</p>
            <p>$${this.totalPriceAndIva}</p>
            `,
                classes: "empresa__detalles2",
                parent: copyDiv,
                id: "",
                after: null
            });
            nombreCopia = "Despacho";
        }
    }
}
