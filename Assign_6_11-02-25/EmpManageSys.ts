abstract class Employee{
    name:string;
    id: number;
    private salary:number;

    constructor(name:string, id: number, salary:number){
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    getSalary():number{
        return this.salary;
    }

    abstract calculateBonus():number; 
}

class Manager extends Employee {
    designation:string;
    constructor(name:string, id:number, salary:number, designation:string){
        super(name,id,salary);
        this.designation=designation;
    }
    calculateBonus():number {                                          
        const bonus = this.getSalary() * 0.2;
        return bonus;
    }
}

class Engineer extends Employee{
    designation:string;
    constructor(name:string, id:number, salary:number, designation:string){
        super(name,id,salary);
        this.designation=designation;
    }
    calculateBonus():number {                                          
        const bonus = this.getSalary() * 0.15;
        return bonus;
    }
}

class Intern extends Employee{
    designation:string;
    constructor(name:string, id:number, salary:number, designation:string){
        super(name,id,salary);
        this.designation=designation;
    }
    calculateBonus():number {                                          
        const bonus = this.getSalary() * 0.05;
        return bonus;
    }
}


const manager = new Manager('Steve', 1, 50000, 'Manager');
const engineer = new Engineer('Savio', 2, 80000, 'Admin');
const intern = new Intern('Rohan', 3, 20000, 'Trainee');

console.log('ID  Designation   Name    Salary  Bonus');
console.log(`${manager.id}   ${manager.designation}   ${manager.name}   ${manager.getSalary()}   ${manager.calculateBonus()}`);
console.log(`${engineer.id}   ${engineer.designation}   ${engineer.name}   ${engineer.getSalary()}   ${engineer.calculateBonus()}`);
console.log(`${intern.id}   ${intern.designation}   ${intern.name}   ${intern.getSalary()}   ${intern.calculateBonus()}`);

/*  OUTPUT

ID  Designation   Name    Salary  Bonus
1   Manager   Steve   50000   10000
2   Admin   Savio   80000   12000
3   Trainee   Rohan   20000   1000

*/
