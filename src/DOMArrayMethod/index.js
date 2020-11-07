const main = document.getElementById('main');
const add_userbtn = document.getElementById('add_user');
const doublebtn = document.getElementById('double');
const show_millionairesbtn = document.getElementById('show_millionaires');
const sortbtn = document.getElementById('sort');
const calculate_wealthbtn = document.getElementById('calculate_wealth');
let data= [];

//fetch random user and add money
async function getRandomUser(){
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };
    const res = await fetch("https://randomuser.me/api", config);
    const data = await res.json();
    const user = data.results[0];
    const newUser ={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }

    addData(newUser)

    console.log("newUser", newUser);

    updateDOM()
}
function addData(user){
    data.push(user)
}

function updateDOM(provideData = data){
    //clear main div

    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}


function formatMoney(number){
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

function doubleMoney(){
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }
    })

    updateDOM();
}

function sortByRichest(){
    data = data.sort((a,b) => {
        return b.money - a.money;
    })
    updateDOM();
}

function showMillionares(){
    data = data.filter(value => {
        return value.money > 100000000;
    })
};

function calculateWealth(){
    const wealth = data.reduce((accumulator, currentValue) => (accumulator+= currentValue.money),5);

    const wealthMoney = document.createElement('div');
    wealthMoney.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthMoney);
}
getRandomUser();
getRandomUser();
getRandomUser();

//addeventListener

add_userbtn.addEventListener('click',getRandomUser);

doublebtn.addEventListener('click',doubleMoney);

sortbtn.addEventListener('click',sortByRichest);

show_millionairesbtn.addEventListener("click", showMillionares)
calculate_wealthbtn.addEventListener("click", calculateWealth)
