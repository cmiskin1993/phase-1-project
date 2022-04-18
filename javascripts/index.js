/** When the DOM Loads */
document.addEventListener('DOMContentLoaded', () => {
  renderHomePage();
  homePageLinkEvent();
  recipesLinkEvent();
  chooseMealLinkEvent();
})

/** NODE Getters */
const mainDiv = () => document.getElementById('main');
const homePageLink = () => document.getElementById('logo');
const recipesLink = () => document.getElementById('recipes-link');
const chooseMealLink = () => document.getElementById('choose-meal-link');
const recipeForm = () => document.getElementById('recipe-form');
const recipeContainer = () => document.getElementById('recipe-container');

/** Templates */
const homePageTemplate = () => {
    return ` <div class="header-img">
    <img class="food-img" src=Images/AdobeStock_93020879.png alt=food  >
    <div class="food-img__overlay" >
        <div class="image__title"  ></div>
    <h1 class="image__description" >
            We take the stress <br> out of cooking
            </h1> `
}
const recipesTemplate = () => {
    return `<h2>My Recipes</h2> 
    <div id="recipe-form-container">
    <form id="recipe-form">
      <label><strong>Meal: </strong></label>
      <input type="text" id="meal-input" />
      <label><strong>Image: </strong></label>
      <input type="text" id="img-input" />
      <input type="submit" value="Submit" />
    </form>
  </div>
  <div id="recipe-container"></div>`   
}
const chooseMealTemplate = () => {
    return `<h2> Choose my meal for me <h2/>
    <button  onclick="handleClick()" class="button">Get My Meal</button>

    <div id="mealContainer"></div>`
}

/** Renderers */
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
}
const renderRecipesPage = () => {
    mainDiv().innerHTML = recipesTemplate();
    recipeForm().addEventListener("submit", createRecipe);
    getRecipe();
    addToPage();
}
const renderChooseMeal = () => {
    mainDiv().innerHTML = chooseMealTemplate();
}

/** EVENTS */
const homePageLinkEvent = () => {
    homePageLink ().addEventListener('click', () => {
        renderHomePage();
    })
}
const recipesLinkEvent = () => {
    recipesLink ().addEventListener('click', () => {
        renderRecipesPage();
    })
}
const chooseMealLinkEvent = () => {
    chooseMealLink ().addEventListener('click', () => {
        renderChooseMeal();
    })
}

/** FORM */
function renderRecipe(recipes) {
  const recipeCard = document.createElement("div");
  recipeCard.id = `meal${recipes.id}`;
  recipeCard.className = "recipe-card";

  const recipeImg = document.createElement("img");
  recipeImg.src = recipes.img;
  recipeImg.alt = `${recipes.meal}image`;

  const recipeName = document.createElement("h3");
  recipeName.textContent = recipes.meal;

  const recipeLikes = document.createElement("h3");
  recipeLikes.textContent = "";

  const likesNum = document.createElement("h5");
  likesNum.className = "like-num";
  likesNum.textContent = recipes.likes;

  const likeBttn = document.createElement("button");
  likeBttn.className = "like-bttn";
  likeBttn.textContent = "💗";
  likeBttn.addEventListener("click", () => increaseLikes(recipes, likesNum));

  recipeCard.append(recipeImg, recipeName,recipeLikes, likesNum, likeBttn);
  recipeContainer().appendChild(recipeCard);
}

function increaseLikes(recipes, likesNum) {
  ++recipes.likes;
  likesNum.textContent = recipes.likes;
}

function createRecipe(event) {
  event.preventDefault();
  const meal = document.querySelector("#meal-input").value;
  const img = event.target.querySelector("#img-input").value;

  const newRecipe = {
    meal: meal,
    img: img,
    likes: 0,
  };

  renderRecipe(newRecipe);
  recipeForm().reset(); 
}

/** Get Request */
function getRecipe() {
  fetch("http://localhost:3000/Recipes")
    .then(function (response) {
      return response.json();
    })
    .then(function (recipeArray) {
      recipeArray.forEach(function (recipe) {
        renderRecipe(recipe);
      });
    });
}
function addToPage() {
}


/** Connect to API */
const handleClick = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(res => res.json())
  .then(data => {
    createMealCard(data.meals[0]);
    });
  };
  function createMealCard(meal){
    mealContainer.innerHTML = `
      <div id="meal">
          <img src="${meal.strMealThumb}" alt= "Meal Img" />
          <h3> ${meal.strMeal}</h3>
          <p> Category: ${meal.strCategory}</p>
      </div>
    ` 
  };

