//ELEMENTOS DEL DOM
const nameInput = document.querySelector(".nombre__input");
const idInput = document.querySelector(".ci__input");
const addressInput = document.querySelector(".direccion__input");
const cityInput = document.querySelector(".ciudad__input");
const countryInput = document.querySelector(".pais__input");
const phoneInput = document.querySelector(".tlf__input");
const emailInput = document.querySelector(".email__input");
const main = document.querySelector(".container");
const form = document.querySelector(".formulario");
const articleSelect = document.querySelector(".articulos__select");
const paymentSelect = document.querySelector(".pago__select");
const cartContainer = document.querySelector(".zona--carrito");
const ArticleQuantityHTML = document.querySelector(".articulos__cantidad");
const addArticlesButton = document.querySelector(".boton--agregar");
const submitButton = document.querySelector(".boton__facturar");
let clientData = {};
let error = [];
let shoppingCart = [];
let paymentType;

//ORDENANDO EL INVENTARIO
const OrderedInventory = articlesInventory.sort((a,b) => (a.name > b.name)? 1 : (a.name < b.name)? -1 : 0);

//FUNCION PARA CREAR ELEMENTOS
const createHTMLElement = (tag, innerHTML="", classes = "", parent, id = "", after = null) => {
    const element = document.createElement(tag);
    element.innerHTML = innerHTML;
    element.classList.add(classes);
    if (after == null) {
        parent.appendChild(element);
    } else {
        parent.insertBefore(element, after);
    }
    element.id = `${id}`;
    return element;
};

//FUNCION PARA ELIMINAR ELEMENTOS
const deleteHTMLElement = (classes, parent) => {
    const element = document.querySelectorAll(classes);
    element.forEach( item => {setTimeout(() => {parent.removeChild(item)}, 3000)});
};

//AGREGANDO LOS ARTICULOS
const addArticlesToSelect = OrderedInventory.forEach( item => {
    const articleName = `$${item.precio} - ${item.name}`;
    createHTMLElement("option", articleName, "articulos__option", articleSelect, item.id);
});

//AGREGANDO LAS FORMAS DE PAGO
const addPaymentToSelect = paymentInventory.forEach((item, index) => {
    createHTMLElement(
        "option",
        `${item.name}: ${item.entidad}`,
        "pago__option",
        paymentSelect,
        index
    );
});

//LISTENER PARA AGREGAR ARTICULOS AL CARRITO
addArticlesButton.addEventListener("click", () => {
    const selectedArticleHTML = articleSelect[articleSelect.selectedIndex];
    const selectedArticleObject = OrderedInventory.find( item => item.id == selectedArticleHTML.id);
    let articleQuantityValue = ArticleQuantityHTML.value;
    
    if  (articleQuantityValue !== '0' && !selectedArticleHTML.disabled)
    {
        const setArticleName = `${articleQuantityValue} - ${selectedArticleObject.name} - $${selectedArticleObject.precio * articleQuantityValue}`;
        const createDiv = createHTMLElement("div","","articulos__carrito",cartContainer,selectedArticleHTML.id);
        const createCartItem = createHTMLElement("p", setArticleName, "articulos__carrito__nombre", createDiv, selectedArticleHTML.id);
        const deleteArticleButton = createHTMLElement("p","x","boton--eliminar",createDiv,selectedArticleHTML.id);
                
        shoppingCart.push({
            description: selectedArticleObject.name,
            quantity: articleQuantityValue,
            id: selectedArticleObject.id,
            price: selectedArticleObject.precio,
        });

        selectedArticleHTML.disabled = true;
        ArticleQuantityHTML.value = 1;

        //LISTENER PARA ELIMINAR EL ARTICULO DEL CARRITO
        deleteArticleButton.addEventListener("click",() => {
            shoppingCart = shoppingCart.filter( item => item.id !== parseInt(deleteArticleButton.id) );
            createDiv.remove();
            selectedArticleHTML.disabled = false;
        });
    }
});

//LISTENER PARA EL SUBMIT
submitButton.addEventListener("click", (e) => {
    //VALIDACION DEL FORMULARIO
    nameInput.value.length == 0? error.push("del nombre"): true;
    idInput.value.length == 0? error.push("de la cedula o RIF"): true;
    addressInput.value.length == 0? error.push("de la direccion de envio"): true;
    cityInput.value.length == 0? error.push("del ciudad"): true;
    countryInput.value.length == 0? error.push("del pais"): true;
    phoneInput.value.length == 0? error.push("del numero de telefono"): true;
    emailInput.value.length == 0? error.push("del correo electronico"): true;
    shoppingCart.length == 0? error.push("de los articulos"): true;
    paymentSelect.selectedIndex !== 0
    ? paymentType = paymentInventory[paymentSelect[paymentSelect.selectedIndex].id]
    : error.push("de la forma de pago");
    
    //CREANDO LA INSTANCIA DE DATOS
    if (error.length == 0) {
        clientData = new ClientData({
            clientName: nameInput.value,
            clientId: idInput.value,
            clientAddress: addressInput.value,
            clientCity: cityInput.value,
            clientCountry: countryInput.value,
            clientPhone: phoneInput.value,
            clientEmail: emailInput.value,
            shoppingCart: shoppingCart,
            paymentType: paymentType,
        });
        console.log(clientData);

        //EXPORTANDO LA INSTANCIA Y REDIRIGIENDO LA PAGINA
        window.history.pushState(clientData, "", "factura.html");
        location.pathname = "./factura.html";

    //CREANDO LAS ALERTAS DE VALIDACION
    } else {
        error.forEach( item => {
            createHTMLElement(
                "p",
                `El campo ${item} no debe ir vacio`,
                "alert--error",
                main,
                "",
                form
            );
        });
        deleteHTMLElement(".alert--error", main);
        console.log(error);
        error = [];
        return;
    }
});






