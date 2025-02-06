class Employee {
    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.#salary = salary;                    //Private
    }
    #salary;

    getSalary() {
        return this.#salary;
    }

    calculateBonus() {
        return 0;
    }
}
//Subclasses
class Manager extends Employee {
    calculateBonus() {                                          //Overriding
        const bonus = this.getSalary() * 0.2;
        return bonus;
    }
}

class Engineer extends Employee {
    calculateBonus() {                                          //Overriding
        const bonus = this.getSalary() * 0.15;
        return bonus;
    }
}

class Intern extends Employee {
    calculateBonus() {                                          //Overriding
        const bonus = this.getSalary() * 0.05;
        return bonus;
    }
}

const manager = new Manager("Steve", 101, 1000000);
console.log(`${manager.id} ${manager.name} ${manager.getSalary()} ${manager.calculateBonus()}`);

const engg = new Engineer("Rohan", 100, 2000000);
console.log(`${engg.id} ${engg.name} ${engg.getSalary()} ${engg.calculateBonus()}`);

const intern = new Intern("Savio", 103, 10000);
console.log(`${intern.id} ${intern.name} ${intern.getSalary()} ${intern.calculateBonus()}`);