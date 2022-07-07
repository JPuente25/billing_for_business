"use strict";
//ELEMENTS
const copyDetails = document.querySelectorAll(".empresa__detalles");
const copyDetails2 = document.querySelectorAll(".empresa__detalles2");
const copyArticles = document.querySelectorAll(".empresa__articulos");
const billPaymentType = document.querySelector(".factura__pago");
//INPUTS
const nameInput = document.querySelector(".nombre__input");
const idInput = document.querySelector(".ci__input");
const addressInput = document.querySelector(".direccion__input");
const cityInput = document.querySelector(".ciudad__input");
const countryInput = document.querySelector(".pais__input");
const phoneInput = document.querySelector(".tlf__input");
const emailInput = document.querySelector(".email__input");
const ArticleQuantityHTML = document.querySelector(".articulos__cantidad");
//SECTIONS
const main = document.querySelector(".container");
const form = document.querySelector(".formulario");
const articlesContainer = document.querySelector(".articulos__container");
const cartContainer = document.querySelector(".zona--carrito");
const clientInfo = document.querySelector(".destinatario__datos");
const billInfoSection = document.querySelector(".destinatario__factura");
const copySection = document.querySelector(".factura__empresa");
//BUTTONS
const addArticlesButton = document.querySelector(".boton--agregar");
const submitButton = document.querySelector(".boton__facturar");
//SELECT BAR
const articleSelect = document.querySelector(".articulos__select");
const paymentSelect = document.querySelector(".pago__select");
//PARAGRAPH/TEXT
const subtotalPriceHTML = document.querySelector(".monto__subtotal");
const tax = document.querySelector(".monto__iva");
const totalPriceHTML = document.querySelector(".monto__total");
