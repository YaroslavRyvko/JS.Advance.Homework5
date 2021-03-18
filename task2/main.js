const SHOP = (function () {
    let bank = 1000;
    let beerCount = 100;
    let vineCount = 50;
    let pepsiCount = 80;
    let beerPrice = 45;
    let vinePrice = 95;
    let pepsiPrice = 25;

    function checkBank() {
        return bank;
    }

    function checkBeer() {
        return beerCount;
    }

    function checkVine() {
        return vineCount;
    }

    function checkPepsi() {
        return pepsiCount;
    }

    function sellBeer(count) {
        if (count > beerCount) {
            return true;
        }
        beerCount -= count;
        bank += count * beerPrice;
        return count * beerPrice
    }

    function sellVine(count) {
        if (count > vineCount) {
            return true;
        }
        vineCount -= count;
        bank += count * vinePrice;
        return count * vinePrice
    }

    function sellPepsi(count) {
        if (count > pepsiCount) {
            return true;
        }
        pepsiCount -= count;
        bank += count * pepsiPrice;
        return count * pepsiPrice
    }

    return {
        bank: checkBank,
        beerCount: checkBeer,
        vineCount: checkVine,
        pepsiCount: checkPepsi,
        beerSold: sellBeer,
        vineSold: sellVine,
        pepsiSold: sellPepsi,
    }

})();


const ADD_BTN = document.querySelector('.addButton');
let modalInfo = document.querySelector('.modal-body');

const F1 = document.forms.f1;
const F2 = document.forms.f2;
const F3 = document.forms.f3;

let beerCheck = false;
let vineCheck = false;
let pepsiCheck = false;

let beerPrice = 0;
let vinePrice = 0;
let pepsiPrice = 0;

let b = 0;
let v = 0;
let p = 0;

let checkOrder = false;

F2.addBtn.addEventListener('click', function () {
    if (F2.choose[0].checked) {
        if (SHOP.beerCount() < F2.counter.value || SHOP.beerCount() < b + parseInt(F2.counter.value)) {
            ADD_BTN.setAttribute('data-toggle', 'modal');
            modalInfo.textContent = `Вибачте але на складі залишилося beer ${SHOP.beerCount()} штук;`
        } else {
            F2.checkInfo.textContent += `Пиво: ${F2.counter.value} шт. \n`;
            ADD_BTN.setAttribute('data-toggle', '');
            b = parseInt(F2.counter.value) + b;
            beerCheck = true;
            checkOrder = true;
        }
    } else if (F2.choose[1].checked) {
        if (SHOP.vineCount() < F2.counter.value || SHOP.vineCount() < v + parseInt(F2.counter.value)) {
            ADD_BTN.setAttribute('data-toggle', 'modal');
            modalInfo.textContent = `Вибачте але на складі залишилося wine ${SHOP.vineCount()} штук;`
        } else {
            F2.checkInfo.textContent += `Вино: ${F2.counter.value} шт. \n`;
            ADD_BTN.setAttribute('data-toggle', '');
            v = parseInt(F2.counter.value) + v;
            vineCheck = true;
            checkOrder = true;
        }
    } else {
        if (SHOP.pepsiCount() < F2.counter.value || SHOP.pepsiCount() < p + parseInt(F2.counter.value)) {
            ADD_BTN.setAttribute('data-toggle', 'modal');
            modalInfo.textContent = `Вибачте але на складі залишилося pepsi ${SHOP.pepsiCount()} штук;`
        } else {
            F2.checkInfo.textContent += `Пепсі: ${F2.counter.value} шт. \n`;
            ADD_BTN.setAttribute('data-toggle', '');
            p = parseInt(F2.counter.value) + p;
            pepsiCheck = true;
            checkOrder = true;
        }
    }
    F2.counter.value = '';
})

F2.buyBtn.addEventListener('click', function () {
    if (checkOrder) {
        if (beerCheck) {
            beerPrice = SHOP.beerSold(b);
            beerCheck = false;
        }
        if (vineCheck) {
            vinePrice = SHOP.vineSold(v);
            vineCheck = false;
        }
        if (pepsiCheck) {
            pepsiPrice = SHOP.pepsiSold(p);
            pepsiCheck = false;
        }
        F1.bank.value = SHOP.bank() + ' грн';
        F1.beerCount.value = SHOP.beerCount() + ' шт.';
        F1.vineCount.value = SHOP.vineCount() + ' шт.';
        F1.pepsiCount.value = SHOP.pepsiCount() + ' шт.';
        F3.result.textContent = F2.checkInfo.textContent + `Всього: ${beerPrice + vinePrice + pepsiPrice} гривень`;
        F2.checkInfo.textContent = '';
        beerPrice = 0;
        vinePrice = 0;
        pepsiPrice = 0;
        b = 0;
        v = 0;
        p = 0;
        checkOrder = false;
        ADD_BTN.setAttribute('data-toggle', '');
    }
})