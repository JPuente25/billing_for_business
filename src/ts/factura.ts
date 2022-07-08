import { BillData } from "./classes/classBillData.js";
import { ClientData } from "./classes/classDatos.js";

//Obteniendo la clientData desde el Local Storage
const clientDataHistory: ClientData = JSON.parse(localStorage.getItem('clientData')!);

//INSTANCIAS DE CLASES
const clientData = new ClientData(clientDataHistory);
const billData = new BillData({paymentType: clientData.paymentDetails, shoppingCart: clientData.shoppingCart});
const date: Date = new Date();

//Crea la informacion del cliente
const clientDataInfo: void = clientData.createClientInfo();

//Crea la informacion de la factura
const billDataInfo: void = billData.createBillInfo();

//Crea la lista de articulos, con su nombre y precio
const createArticleList: void = billData.createArticlesList();

//CREACION DE LAS CAJAS CON LOS PRECIOS 
const createPriceBoxes: void = billData.createPriceBoxes();

//Creacion de las copias de la factura para la empresa y despacho
const createBillCopy: void = billData.createCopy();






