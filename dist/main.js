"use strict";
//INICIALIZANDO EL CARRITO DE COMPRAS
let shoppingCart = [];
//ORDENANDO EL INVENTARIO
const OrderedInventory = articlesInventory.sort((a, b) => {
    return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;
});
//AGREGANDO LOS ARTICULOS A LA SELECCION
const addArticlesToSelect = OrderedInventory.forEach((item) => {
    const articleName = `$${item.precio} - ${item.name}`;
    createHTMLElement({
        tag: "option",
        innerHTML: articleName,
        classes: "articulos__option",
        parent: articleSelect,
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
        parent: paymentSelect,
        id: `${index}`,
        after: null
    });
});
//LISTENER PARA AGREGAR ARTICULOS AL CARRITO
addArticlesButton.addEventListener("click", addArticlesAction);
//LISTENER PARA CREAR LA CLASE CLIENT DATA: REVISAR ERRORES, GUARDAR LOS DATOS Y CARRITO EN STATE
//Y REDIRIGIR HACIA LA PAGINA DE FACTURAS
submitButton.addEventListener('click', submitButtonAction);
