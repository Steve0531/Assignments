function filterOdd(arr){
    return arr.filter(num=>num%2===0);
}

function doubleNumbers(arr){
    return arr.map(num => num*2);
}

function calculateSum(arr){
    return arr.reduce((sum,num)=>sum+num,0);
}

function maxi(arr){
    return arr.reduce((max,n) => (max > n ? max : n),arr[0]);
}



function processData (num,callback){
    return callback(num);
}

const arr=[1,5,3,6,8,4,9,6,2];

console.log("Odd number are - " +processData(arr,filterOdd));
console.log("Doubled numbers - " +processData(arr,doubleNumbers));
console.log("Total - " +processData(arr,calculateSum));
console.log("Maximum - " +processData(arr,maxi));

/* OUTPUT

Odd number are - 6,8,4,6,2
Doubled numbers - 2,10,6,12,16,8,18,12,4
Total - 44
Maximum - 9



*/