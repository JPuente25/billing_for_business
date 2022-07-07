const clientDataHistory = JSON.parse(localStorage.getItem('clientData')!);
const random7 = Math.round(Math.random() * 9999999);
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const taxPercentage = 0.16;

const totalPrice = () => {
    clientDataHistory.shoppingCart.reduce((a,b) => a + b.price*b.quantity,0)
};

//FUNCION PARA CREAR PARRAFOS, EN ALIGN: 1 PARA LEFT, 2 PARA RIGHT
function createParagraph(value, textAlign = "align-left", parent, id = "", after = null){
    (textAlign == 2)? textAlign = "align-right": (textAlign == 1)? textAlign = "align-left": textAlign = "align-center";
    const paragraph = createHTMLElement("p",value,textAlign,parent,id,after);
    return paragraph;
}

const createClientName = createParagraph(clientDataHistory.clientName,1,clientNameHTML);
const createClientId = createParagraph(clientDataHistory.clientId,1, clientNameHTML);
const createClientAddress = createParagraph(clientDataHistory.clientAddress,1, clientInfo);
const createClientCity = createParagraph(`${clientDataHistory.clientCity} (${clientDataHistory.clientCountry})`,1, clientInfo);
const createClientEmail = createParagraph(clientDataHistory.clientEmail,1, clientInfo);
const createTicketNumber = createParagraph(`#${random7}`,2, ticketNumber);
const createBillDate = createParagraph(`${day}/${month}/${year}`,2, billDate);
const createBillExpires = createParagraph(`${day}/${month + 1}/${year}`,2, billExpires);
const createTotalPrice = createParagraph(`$${(totalPrice() * (taxPercentage + 1)).toFixed(2)}`,1, billTotal);
const createPaymentType = createParagraph(`${clientDataHistory.paymentType.name}: ${clientDataHistory.paymentType.entidad}`,1,billPaymentType);
const createSubtotalPrice = createParagraph(`$${totalPrice()}`,2, subtotalPriceHTML).classList.add("caja","no-margin");
const createTaxPrice = createParagraph(`$${(totalPrice() * taxPercentage).toFixed(2)}`,2, tax).classList.add("caja","no-margin");
const createTotalPrice2 = createParagraph(`$${(totalPrice() * (taxPercentage + 1)).toFixed(2)}`,2,totalPriceHTML).classList.add("caja", "no-margin");

clientDataHistory.shoppingCart.forEach((item, index) => {
    const createArticlesDiv = createHTMLElement("div", "", "articulos__detalles", articlesContainer, index);
    const createArticleName = createParagraph(`${item.quantity}  -  ${item.description}`,1, createArticlesDiv).classList.add("caja","no-margin");
    const createArticlePrice = createParagraph(`$${item.price*item.quantity}`,2, createArticlesDiv).classList.add("caja","no-margin");
});

copyDetails.forEach( item => {
    createParagraph(`#${random7}`,3, item);
    createParagraph(`${day} / ${month} / ${year}`,3, item);
});

copyArticles.forEach( (element) => {
    clientDataHistory.shoppingCart.forEach( item => {
        console.log(item);
        createParagraph(`${item.quantity}  -  ${item.description} - $${item.price*item.quantity}`,1, element)
        .classList.add("copia--articulo");
    });
    createParagraph(`Total: $${(totalPrice() * (taxPercentage + 1)).toFixed(2)}`,1, element).classList.add("copia--total");
});

copyDetails2.forEach( item => {
    createParagraph(`${clientDataHistory.paymentType.name}: ${clientDataHistory.paymentType.entidad}`,3,item);
});


