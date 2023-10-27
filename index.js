const list = document.querySelector('.main__list');
const input = document.querySelector('.main__input');
let number = 0;

const promise = fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((response) => response.json())
    .then((data) => {
        const currencies = []
        for (item in data.Valute) {
            currencies.push({
                name: data.Valute[item].Name !== 'СДР (специальные права заимствования)' ? data.Valute[item].Name : 'СДР',
                price: (data.Valute[item].Value / data.Valute[item].Nominal).toFixed(2),
            });
        }
        return currencies;
    });

async function addCurrencies(number = 0) {
    const result = await promise;
    if (number) {
        for (item of result) {
            const newItem = document.createElement('li');
            newItem.classList.add('main__list-item');
            newItem.innerHTML = `<p>Можно купить ${(number / item.price).toFixed(2)} ${item.name}, имея ${number} руб., по курсу ${item.price} руб. за единицу.</p>`
            list.appendChild(newItem);
        }
    } else {
        let i = 0;
        for (item of result) {
            const newItem = document.createElement('li');
            newItem.classList.add('main__list-item');
            newItem.innerHTML = `<p>1 ${item.name} стоит ${item.price} руб.</p>`
            const obj = new Promise((resolve, reject) => {
                setTimeout(() => {
                    newItem.classList.add('_active');
                    resolve(newItem);
                }, i * 100);
            });
            obj
                .then((response) => {
                    list.appendChild(response);
                })
            i++;
            //const newItem = document.createElement('li');
            //newItem.classList.add('main__list-item');
            //newItem.innerHTML = `<p>1 ${item.name} стоит ${item.price} руб.</p>`
            //newItem.classList.add('_active');
            //list.appendChild(newItem);
        }
    }
}

function removeCurrencies() {
    for (item of Array.from(list.children)) {
        list.removeChild(item);
    }
}

input.addEventListener('input', function () {
    number = input.value;
    removeCurrencies();
    addCurrencies(number);
});

addCurrencies()
