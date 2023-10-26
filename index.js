const list = document.querySelector('.main__list');
const input = document.querySelector('.main__input');
let number = 0;



input.addEventListener('input', async function () {
    number = input.value;
    removeCurrencies();
    //await addCurrencies(number);
});

const promise = fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((response) => response.json())
    .then((data) => {
        const currencies = []
        for (item in data.Valute) {
            currencies.push({
                name: data.Valute[item].Name !== 'СДР (специальные права заимствования)' ? data.Valute[item].Name : 'СДР',
                price: data.Valute[item].Value / data.Valute[item].Nominal
            });
        }
        return currencies;
    });

async function addCurrencies(number = 0) {
    const result = await promise;
    for (item of result) {
        const newItem = document.createElement('li');
        newItem.classList.add('main__list-item');
        newItem.innerHTML = `<p>Можно купить ${(number / item.price).toFixed(2)} ${item.name}, имея ${number} руб., по курсу ${item.price} руб. за единицу.</p>`
        list.appendChild(newItem);
    }
}

function removeCurrencies() {
    console.log(list.children)
    for (let i = 0; i < Array.from(list.children).length; i++) {
        console.log(i)
        list.removeChild(Array.from(list.children)[i]);
        
    }
    
}

addCurrencies()
