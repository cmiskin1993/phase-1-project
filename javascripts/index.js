
/** NODE Getters */
const mainDiv = () => document.getElementById('main');
const homePageLink = () => document.getElementById('logo');
const recipesLink = () => document.getElementById('recipes-link');
const chooseMealLink = () => document.getElementById('choose-meal-link');

/** Templates */
const homePageTemplate = () => {
    return ` <div class="image">
    <img class="image__img" src=Images/AdobeStock_93020879.png alt= food >
    <div class="image__overlay" >
        <div class="image__title"></div>
        <h1 class="image__description">
            We take the stress <br> out of cooking
            </h1> `
}
const recipesTemplate = () => {
    return `<h2>My Recipes</h2> 
    <div id="recipe-container">
    <form id="recipe-form">
      <label><strong>Meal: </strong></label>
      <input type="text" id="meal-input" />
      <label><strong>Image: </strong></label>
      <input type="text" id="img-input" />
      <input type="submit" value="Submit" />
    </form>
  </div>
  <div id="recipe-container"></div>
  <div id="comments-form"></div>
  <div id="collection-comments"></div>`
}
const chooseMealTemplate = () => {
    return `<h2> Choose my meal for me <h2/>
    <button  onclick="button()" class="button">Get My Meal</button>`
}

/** Renderers */
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
}
const renderRecipesPage = () => {
    mainDiv().innerHTML = recipesTemplate();
}
const renderChooseMeal = () => {
    mainDiv().innerHTML = chooseMealTemplate();
}


/** EVENTS */

const homePageLinkEvent = () => {
    homePageLink ().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage();
    })
}
const recipesLinkEvent = () => {
    recipesLink ().addEventListener('click', (e) => {
        e.preventDefault
        renderRecipesPage();
    })
}
const chooseMealLinkEvent = () => {
    chooseMealLink ().addEventListener('click', (e) => {
        e.preventDefault
        renderChooseMeal();
    })
}

const button = () => {
  document.getElementById("button");
}


//Form
const recipeContainer = document.getElementById("recipe-container");
const recipeForm = document.getElementById("recipe-form");

function renderRecipe(recipes) {
  const recipeCard = document.createElement("div");
  recipeCard.id = `${recipes.id}`;
  recipeCard.className = "recipe-card";

  const recipeImg = document.createElement("img");
  recipeImg.src = recipes.image;
  recipeImg.alt = `${recipes.name} image`;

  const recipeName = document.createElement("h3");
  recipeName.textContent = recipes.name;


  recipeCard.append(recipeImg, recipeName);
  recipeContainer.appendChild(recipeCard);
}

function createRecipe(event) {
  event.preventDefault();
  const meal = document.querySelector("#meal-input").value;
  const img = event.target.querySelector("#img-input").value

  const recipe = {
    meal: meal,
    img: img,
    id: 1, 
  };
  renderRecipe(recipe);
  recipeForm.reset();
}

// Fetch Request

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
function init() {
  getRecipe();
  recipeForm.addEventListener("submit", createRecipe);
}
init();




/**************/









/** When the DOM Loads */

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    recipesLinkEvent();
    chooseMealLinkEvent();
})

