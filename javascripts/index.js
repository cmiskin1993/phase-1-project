/** Globes */
const baseUrl = 'http://localhost:3000';

let Recipes = [];

/** NODE Getters */
const mainDiv = () => document.getElementById('main');
const homePageLink = () => document.getElementById('logo');
const favoritesLink = () => document.getElementById('favorites-link');
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
const favoritesTemplate = () => {
    return ` <h2>My Recipes</h2>

    <div class="row">
      <div class="column">
        <div class="card">
            <img src="Images/190307-fish-tacos-112-1553283299.jpg" alt="fish-tacos" style="width:100%">
          <h3>Fish Tacos</h3>
        </div>
      </div>
    
      <div class="column">
        <div class="card">
            <img src="Images/Harvest-Bowl-5.jpg" alt="harvest-bowl" style="width:100%">
          <h3>Harvest Bowl</h3>
        </div>
      </div>
      
      <div class="column">
        <div class="card">
            <img src="Images/acai-smoothie-recipe-homemade-acai-bowl.jpg" alt="acai-bowl" style="width:100%">
          <h3>Acai Bowl</h3>
        </div>
      </div>
      
      <div class="column">
        <div class="card">
            <img src="Images/delish-191908-cauliflower-pizza-0390-landscape-pf-1568654348.jpg" alt="cauliflower-pizza" style="width:100%">
          <h3>Cauliflower Pizza</h3>
        </div>
      </div>
    </div> `
}
const chooseMealTemplate = () => {
    return `<h2> Choose my meal for me`
}

/** Renderers */
const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
}
const renderFavoritesPage = () => {
    mainDiv().innerHTML = favoritesTemplate();
}
const renderChooseMeal = () => {
    mainDiv().innerHTML = chooseMealTemplate();
}

/** EVENTS */

const loadRecipes = () =>{
    fetch(baseUrl + '/Recipes')
    .then(resp => resp.json())
    .then(data => Recipes = data)
}
const homePageLinkEvent = () => {
    homePageLink ().addEventListener('click', (e) => {
        e.preventDefault();
        renderHomePage();
    })
}
const favoritesLinkEvent = () => {
    favoritesLink ().addEventListener('click', (e) => {
        e.preventDefault
        renderFavoritesPage();
    })
}
const chooseMealLinkEvent = () => {
    chooseMealLink ().addEventListener('click', (e) => {
        e.preventDefault
        renderChooseMeal();
    })
}


/**************/









/** When the DOM Loads */

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    favoritesLinkEvent();
    chooseMealLinkEvent();
})