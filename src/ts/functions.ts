//import { OrderedInventory } from "./main.js";
import { ClientData } from "./classes/classDatos.js";
import { nameInput } from "./elements.js";
import * as HTML from "./elements.js";
import { articlesInventory } from "./fakeDB/articulosDB.js";

let shoppingCart: ShoppingCart[] = [];

//Ordenar Inventario de articulos
export const OrderedInventory: ArticleDetail[] = articlesInventory.sort(
    (a: ArticleDetail, b: ArticleDetail) => {
       return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    }
 );
 

//FUNCION PARA CREAR ELEMENTOS
export const createHTMLElement = (el: HTMLElementCreator): HTMLElement => {
    const element = document.createElement(el.tag);
    element.innerHTML = el.innerHTML;
    element.classList.add(el.classes);
    el.after === null
    ? el.parent.appendChild(element)
    : el.parent.insertBefore(element, el.after)
    element.id = el.id;
    return element;
};

//FUNCION PARA CREAR LA CLASE CLIENT DATA LUEGO DE CLICK A SUBMIT
export function submitButtonAction (): void {
   const clientData = new ClientData({
       clientName: nameInput.value,
       clientId: HTML.idInput.value,
       clientAddress: HTML.addressInput.value,
       clientCity: HTML.cityInput.value,
       clientCountry: HTML.countryInput.value,
       clientPhone: HTML.phoneInput.value,
       clientEmail: HTML.emailInput.value,
       paymentSelect: HTML.paymentSelect,
       paymentDetails: {id: 0, name: "Method", entidad: "Bank"},
       shoppingCart: shoppingCart,
   })
   const errorCheck: string[] = clientData.getError();
   if(errorCheck.length === 0){
      localStorage.setItem('clientData',JSON.stringify(clientData));
       location.pathname = "./factura.html";
   }
}

//FUNCION PARA AGREGAR ARTICULOS AL CARRITO, VISUAL Y SCRIPT
export const addArticlesAction = (): void => {
   const selectedArticleHTML: HTMLOptGroupElement = HTML.articleSelect[HTML.articleSelect.selectedIndex];
   const selectedArticleObject: ArticleDetail = OrderedInventory.find( item => item.id === parseInt(selectedArticleHTML.id))!;
   let articleQuantityValue: number = parseInt(HTML.ArticleQuantityHTML.value);
   
   if  (articleQuantityValue !== 0 && !selectedArticleHTML.disabled){
       const setArticleName: string = `${articleQuantityValue} - ${selectedArticleObject.name} - $${selectedArticleObject.precio * articleQuantityValue}`;
       
       const createDiv: HTMLElement = createHTMLElement({
           tag: "div",
           innerHTML: "",
           classes: "articulos__carrito",
           parent: HTML.cartContainer,
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

       const deleteArticleButton: HTMLElement = createHTMLElement({
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
       HTML.ArticleQuantityHTML.value = "1";

       //LISTENER PARA ELIMINAR EL ARTICULO DEL CARRITO
       deleteArticleButton.addEventListener("click",() => {
           deleteArticleCartAction({deleteArticleButton, createDiv, selectedArticleHTML});
       });
   }
};

//FUNCION PARA ELIMINAR ARTICULOS DEL CARRITO EN HTML Y SCRIPT
export const deleteArticleCartAction = (cart: ArticleCart): void => {
   shoppingCart = shoppingCart.filter( item => item.id !== parseInt(cart.deleteArticleButton.id) );
   cart.createDiv.remove();
   cart.selectedArticleHTML.disabled = false;
} 