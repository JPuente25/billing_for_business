interface ArticleCart {
   deleteArticleButton: HTMLElement; 
   createDiv: HTMLElement;
   selectedArticleHTML: HTMLOptGroupElement;
}

interface ArticleDetail {
   id: number;
   name: string;
   price: number;
}

interface BillDataInt {
   paymentSelect: HTMLSelectElement;
   paymentDetails: PaymentDetail;
   shoppingCart: ShoppingCart[];
}

interface BillInfo {
   ticketNumber: [string,number],
   date: string[],
   expires: string[],
   totalPrice: [string,number],
   paymentType: string[];
}

interface ClientDataInfo {
   clientName: string,
   clientId: string,
   clientAddress: string,
   clientCity: string,
   clientEmail: string,
   clientPhone: string,
}

interface ClientDataInt extends ClientDataInfo{
   clientCountry: string;
}

interface ClientDataInt extends BillDataInt {}

interface HTMLElementBase {
   classes: string;
   parent: HTMLElement;
}

interface HTMLElementCreator extends HTMLElementBase {
   tag: string; 
   innerHTML: string; 
   id: string;
   after?: HTMLElement;
}

interface PaymentDetail {
   id: number;
   name: string;
   entidad: string;
}

interface ShoppingCart extends ArticleDetail {
   quantity: number;
}