class ClientData {
    constructor({ 
        clientName, 
        clientId, 
        clientAddress, 
        clientCity, 
        clientCountry, 
        clientPhone, 
        clientEmail, 
        shoppingCart, 
        paymentType }) {
        this.clientName = clientName;
        this.clientId = clientId;
        this.clientAddress = clientAddress;
        this.clientCity = clientCity;
        this.clientCountry = clientCountry;
        this.clientPhone = clientPhone;
        this.clientEmail = clientEmail;
        this.shoppingCart = shoppingCart;
        this.paymentType = paymentType;
    }
};