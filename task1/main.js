function sumValue() {
    let count = 0;
    return function (num) {
        count += num;
        console.log('Sum = ', count);
    }
}
let sum = sumValue();
sum(3)
sum(5) 
sum(12) 
sum(228) 