const cd = history.state;

const destinatarioNombre = document.querySelector(".destinatario__nombre");
const destinatarioDatos = document.querySelector(".destinatario__datos");
const facturaNumero = document.querySelector(".factura__numero");
const facturaFecha = document.querySelector(".factura__fecha");
const facturaTotal = document.querySelector(".factura__total");
const articulosContainer = document.querySelector(".articulos__container");
const facturaPago = document.querySelector(".factura__pago");
const montoSubtotal = document.querySelector(".monto__subtotal");
const montoIva = document.querySelector(".monto__iva");
const montoTotal = document.querySelector(".monto__total");
const proincaDetalles = document.querySelectorAll(".proinca__detalles");
const proincaDetalles2 = document.querySelectorAll(".proinca__detalles2");
const proincaArticulos = document.querySelectorAll(".proinca__articulos");

const random7 = Math.round(Math.random() * 9999999);
const date = new Date();
const dia = date.getDate();
const mes = date.getMonth() + 1;
const año = date.getFullYear();
const iva = 0.16;
const total = ()=>{
    let precio = 0;
    cd.articulos.forEach((el) => {precio += el.articulo.precio*el.cantidad});
    return precio;
};

//FUNCION PARA CREAR PARRAFOS, EN ALIGN: 1 PARA LEFT, 2 PARA RIGHT
function cp(value,align,padre,id="",despues=null){
    let alinear = "align-left";
    if((align == 2)){
        alinear = "align-right";
    } else if(align == 1){
        alinear;
    } 
    else{
        alinear = "align-center";
    }
    const el = crearElemento("p",value,alinear,padre,id,despues);
    return el;
}

const factNombre = cp(cd.nombre,1,destinatarioNombre);
const factId = cp(cd.id,1, destinatarioNombre);
const factDireccion = cp(cd.direccion,1, destinatarioDatos);
const factUbicacion = cp(`${cd.ciudad} (${cd.pais})`,1, destinatarioDatos);
const factNumero = cp(`#${random7}`,2, facturaNumero);
const factFecha = cp(`${dia} / ${mes} / ${año}`,2, facturaFecha);
const factTotal = cp(`$${total()}`,1, facturaTotal);
const factPago = cp(`${cd.formaPago.name}: ${cd.formaPago.entidad}`,1,facturaPago);
const factTotal2 = cp(`$${total()}`,2, montoSubtotal).classList.add("caja","no-margin");

cd.articulos.forEach((el, index) => {
    const div = crearElemento("div", "", "articulos__detalles", articulosContainer, index);
    const p = cp(`${el.cantidad}  -  ${el.articulo.name}`,1, div).classList.add("caja","no-margin");
    const pr = cp(`$${el.articulo.precio*el.cantidad}`,2, div).classList.add("caja","no-margin");
});

proincaDetalles.forEach(el => {
    cp(`#${random7}`,3,el);
    cp(`${dia} / ${mes} / ${año}`,3,el);
});

proincaArticulos.forEach(el => {
    cd.articulos.forEach((art) => {
        cp(`${art.cantidad}  -  ${art.articulo.name} - $${art.articulo.precio*art.cantidad}`,1, el)
        .classList.add("copia--articulo");
    });
    cp(`Total: $${total()}`,1, el).classList.add("copia--total");
});

proincaDetalles2.forEach(el => {
    cp(`${cd.formaPago.name}: ${cd.formaPago.entidad}`,3,el);
});


