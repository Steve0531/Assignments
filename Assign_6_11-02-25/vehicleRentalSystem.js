"use strict";
class Vehicle {
    constructor(brand, model, rentPricePerDay) {
        this.brand = 'Honda';
        this.model = 'Activa';
        this.rentPricePerDay = 500;
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
}
class Car extends Vehicle {
    constructor(brand, model, driveMode, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
        this.driveMode = '4WD';
        this.driveMode = driveMode;
    }
    calculateRentalCost(days) {
        return days * this.rentPricePerDay;
    }
}
class Bike extends Vehicle {
    constructor(brand, model, enginePower, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
        this.enginePower = 500;
        this.enginePower = enginePower;
    }
    calculateRentalCost(days) {
        return days * this.rentPricePerDay;
    }
}
class Truck extends Vehicle {
    constructor(brand, model, size, rentPricePerDay) {
        super(brand, model, rentPricePerDay);
        this.size = 'Medium';
        this.size = size;
    }
    calculateRentalCost(days) {
        return days * this.rentPricePerDay;
    }
}
const vehicle1 = new Car('Mahindra', 'Scorpio', '4WD', 1000);
const vehicle2 = new Bike('RoyalEnfield', 'ThunderBird', 500, 800);
const vehicle3 = new Truck('TATA', 'King', 'Small', 1500);
console.log(`${vehicle1.brand}   ${vehicle1.model}   ${vehicle1.driveMode}   ${vehicle1.rentPricePerDay}   ${vehicle1.calculateRentalCost(5)}`);
console.log(`${vehicle2.brand}   ${vehicle2.model}   ${vehicle2.enginePower}   ${vehicle2.rentPricePerDay}   ${vehicle2.calculateRentalCost(10)}`);
console.log(`${vehicle3.brand}   ${vehicle3.model}   ${vehicle3.size}   ${vehicle3.rentPricePerDay}   ${vehicle3.calculateRentalCost(3)}`);
/* OUTPUT
Mahindra   Scorpio   4WD   1000   5000
RoyalEnfield   ThunderBird   500   800   8000
TATA   King   Small   1500   4500

*/ 
