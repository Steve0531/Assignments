function fetchData(callback) {
    setTimeout(() => {
        const result = Math.floor(Math.random() * 500 + 1);
        if (result) {
            const names = ['Steve', 'Savio', 'Rohan', 'Vedant'];
            callback(null, names);
        } else {
            const err = "something caused error ";
            callback(err, null);
        }
    }, 2000);
}

function call(error, data) {
    if (error) {
        console.error(error.message);
    } else {
        console.log('Success data fetched', data);
    }
}

fetchData(call);

/*  OUTPUT

[Running] node "d:\Benchmark IT Solutions\Assign_4_06-02-25\task_1.js"
Success data fetched [ 'Steve', 'Savio', 'Rohan', 'Vedant' ]

*/