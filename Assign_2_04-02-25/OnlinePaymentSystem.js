class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }

    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount} `;
    }
}

class CreditCardPayment extends Payment {
    #cardNumber;

    constructor(amount, date, cardNumner) {
        super(amount, date);
        this.#cardNumber = cardNumner;
    }

    getCardNumber(){
        return this.#cardNumber;
    }

    setCardNumber(value){
        this.#cardNumber=value;
    }

    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount}  Card_Number- ${this.getCardNumber()}`;
    }
}

class PayPalPayment extends Payment {
    #email;
    constructor(amount, date, email) {

        super(amount, date);
        this.#email = email;
    }

    getEmail(){
        return this.#email;
    }

    setEmail(value){
        this.#email=value;
    }

    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount} Email-${this.getEmail()}`;
    }
}

class CryptoPayment extends Payment {
    #walletAmt
    constructor(amount, date, walletAmt) {
        super(amount, date);
        this.#walletAmt = walletAmt;
    }
    getWalletAmt(){
        return this.#walletAmt;
    }

    setWalletAmt(value){
        this.#walletAmt=value;
    }
    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount} WalletAmount-${this.getWalletAmt()}`;
    }
}

const creditCardPayment = new CreditCardPayment(100, "2025-02-04");
creditCardPayment.setCardNumber("1234-5678-9012-3456");
console.log(creditCardPayment.processPayment());

const payPalPayment = new PayPalPayment(150, "2025-02-05" );
payPalPayment.setEmail("Steve@gmail.com");
console.log(payPalPayment.processPayment());

const cryptoPayment = new CryptoPayment(200, "2025-02-06");
cryptoPayment.setWalletAmt("20000")
console.log(cryptoPayment.processPayment());