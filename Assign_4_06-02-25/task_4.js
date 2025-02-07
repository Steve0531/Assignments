const products = [
    { name : "computer", price : 50000, category : "personal"},
    {name : "mobile", price : 20000, category : "mobile"},
    {name : "car", price: 150000, category:"vehicle"},
    {name : "fan", price: 2000, category:"electric"},
    {name : "television", price: 15000, category:"electric"},
];

//MAP
const upperCase = products.map(prod=>prod.name.toUpperCase());
console.log("In Upper Case - " +upperCase);

//Filter
const electronics = products.filter(prod=>prod.category==='electric');
console.log(" Electric Category - " +electronics);

//reduce
const total = products.reduce((total,products)=> total + products.price,0);
console.log("Total - " +total);


//Task 4 - Combine map,filter,reduce

function totalPrice(category){
    return products.filter(prod=> prod.category === category).map(prod=> prod.price).reduce((sum,prod) => sum + prod,0);
}

console.log("Total Price of Electric category - " +totalPrice("electric"));

/*    OUTPUT

In Upper Case - COMPUTER,MOBILE,CAR,FAN,TELEVISION
 Electric Category - [object Object],[object Object]
Total - 237000
Total Price of Electric category - 17000

   */