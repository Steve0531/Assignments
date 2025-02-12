abstract class Vehicle{
    brand:string = 'Honda'
    model:string = 'Activa';  
    rentPricePerDay:number = 500;
    constructor(brand:string, model:string, rentPricePerDay:number){
        this.brand=brand;
        this.model=model;
        this.rentPricePerDay=rentPricePerDay;
    }
    abstract calculateRentalCost(days:number):number;
}

class Car extends Vehicle{
    driveMode:string = '4WD';
    constructor(brand:string, model:string, driveMode:string, rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
        this.driveMode = driveMode;
    }

    calculateRentalCost(days: number): number {
        return days*this.rentPricePerDay;
    }
}

class Bike extends Vehicle{
    enginePower : number = 500;
    constructor(brand:string, model:string, enginePower:number, rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
        this.enginePower= enginePower;
    }
    calculateRentalCost(days: number): number {
        return days*this.rentPricePerDay;
    }
}    


class Truck extends Vehicle{
    size : string = 'Medium';
    constructor(brand:string, model:string, size:string, rentPricePerDay:number){
        super(brand,model,rentPricePerDay);
        this.size = size;
    }
    calculateRentalCost(days: number): number {
        return days*this.rentPricePerDay;
    }
}


const vehicle1 = new Car('Mahindra','Scorpio','4WD',1000);
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