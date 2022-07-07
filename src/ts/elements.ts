//ELEMENTS
const copyDetails: NodeList = document.querySelectorAll(".empresa__detalles")!;
const copyDetails2: NodeList = document.querySelectorAll(".empresa__detalles2")!;
const copyArticles: NodeList = document.querySelectorAll(".empresa__articulos")!;
const billPaymentType: HTMLElement = document.querySelector(".factura__pago")!;

//INPUTS
const nameInput: HTMLInputElement = document.querySelector(".nombre__input")!;
const idInput: HTMLInputElement = document.querySelector(".ci__input")!;
const addressInput: HTMLInputElement = document.querySelector(".direccion__input")!;
const cityInput: HTMLInputElement = document.querySelector(".ciudad__input")!;
const countryInput: HTMLInputElement = document.querySelector(".pais__input")!;
const phoneInput: HTMLInputElement = document.querySelector(".tlf__input")!;
const emailInput: HTMLInputElement = document.querySelector(".email__input")!;
const ArticleQuantityHTML: HTMLInputElement = document.querySelector(".articulos__cantidad")!;

//SECTIONS
const main: HTMLElement = document.querySelector(".container")!;
const form: HTMLElement = document.querySelector(".formulario")!;
const articlesContainer: HTMLElement = document.querySelector(".articulos__container")!;
const cartContainer: HTMLElement = document.querySelector(".zona--carrito")!;
const clientInfo: HTMLParagraphElement = document.querySelector(".destinatario__datos")!;
const billInfoSection: HTMLElement = document.querySelector(".destinatario__factura")!; 
const copySection: HTMLElement = document.querySelector(".factura__empresa")!;

//BUTTONS
const addArticlesButton: HTMLButtonElement = document.querySelector(".boton--agregar")!;
const submitButton: HTMLButtonElement = document.querySelector(".boton__facturar")!;

//SELECT BAR
const articleSelect: HTMLSelectElement = document.querySelector(".articulos__select")!;
const paymentSelect: HTMLSelectElement = document.querySelector(".pago__select")!;

//PARAGRAPH/TEXT
const subtotalPriceHTML: HTMLParagraphElement = document.querySelector(".monto__subtotal")!;
const tax: HTMLParagraphElement = document.querySelector(".monto__iva")!;
const totalPriceHTML: HTMLParagraphElement = document.querySelector(".monto__total")!;













