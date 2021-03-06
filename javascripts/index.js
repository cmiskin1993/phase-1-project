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
const recipeTemplate = () => {
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
    <div id="mealContainer"></div>
    <div id="number">0</div>`
}

/** Renderers */
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
}
const renderRecipesPage = () => {
    mainDiv().innerHTML = recipeTemplate();
    recipeForm().addEventListener("submit", createRecipe);
    getRecipes();
    addToPage();
    init();
}
const renderChooseMeal = () => {
    mainDiv().innerHTML = chooseMealTemplate();
}

/** EVENTS */
const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', () => {
        renderHomePage();
    })
}
const recipesLinkEvent = () => {
    recipesLink().addEventListener('click', () => {
        renderRecipesPage();
    })
}
const chooseMealLinkEvent = () => {
    chooseMealLink().addEventListener('click', () => {
        renderChooseMeal();
    })
}

/** FORM */
function renderRecipe(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.id = `meal${recipe.id}`;
  recipeCard.className = "recipe-card";

  const recipeImg = document.createElement("img");
  recipeImg.src = recipe.img;
  recipeImg.alt = `${recipe.meal}image`;

  const recipeName = document.createElement("h3");
  recipeName.textContent = recipe.meal;

  const recipeLikes = document.createElement("h3");
  recipeLikes.textContent = "";

  const likesNum = document.createElement("h5");
  likesNum.className = "like-num";
  likesNum.textContent = recipe.likes;

  const likeBttn = document.createElement("button");
  likeBttn.className = "like-bttn";
  likeBttn.textContent = "????";
  likeBttn.addEventListener("click", (e) => increaseLikes(e, recipe, likesNum));

  recipeCard.append(recipeImg, recipeName, recipeLikes, likesNum, likeBttn);
  recipeContainer().appendChild(recipeCard);
  }
  
function createRecipe(event) {
  event.preventDefault();
  const meal = document.querySelector("#meal-input").value;
  const img = event.target.querySelector("#img-input").value;

  const recipe = {
    meal: meal,
    img: img,
    likes: 0,
  };
  
/** Get Request */

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  };

  fetch("http://localhost:3000/recipes", configObj)
    .then(resp => resp.json()) 
    .then(recipe => renderRecipe(recipe))
    recipeForm().reset(); 
}

function getRecipes() {
  fetch("http://localhost:3000/recipes")
  .then(response => {
      return response.json();
    })
    .then(recipeArray => {
      recipeArray.forEach(recipe => {
        renderRecipe(recipe);
      });
    });
  }

  const increaseLikes = (e, recipe, likesNum) => {
    e.stopPropagation();

    ++recipe.likes;

    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({likes: recipe.likes})
    }

    fetch(`http://localhost:3000/recipes/${recipe.id}`, configObj)
    likesNum.textContent = recipe.likes;
    };

function addToPage() {
}
function init() {
}

/** Connect to API */
const handleClick = () => {
  let element = document.getElementById("number");
  let value = element.innerHTML;
  ++value
  document.getElementById('number').innerHTML = value





  
  
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then(res => res.json())
  .then(data => {
      /**Error handling for keys */
    createMealCard(data.meals[0]);
    });
  };
  function createMealCard(meals){
    mealContainer.innerHTML = `  
      
      <div id="meal">
          <img src="${meals.strMealThumb}" alt= "Meal Img" />
          <h3> ${meals.strMeal}</h3>
          <p> Category: ${meals.strCategory}</p>
      </div>`
  };






// NOTES for adding later
  // <a href="${meals.strSource}">learn more </a> 

  // <div>
  // ${meals.strYoutube ? `
  // <div class="row">
  //   <h5>Video Recipe</h5>
  //   <div class="videoWrapper">
  //     <iframe width="420" height="315"
  //     src="https://www.youtube.com/embed/${meals.strYoutube.slice(-11)}">
  //     </iframe>
  // </div>` : ''}`
