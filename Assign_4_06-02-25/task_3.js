let arr = [];

function addData() {
    for (let i = 0; i < 500; i++) {
        arr.push({ data: new Array(500).fill("1234567890") });
    }
    console.log("Current array size:", arr.length);
}

function clearMemory() {
    arr = [];
    console.log("Memory cleared");
}

setInterval(addData, 1000);

setTimeout(() => {
    clearInterval(addData);
    clearMemory();
}, 10000);