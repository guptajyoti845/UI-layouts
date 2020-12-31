const search = document.getElementById('search'),
    submit=document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEle = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEle = document.getElementById('single-meal');

//functions

//Search meal from API
const SearchMeal = (e) => {
    e.preventDefault();
    //clear single meal
    mealsEle.innerHTML='';
    single_mealEle.innerHTML = '';
    //get search term
    const term  = search.value;

    console.log(term);

    ///check for empty term
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for "${term}"</h2>`;
                if(data.meals ===null){
                    resultHeading.innerHTML = `<h2>There is no search result. Please Try Again</h2>`;
                }
                else{
                    mealsEle.innerHTML = data.meals.map(meal =>
                        `<div class="meal">
                            <img src="${meal.strMealThumb}" alt=${meal.strMeal} />
                            <div class="meal-info" data-mealId=${meal.idMeal}>
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>`
                    ).join('');
                }
            });

        //clear search Text
        search.value='';
    }
    else {
        alert('Please enter search item');
    }

}

//add Meal to DOM
const addMealtoDOM = (meal) => {
    const ingredients = [];
    for (let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else{break;}
    }

    console.log(ingredients);
    single_mealEle.innerHTML=`<div class="single-meal">
                <h1>${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="single-meal-info">
                    ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
                    ${meal.strArea ? `<p>${meal.strArea}</p>`: ''}
                </div>
                <div class="main">
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ingredientt =>
                            `<li>${ingredientt}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>`
}

//Fetch Meal By ID
const getMealById = (mealID) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealtoDOM(meal);
        })
}

//Fetch random meal from API
const getRandomMeal =() =>{
    //clear meal and Heading
    mealsEle.innerHTML='';
    resultHeading.innerHTML='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(resp => resp.json())
        .then(data => {
            const meal = data.meals[0];
            addMealtoDOM(meal);
        })

}
//event listener

submit.addEventListener('submit', SearchMeal)
mealsEle.addEventListener('click',(e)=> {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }
    })
    console.log(mealInfo);
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealId');
        console.log("mealID", mealID);
        getMealById(mealID);
    }
})
random.addEventListener('click', getRandomMeal);
