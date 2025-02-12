abstract class Payment {
    constructor(public amount: number, public date: string) {}
    abstract processPayment(): void;
}

class creditCardPayment extends Payment {
    private cardNumber: string;
    
    constructor(amount: number, date: string, cardNumber: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
    }
    
    processPayment(): string {
        return `Date - ${this.date} Amount - ${this.amount}  Card_Number- ${this.cardNumber}`;
    }
}

class payPalPayment extends Payment {
    private email: string;
    
    constructor(amount: number, date: string, email: string) {
        super(amount, date);
        this.email = email;
    }
    
    processPayment(): string {
        return `Date - ${this.date} Amount - ${this.amount} Email-${this.email}`;
    }
}

class cryptoPayment extends Payment {
    private walletAddress: string;
    
    constructor(amount: number, date: string, walletAddress: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    
    processPayment(): string {
        return `Date - ${this.date} Amount - ${this.amount} WalletAmount-${this.walletAddress}`;
    }
}

const Payment1 = new creditCardPayment(100, "2025-02-04",'2548697841');
console.log(Payment1.processPayment());

const Payment2 = new payPalPayment(150, "2025-02-05","Steve@gmail.com" );
console.log(Payment2.processPayment());

const Payment3 = new cryptoPayment(200, "2025-02-06","20000");
console.log(Payment3.processPayment());

/* OUTPUT
Date - 2025-02-04 Amount - 100  Card_Number- 2548697841
Date - 2025-02-05 Amount - 150 Email-Steve@gmail.com
Date - 2025-02-06 Amount - 200 WalletAmount-20000

*/