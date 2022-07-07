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
//LISTENER PARA EL SUBMIT
// submitButton.addEventListener("click", (e) => {
//     //VALIDACION DEL FORMULARIO
//     nameInput.value.length == 0? : string[].push("del nombre"): true;
//     idInput.value.length == 0? error.push("de la cedula o RIF"): true;
//     addressInput.value.length == 0? error.push("de la direccion de envio"): true;
//     cityInput.value.length == 0? error.push("del ciudad"): true;
//     countryInput.value.length == 0? error.push("del pais"): true;
//     phoneInput.value.length == 0? error.push("del numero de telefono"): true;
//     emailInput.value.length == 0? error.push("del correo electronico"): true;
//     shoppingCart.length == 0? error.push("de los articulos"): true;
//     paymentSelect.selectedIndex !== 0
//     ? paymentType = paymentInventory[paymentSelect[paymentSelect.selectedIndex].id]
//     : error.push("de la forma de pago");
//     //CREANDO LA INSTANCIA DE DATOS
// if (error.length == 0) {
//     clientData = new ClientData({
//         clientName: nameInput.value,
//         clientId: idInput.value,
//         clientAddress: addressInput.value,
//         clientCity: cityInput.value,
//         clientCountry: countryInput.value,
//         clientPhone: phoneInput.value,
//         clientEmail: emailInput.value,
//         shoppingCart: shoppingCart,
//         paymentType: paymentType,
//     });
//     console.log(clientData);
//     //EXPORTANDO LA INSTANCIA Y REDIRIGIENDO LA PAGINA
//     window.history.pushState(clientData, "", "factura.html");
//     location.pathname = "./factura.html";
// //CREANDO LAS ALERTAS DE VALIDACION
// } else {
//     error.forEach( item => {
//         createHTMLElement(
//             "p",
//             `El campo ${item} no debe ir vacio`,
//             "alert--error",
//             main,
//             "",
//             form
//         );
//     });
//     deleteHTMLElement(".alert--error", main);
//     console.log(error);
//     error = [];
//     return;
// }
// });
