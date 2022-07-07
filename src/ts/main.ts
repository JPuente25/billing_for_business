//INICIALIZANDO EL CARRITO DE COMPRAS
let shoppingCart: ShoppingCart[]  = [];

//ORDENANDO EL INVENTARIO
const OrderedInventory: ArticleDetail[] = articlesInventory.sort((a: ArticleDetail, b: ArticleDetail) =>{
    return (a.name > b.name)? 1 : (a.name < b.name)? -1 : 0;
});

//AGREGANDO LOS ARTICULOS A LA SELECCION
const addArticlesToSelect: void = OrderedInventory.forEach( (item: ArticleDetail) => {
    const articleName: string = `$${item.precio} - ${item.name}`;
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
const addPaymentToSelect: void = paymentInventory.forEach((item: PaymentDetail, index: number) => {
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







