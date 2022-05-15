class Datos {
    constructor({ nombre, id, direccion, ciudad, pais, tlf, email, articulos, formaPago }) {
        this.nombre = nombre;
        this.id = id;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.tlf = tlf;
        this.email = email;
        this.articulos = articulos;
        this.formaPago = formaPago;
    }

    get datos () {
        return {
            nombre: this.nombre,
            id: this.id,
            direccion: this.direccion,
            ciudad: this.ciudad,
            pais: this.pais,
            tlf: this.tlf,
            email: this.email,
            articulos: this.articulos,
            formaPago: this.formaPago,
        }
    }
}

//SIMULADOR DE BASE DE DATOS ARTICULOS
const inventario = [
    {
        id: 0,
        name: 'Televisor Roku 28"',
        precio: 180,
    },
    {
        id: 1,
        name: "Laptop VAIO",
        precio: 150,
    },
];

//SIMULADOR DE BASE DE DATOS FORMAS DE PAGO
const formaPago = [
    {
        id: 0,
        name: "Transferencia Bancaria",
        entidad: "BOD",
    },
    {
        id: 1,
        name: "Transferencia Bancaria",
        entidad: "Banesco",
    },
    {
        id: 2,
        name: "Criptomonedas",
        entidad: "Binance",
    },
];

//ELEMENTOS DEL DOM
const nombre = document.querySelector(".nombre__input");
const id = document.querySelector(".ci__input");
const direccion = document.querySelector(".direccion__input");
const ciudad = document.querySelector(".ciudad__input");
const pais = document.querySelector(".pais__input");
const tlf = document.querySelector(".tlf__input");
const email = document.querySelector(".email__input");
const main = document.querySelector(".container");
const form = document.querySelector(".formulario");
const articulos = document.querySelector(".articulos__select");
const pagoSelect = document.querySelector(".pago__select");
const divCarrito = document.querySelector(".zona--carrito");
const botonAgregar = document.querySelector(".boton--agregar");
let datosCliente = {};
let error = [];
let carrito = [];

//FUNCIONES PARA CREAR ELEMENTOS
const crearElementos = (tag, texto, clase, padre, despues, id = "") => {
    const elemento = document.createElement(tag);
    elemento.classList.add(clase);
    elemento.innerHTML = texto;
    padre.insertBefore(elemento, despues);
    elemento.id = `${id}`;
};

//FUNCION PARA CREAR ELEMENTOS AGREGANDOLOS AL FINAL
const crearElementosDespues = (tag, texto, clase, padre, id = "") => {
    const elemento = document.createElement(tag);
    elemento.classList.add(clase);
    elemento.innerHTML = texto;
    padre.appendChild(elemento);
    elemento.id = `${id}`;
};

//AGREGANDO LOS ARTICULOS class= "articulos__option"
const agregarArticulos = inventario.forEach((elemento, index) => {
    crearElementosDespues(
        "option",
        `$${elemento.precio} - ${elemento.name}`,
        "articulos__option",
        articulos,
        index
    );
});


//AGREGANDO LAS FORMAS DE PAGO
const agregarPago = formaPago.forEach((elemento,index) => {
    crearElementosDespues("option", `${elemento.name}: ${elemento.entidad}`, "pago__option", pagoSelect,index);
});


//FUNCION PARA ELIMINAR ELEMENTOS
const eliminarElementos = (clase, padre) => {
    const el = document.querySelectorAll(clase);
    el.forEach((elemento) => {
        setTimeout(() => {
            padre.removeChild(elemento);
        }, 3000);
    });
};


//LISTENER PARA AGREGAR ARTICULOS AL CARRITO
botonAgregar.addEventListener("click", () => {
    const indexArticulo = articulos.selectedIndex;
    const selectedArt = articulos[indexArticulo];

    if (indexArticulo !== 0) {
        carrito.push(inventario[selectedArt.id]);
        crearElementosDespues(
            "p",
            `${inventario[selectedArt.id].name} - $${inventario[selectedArt.id].precio}`,
            "articulos__carrito",
            divCarrito,
            selectedArt
        );
    }
});



//LISTENER PARA EL SUBMIT
const submit = document.querySelector(".boton__facturar");
submit.addEventListener("click", (e) => {
    e.preventDefault();

    //VALIDACION DEL FORMULARIO
    if (nombre.value.length == 0) {
        error.push("del nombre");
    }
    if (id.value.length == 0) {
        error.push("de la cedula o RIF");
    }
    if (direccion.value.length == 0) {
        error.push("de la direccion de envio");
    }
    if (ciudad.value.length == 0) {
        error.push("del ciudad");
    }
    if (pais.value.length == 0) {
        error.push("del pais");
    }
    if (tlf.value.length == 0) {
        error.push("del numero de telefono");
    }
    if (email.value.length == 0) {
        error.push("del correo electronico");
    }
    if (carrito.length == 0) {
        error.push("de los articulos");
    }

    let pago;
    const indexFormaPago = pagoSelect.selectedIndex;
    if (indexFormaPago !== 0) {
        const selectedFormaPago = pagoSelect[indexFormaPago];
        pago = formaPago[selectedFormaPago.id];
    } else{
        error.push("de la forma de pago");
    }

    //CREANDO LA INSTANCIA DE DATOS
    if (error.length == 0) {

        datosCliente = new Datos({
            nombre: nombre.value,
            id: id.value,
            direccion: direccion.value,
            ciudad: ciudad.value,
            pais: pais.value,
            tlf: tlf.value,
            email: email.value,
            articulos: carrito,
            formaPago: pago,
        });

        location.pathname = "/factura.html";

        //CREANDO LAS ALERTAS
    } else {
        error.forEach((error) => {
            crearElementos("p", `El campo ${error} no debe ir vacio`, "alert--error", main, form);
        });
        eliminarElementos(".alert--error", main);
        error = [];
        return;
    }
});



