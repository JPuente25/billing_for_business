import * as HTML from "../elements.js";
import { paymentInventory } from "../fakeDB/formaPagoDB.js";
import { createHTMLElement } from "../functions.js";
export class ClientData {
    constructor(cd) {
        this.clientName = cd.clientName;
        this.clientId = cd.clientId;
        this.clientAddress = cd.clientAddress;
        this.clientCity = cd.clientCity;
        this.clientCountry = cd.clientCountry;
        this.clientPhone = cd.clientPhone;
        this.clientEmail = cd.clientEmail;
        this.paymentSelect = cd.paymentSelect;
        this.paymentSelectedIndex = this.paymentSelect.selectedIndex;
        this.paymentDetails = cd.paymentDetails;
        this.shoppingCart = cd.shoppingCart;
        this.error = [];
    }
    getError() {
        this.checkError();
        return this.error;
    }
    checkError() {
        this.clientName.length === 0 ? this.error.push("del nombre") : true;
        this.clientId.length === 0 ? this.error.push("de la cedula o RIF") : true;
        this.clientAddress.length === 0 ? this.error.push("de la direccion de envio") : true;
        this.clientCity.length === 0 ? this.error.push("del ciudad") : true;
        this.clientCountry.length === 0 ? this.error.push("del pais") : true;
        this.clientPhone.length === 0 ? this.error.push("del numero de telefono") : true;
        this.clientEmail.length === 0 ? this.error.push("del correo electronico") : true;
        this.shoppingCart.length === 0 ? this.error.push("de los articulos") : true;
        this.paymentSelect.selectedIndex !== 0
            ? this.paymentDetails = paymentInventory[parseInt(this.paymentSelect[this.paymentSelectedIndex].id)]
            : this.error.push("de la forma de pago");
        return this.createErrorAlert();
    }
    createErrorAlert() {
        this.error.forEach(field => createHTMLElement({
            tag: "p",
            innerHTML: `El campo ${field} no debe ir vacio`,
            classes: "alert--error",
            parent: HTML.main,
            id: "",
            after: HTML.form,
        }));
        setTimeout(() => this.deleteOldErrorAlert(), 3000);
    }
    deleteOldErrorAlert() {
        const element = document.querySelectorAll(".alert--error");
        element.forEach(alert => HTML.main.removeChild(alert));
    }
    getClientInfo() {
        return {
            clientName: this.clientName,
            clientId: this.clientId,
            clientAddress: this.clientAddress,
            clientCity: `${this.clientCity} (${this.clientCountry})`,
            clientEmail: this.clientEmail,
            clientPhone: this.clientPhone,
        };
    }
    createClientInfo() {
        const clientObject = this.getClientInfo();
        for (const prop in clientObject) {
            createHTMLElement({
                tag: "p",
                innerHTML: clientObject[prop],
                classes: "align-left",
                parent: HTML.clientInfo,
                id: "",
                after: null,
            });
        }
    }
}
;
