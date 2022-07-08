import { createHTMLElement, addArticlesAction, submitButtonAction, OrderedInventory, } from "./functions.js";
import { paymentInventory } from "./fakeDB/formaPagoDB.js";
import * as HTML from "./elements.js";
//AGREGANDO LOS ARTICULOS A LA SELECCION
const addArticlesToSelect = OrderedInventory.forEach((item) => {
    const articleName = `$${item.precio} - ${item.name}`;
    createHTMLElement({
        tag: "option",
        innerHTML: articleName,
        classes: "articulos__option",
        parent: HTML.articleSelect,
        id: `${item.id}`,
        after: null,
    });
});
//AGREGANDO LAS FORMAS DE PAGO A LA SELECCION
const addPaymentToSelect = paymentInventory.forEach((item, index) => {
    createHTMLElement({
        tag: "option",
        innerHTML: `${item.name}: ${item.entidad}`,
        classes: "pago__option",
        parent: HTML.paymentSelect,
        id: `${index}`,
        after: null,
    });
});
//LISTENER PARA AGREGAR ARTICULOS AL CARRITO
HTML.addArticlesButton.addEventListener("click", addArticlesAction);
//LISTENER PARA CREAR LA CLASE CLIENT DATA: REVISAR ERRORES, GUARDAR LOS DATOS Y CARRITO EN STATE
//Y REDIRIGIR HACIA LA PAGINA DE FACTURAS
HTML.submitButton.addEventListener("click", submitButtonAction);
