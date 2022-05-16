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
const iva = 0.16;
const total = ()=>{
    let precio = 0;
    cd.articulos.forEach((el) => {precio += el.precio});
    return precio;
};

//FUNCION PARA CREAR PARRAFOS, EN ALIGN: 1 PARA LEFT, 2 PARA RIGHT
function cp(value,align,padre,id=""){
    let alinear = "align-left";
    if(!(align == 1)){
        alinear = "align-right";
    }
    const el = crearElemento("p",value,alinear,padre,id);
    return el;
}

cp(cd.nombre,1,destinatarioNombre);
cp(cd.id,1, destinatarioNombre);
cp(cd.direccion,1, destinatarioDatos);
cp(`${cd.ciudad} (${cd.pais})`,1, destinatarioDatos);
cp(cd.email,1, destinatarioDatos);
cp(`#${random7}`,2, facturaNumero);
cp(`${dia}/${mes}/${año}`,2, facturaFecha);
cp(`${dia}/${mes + 1}/${año}`,2, facturaVence);
cp(`$${total()}`,1, facturaTotal);
cp(`${cd.formaPago.name}: ${cd.formaPago.entidad}`,1,facturaPago);
cp(`$${total()}`,2, montoSubtotal).classList.add("caja","no-margin");
cp(`$${(total() * iva).toFixed(2)}`,2, montoIva).classList.add("caja","no-margin");
cp(`$${(total() * (iva + 1)).toFixed(2)}`,2,montoTotal).classList.add("caja", "no-margin");

cd.articulos.forEach((el, index) => {
    const div = crearElemento("div", "", "articulos__detalles", articulosContainer, index);
    const p = cp(el.name,1, div).classList.add("caja","no-margin");
    const pr = cp(`$${el.precio}`,2, div).classList.add("caja","no-margin");
});



