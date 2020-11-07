const currencyElementOne = document.getElementById('currency-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swapBtn  = document.getElementById('swap');



//fetch exchange rates and update DOM
function calculate(){
    const currency_one = currencyElementOne.value;
    const currency_two = currencyElementTwo.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`,{
        mode: 'no-cors',
        header: {
            'Access-Control-Allow-Origin':'*',
        }
    }).then(res => res.json())
        .then(data => {
            //console.log(data)
            const rate = data.rates(currency_two);
            console.log(rate);
        });
    console.log(currency_one,currency_two);

}



//event Listeners

currencyElementOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate)

calculate();
