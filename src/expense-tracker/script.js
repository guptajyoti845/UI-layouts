const balance = document.getElementById('balance'),
    moneyPlus = document.getElementById('money-plus'),
    moneyMinus = document.getElementById('money-minus'),
    list = document.getElementById('list'),
    form = document.getElementById('form'),
    text = document.getElementById('text'),
    amount = document.getElementById('amount');

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction : [];

const doMagic = function (fn, delay){
    let flag = true;
    return function (){
        let context = this;
        let args = arguments;
        if (flag){
            fn.apply(context,args);
            flag=false;
            setTimeout(()=>{flag=false},delay);
        }
    }
}

const throttledAddTransaction = doMagic(addTransaction,3000);
// Add Transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add text and amount');
    }
    else{
        const transaction ={
            id : generateId(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactiontoDOM(transaction)
        updateValues();
        text.value = '';
        amount.value ='';
        updateLocalStorage();
    }
}

//Generate RandomId

function generateId(){
    return Math.floor(Math.random()*100000000);
}

//Remove transaction by ID

function removeTransactionId(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//Add Transaction to DOM List

function addTransactiontoDOM(transaction){
    //Get Sign
    const sign =transaction.amount>0 ? '+' : '-';

    const item = document.createElement('li');
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus');
    item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransactionId(${transaction.id})">X</button>
    `;
    list.appendChild(item);
}

//Update the balance, income and expense
function updateValues(){
    const amounts = transactions.map(transaction =>
       transaction.amount
    );
    console.log(amounts);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    balance.innerText = `$${total}`;

    const income  = amounts
                        .filter(item => item > 0)
                        .reduce((acc, item) => (acc+=item) , 0)
                        .toFixed(2);
    moneyPlus.innerText = `$${income}`;

    const expense = (amounts.filter(item => item<0).reduce((acc, item) => (acc += item),0).toFixed(2))* (-1);
    moneyMinus.innerText = `$${expense}`;
}

//Init App
function init(){
  list.innerHTML = '';
  transactions.forEach(addTransactiontoDOM)
  updateValues();
}

//Update Local Storage

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();


//add EventListener

form.addEventListener("submit", throttledAddTransaction);
