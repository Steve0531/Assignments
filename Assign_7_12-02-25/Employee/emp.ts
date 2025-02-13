interface IEmployee {
    id:number;
    name:string;
    position:string;
    salary:number;
}

interface IManager extends IEmployee{
    teamSize:number;
}


class Department{
    private employees: IEmployee[]=[];

    // constructor(employee:IEmployee[]){
    //     this.employees=employee;
    // }

    addEmployee(employee:IEmployee):void{
        this.employees.push(employee);
    }

    removeEmployee(id:number):void{
        this.employees=this.employees.filter(emp => emp.id!=id );
    }

    getTotalSalary():number{
        return this.employees.reduce((total,emp)=>total +=emp.salary,0);
    }

    listEmployees():void{
        console.log(this.employees);
    }
}

class GenericStorage<T>{
    items: T[] = [];

    add(item:T):void{
        this.items.push(item);
    }

    remove(item : T): void{
        this.items = this.items.filter(items => items != item);
    }

    getAll():T[]{
        return this.items;
    }
}


function updateSalary <T extends IEmployee>(employee:T, newSalary:number):T{
    return {...employee, salary : newSalary};
}

const emp1: IEmployee= {id:1,name:'Steve', position:'Admin', salary: 50000 };
const emp2:IEmployee = {id:2 , name:'Savio' , position:'Manager' , salary:80000};
const emp3:IEmployee = {id:3 , name:'Rohan' , position:'Associate', salary:40000};

const dep= new Department();

dep.addEmployee(emp1);
dep.addEmployee(emp2);
dep.addEmployee(emp3);

console.log("Employees added are- ");
dep.listEmployees()

dep.removeEmployee(2);

console.log("After removeing emp id no 2 - ");
dep.listEmployees()

console.log("Total salary of all employees is -", dep.getTotalSalary());

/*OUTPUT  
Employees added are- 
[
  { id: 1, name: 'Steve', position: 'Admin', salary: 50000 },
  { id: 2, name: 'Savio', position: 'Manager', salary: 80000 },
  { id: 3, name: 'Rohan', position: 'Associate', salary: 40000 }
]
After removeing emp id no 2 - 
[
  { id: 1, name: 'Steve', position: 'Admin', salary: 50000 },
  { id: 3, name: 'Rohan', position: 'Associate', salary: 40000 }
]
Total salary of all employees is - 90000

*/

const empStorage = new GenericStorage<IEmployee>();

empStorage.add(emp1);
empStorage.add(emp2);
empStorage.add(emp3);

console.log("Added employees are-",empStorage.getAll());

empStorage.remove(emp2);

console.log("After removal-",empStorage.getAll());

const updated = updateSalary(emp1, 80000);
console.log("Updated Salary:", updated);

/*  OUTPUT
Added employees are- [
  { id: 1, name: 'Steve', position: 'Admin', salary: 50000 },
  { id: 2, name: 'Savio', position: 'Manager', salary: 80000 },
  { id: 3, name: 'Rohan', position: 'Associate', salary: 40000 }
]
After removal- [
  { id: 1, name: 'Steve', position: 'Admin', salary: 50000 },
  { id: 3, name: 'Rohan', position: 'Associate', salary: 40000 }
]
Updated Salary: { id: 1, name: 'Steve', position: 'Admin', salary: 80000 }

*/

