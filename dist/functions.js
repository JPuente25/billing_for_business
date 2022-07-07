"use strict";
//FUNCION PARA CREAR ELEMENTOS
const createHTMLElement = (el) => {
    const element = document.createElement(el.tag);
    element.innerHTML = el.innerHTML;
    element.classList.add(el.classes);
    el.after === null
        ? el.parent.appendChild(element)
        : el.parent.insertBefore(element, el.after);
    element.id = el.id;
    return element;
};
//FUNCION PARA CREAR LA CLASE CLIENT DATA LUEGO DE CLICK A SUBMIT
function submitButtonAction() {
    const clientData = new ClientData({
        clientName: nameInput.value,
        clientId: idInput.value,
        clientAddress: addressInput.value,
        clientCity: cityInput.value,
        clientCountry: countryInput.value,
        clientPhone: phoneInput.value,
        clientEmail: emailInput.value,
        paymentSelect: paymentSelect,
        paymentDetails: { id: 0, name: "Method", entidad: "Bank" },
        shoppingCart: shoppingCart,
    });
    const errorCheck = clientData.getError();
    if (errorCheck.length === 0) {
        localStorage.setItem('clientData', JSON.stringify(clientData));
        location.pathname += "/factura.html";
    }
}
//FUNCION PARA AGREGAR ARTICULOS AL CARRITO, VISUAL Y SCRIPT
const addArticlesAction = () => {
    const selectedArticleHTML = articleSelect[articleSelect.selectedIndex];
    const selectedArticleObject = OrderedInventory.find(item => item.id === parseInt(selectedArticleHTML.id));
    let articleQuantityValue = parseInt(ArticleQuantityHTML.value);
    if (articleQuantityValue !== 0 && !selectedArticleHTML.disabled) {
        const setArticleName = `${articleQuantityValue} - ${selectedArticleObject.name} - $${selectedArticleObject.precio * articleQuantityValue}`;
        const createDiv = createHTMLElement({
            tag: "div",
            innerHTML: "",
            classes: "articulos__carrito",
            parent: cartContainer,
            id: selectedArticleHTML.id,
            after: null,
        });
        createHTMLElement({
            tag: "p",
            innerHTML: setArticleName,
            classes: "articulos__carrito__nombre",
            parent: createDiv,
            id: selectedArticleHTML.id,
            after: null
        });
        const deleteArticleButton = createHTMLElement({
            tag: "p",
            innerHTML: "x",
            classes: "boton--eliminar",
            parent: createDiv,
            id: selectedArticleHTML.id,
            after: null,
        });
        shoppingCart.push({
            description: selectedArticleObject.name,
            quantity: articleQuantityValue,
            id: selectedArticleObject.id,
            price: selectedArticleObject.precio,
        });
        selectedArticleHTML.disabled = true;
        ArticleQuantityHTML.value = "1";
        //LISTENER PARA ELIMINAR EL ARTICULO DEL CARRITO
        deleteArticleButton.addEventListener("click", () => {
            deleteArticleCartAction({ deleteArticleButton, createDiv, selectedArticleHTML });
        });
    }
};
//FUNCION PARA ELIMINAR ARTICULOS DEL CARRITO EN HTML Y SCRIPT
const deleteArticleCartAction = (cart) => {
    shoppingCart = shoppingCart.filter(item => item.id !== parseInt(cart.deleteArticleButton.id));
    cart.createDiv.remove();
    cart.selectedArticleHTML.disabled = false;
};
