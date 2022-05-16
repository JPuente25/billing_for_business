const cd = history.state;

const destinatarioNombre = document.querySelector(".destinatario__nombre");
const destinatarioDatos = document.querySelector(".destinatario__datos");
const facturaNumero = document.querySelector(".factura__numero");
const facturaFecha = document.querySelector(".factura__fecha");
const facturaVence = document.querySelector(".factura__vence");
const facturaTotal = document.querySelector(".factura__total");
const articulosContainer = document.querySelector(".articulos__container");
const facturaPago = document.querySelector(".factura__pago");
const montoSubtotal = document.querySelector(".monto__subtotal");
const montoIva = document.querySelector(".monto__iva");
const montoTotal = document.querySelector(".monto__total");

const random7 = Math.round(Math.random() * 9999999);
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth() + 1;
const año = date.getFullYear();
let precio = 0;
const total = cd.articulos.forEach((el) => (precio += el.precio));
const iva = 0.16;

crearElementosDespues("p", cd.nombre, "align-left", destinatarioNombre);
crearElementosDespues("p", cd.id, "align-left", destinatarioNombre);

crearElementosDespues("p", cd.direccion, "align-left", destinatarioDatos);
crearElementosDespues("p", `${cd.ciudad} (${cd.pais})`, "align-left", destinatarioDatos);
crearElementosDespues("p", cd.email, "align-left", destinatarioDatos);

crearElementosDespues("p", `#${random7}`, "align-right", facturaNumero);
crearElementosDespues("p", `${dia}/${mes}/${año}`, "align-right", facturaFecha);
crearElementosDespues("p", `${dia}/${mes + 1}/${año}`, "align-right", facturaVence);

crearElementosDespues("p", `$${precio}`, "align-left", facturaTotal);

cd.articulos.forEach((el, index) => {
    const div = crearElementosDespues("div", "", "articulos__detalles", articulosContainer, index);
    const p = crearElementosDespues("p", el.name, "caja", div).classList.add(
        "align-left",
        "no-margin"
    );
    const pr = crearElementosDespues("p", `$${el.precio}`, "caja", div).classList.add(
        "align-right",
        "no-margin"
    );
});

crearElementosDespues(
    "p",
    `${cd.formaPago.name}: ${cd.formaPago.entidad}`,
    "align-left",
    facturaPago
);
crearElementosDespues("p", `$${precio}`, "align-right", montoSubtotal).classList.add(
    "caja",
    "no-margin"
);
crearElementosDespues("p", `$${(precio * iva).toFixed(2)}`, "align-right", montoIva).classList.add(
    "caja",
    "no-margin"
);
crearElementosDespues(
    "p",
    `$${(precio * (iva + 1)).toFixed(2)}`,
    "align-right",
    montoTotal
).classList.add("caja", "no-margin");
