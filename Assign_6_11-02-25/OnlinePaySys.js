"use strict";
class Payment {
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
}
class creditCardPayment extends Payment {
    constructor(amount, date, cardNumber) {
        super(amount, date);
        this.cardNumber = cardNumber;
    }
    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount}  Card_Number- ${this.cardNumber}`;
    }
}
class payPalPayment extends Payment {
    constructor(amount, date, email) {
        super(amount, date);
        this.email = email;
    }
    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount} Email-${this.email}`;
    }
}
class cryptoPayment extends Payment {
    constructor(amount, date, walletAddress) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    processPayment() {
        return `Date - ${this.date} Amount - ${this.amount} WalletAmount-${this.walletAddress}`;
    }
}
const Payment1 = new creditCardPayment(100, "2025-02-04", '2548697841');
console.log(Payment1.processPayment());
const Payment2 = new payPalPayment(150, "2025-02-05", "Steve@gmail.com");
console.log(Payment2.processPayment());
const Payment3 = new cryptoPayment(200, "2025-02-06", "20000");
console.log(Payment3.processPayment());
