//ELEMENTOS DEL DOM
const nombreInput = document.querySelector(".nombre__input");
const idInput = document.querySelector(".ci__input");
const direccionInput = document.querySelector(".direccion__input");
const ciudadInput = document.querySelector(".ciudad__input");
const paisInput = document.querySelector(".pais__input");
const tlfInput = document.querySelector(".tlf__input");
const emailInput = document.querySelector(".email__input");
const main = document.querySelector(".container");
const form = document.querySelector(".formulario");
const articulos = document.querySelector(".articulos__select");
const pagoSelect = document.querySelector(".pago__select");
const zonaCarrito = document.querySelector(".zona--carrito");
const articulosCantidad = document.querySelector(".articulos__cantidad");
const botonAgregar = document.querySelector(".boton--agregar");
let datosCliente = {};
let error = [];
let carrito = [];
let pago;

//FUNCION PARA CREAR ELEMENTOS
const crearElemento = (tag, texto, clase, padre, id = "", despues = null) => {
    const elemento = document.createElement(tag);
    elemento.innerHTML = texto;
    elemento.classList.add(clase);
    if (despues == null) {
        padre.appendChild(elemento);
    } else {
        padre.insertBefore(elemento, despues);
    }
    elemento.id = `${id}`;
    return elemento;
};

//FUNCION PARA ELIMINAR ELEMENTOS
const eliminarElementos = (clase, padre) => {
    const el = document.querySelectorAll(clase);
    el.forEach((elemento) => {
        setTimeout(() => {
            padre.removeChild(elemento);
        }, 3000);
    });
};

//AGREGANDO LOS ARTICULOS
const agregarArticulos = inventario.forEach((elemento, index) => {
    const nombreArticulo = `$${elemento.precio} - ${elemento.name}`;
    crearElemento("option", nombreArticulo, "articulos__option", articulos, index);
});

//AGREGANDO LAS FORMAS DE PAGO
const agregarPago = formaPago.forEach((elemento, index) => {
    crearElemento(
        "option",
        `${elemento.name}: ${elemento.entidad}`,
        "pago__option",
        pagoSelect,
        index
    );
});

//LISTENER PARA AGREGAR ARTICULOS AL CARRITO
botonAgregar.addEventListener("click", () => {
    const selectedArt = articulos[articulos.selectedIndex];

    if (articulos.selectedIndex !== 0 && articulosCantidad.value !== '0') {
            const nombreArticulo = `${articulosCantidad.value} - ${inventario[selectedArt.id].name} - $${
                inventario[selectedArt.id].precio * articulosCantidad.value}`;
            carrito.push({
                articulo: inventario[selectedArt.id],
                cantidad: articulosCantidad.value,
            });
            crearElemento("p", nombreArticulo, "articulos__carrito", zonaCarrito, selectedArt);
    }
});

//LISTENER PARA EL SUBMIT
const submit = document.querySelector(".boton__facturar");
submit.addEventListener("click", (e) => {
    //VALIDACION DEL FORMULARIO
    if (nombreInput.value.length == 0) {
        error.push("del nombre");
    }
    if (idInput.value.length == 0) {
        error.push("de la cedula o RIF");
    }
    if (direccionInput.value.length == 0) {
        error.push("de la direccion de envio");
    }
    if (ciudadInput.value.length == 0) {
        error.push("del ciudad");
    }
    if (paisInput.value.length == 0) {
        error.push("del pais");
    }
    if (tlfInput.value.length == 0) {
        error.push("del numero de telefono");
    }
    if (emailInput.value.length == 0) {
        error.push("del correo electronico");
    }
    if (carrito.length == 0) {
        error.push("de los articulos");
    }
    if (pagoSelect.selectedIndex !== 0) {
        const selectedFormaPago = pagoSelect[pagoSelect.selectedIndex];
        pago = formaPago[selectedFormaPago.id];
    } else {
        error.push("de la forma de pago");
    }

    //CREANDO LA INSTANCIA DE DATOS
    if (error.length == 0) {
        datosCliente = new Datos({
            nombre: nombreInput.value,
            id: idInput.value,
            direccion: direccionInput.value,
            ciudad: ciudadInput.value,
            pais: paisInput.value,
            tlf: tlfInput.value,
            email: emailInput.value,
            articulos: carrito,
            formaPago: pago,
        });

        //EXPORTANDO LA INSTANCIA Y REDIRIGIENDO LA PAGINA
        window.history.pushState(datosCliente, "", "factura.html");
        location.pathname = "/factura.html";

        //CREANDO LAS ALERTAS DE VALIDACION
    } else {
        error.forEach((error) => {
            crearElemento(
                "p",
                `El campo ${error} no debe ir vacio`,
                "alert--error",
                main,
                "",
                form
            );
        });
        eliminarElementos(".alert--error", main);
        error = [];
        return;
    }
});




