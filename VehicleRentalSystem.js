class Vehical {
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days) {
        return days * this.rentPricePerDay;
    }
}

class Car extends Vehical {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days);
    }
}

class Bike extends Vehical {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days);
    }
}

class Truck extends Vehical {
    calculateRentalCost(days) {
        return super.calculateRentalCost(days);
    }
}

const car = new Car("Toyota", "Camry", 50);
var rent = car.calculateRentalCost(4);
console.log('The cars rental cost is  rental cost is '+rent);

const bike = new Bike("Honda", "R15", 20);
rent = car.calculateRentalCost(3);
console.log('The cars rental cost is  rental cost is '+rent);

const truck = new Truck("Ford", "F-150", 100);
rent = car.calculateRentalCost(14);
console.log('The cars rental cost is  rental cost is '+rent);