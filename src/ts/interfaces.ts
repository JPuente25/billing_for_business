interface ArticleDetail {
   id: number;
   name: string;
   precio: number;
   inv: number;
}

interface PaymentDetail {
   id: number;
   name: string;
   entidad: string;
}

interface ClientDataInt {
   clientName: string;
   clientId: string;
   clientAddress: string;
   clientCity: string;
   clientCountry: string;
   clientPhone: string;
   clientEmail: string;
   paymentSelect: HTMLSelectElement;
   paymentDetails: PaymentDetail;
   shoppingCart: ShoppingCart[];
}

interface ShoppingCart {
   description: string;
   quantity: number;
   id: number;
   price: number;
}

interface HTMLElementCreator {
   tag: string; 
   innerHTML: string; 
   classes: string; 
   parent: HTMLElement;
   id: string;
   after: HTMLElement | null;
}

interface HTMLElementEraser {
   classes: string;
   parent: HTMLElement;
}

interface ArticleCart {
   deleteArticleButton: HTMLElement; 
   createDiv: HTMLElement;
   selectedArticleHTML: HTMLOptGroupElement;
}

interface ClientDataInfo {
   clientName: string,
   clientId: string,
   clientAddress: string,
   clientCity: string,
   //clientCountry: string,
   clientEmail: string,
   clientPhone: string,
}

interface BillInfo {
   ticketNumber: [string,number],
   date: string[],
   expires: string[],
   totalPrice: [string,number],
   paymentType: string[];
}

interface BillDataIf {
   paymentType: PaymentDetail;
   shoppingCart: ShoppingCart[];
}
