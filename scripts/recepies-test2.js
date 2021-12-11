let api = "https://www.themealdb.com/api/json/v1/1/";
const btnContainer = document.querySelector(".btn-container");
const dishesContainer = document.querySelector(".dishes");
const recipeModal = document.querySelector(".recipies-modal");
const recipeModalContent = document.querySelector(".recipies-modal-content");

window.addEventListener("DOMContentLoaded", function () {
  getCategoryBtns();
});
btnContainer.addEventListener("click", getMeals);
dishesContainer.addEventListener("click", getMealRecipeModal);

// closeBtn.addEventListener("click", function () {
//   closeBtn.parentElement.classList.remove("active");
// });
// if (recipeModal.classList.contains("active")) {
//   closeBtn.addEventListener("click", () => {
//     closeBtn.parentElement.parentElement.classList.remove("active");
//   });
// }
function getCategoryBtns() {
  fetch(`${api}categories.php`)
    .then((response) => response.json())
    .then((data) => {
      let categories = data.categories;
      btnContainer.innerHTML = categories
        .map(function (btn) {
          return `<button type="button" data-id='${btn.strCategory}' class="${btn.strCategory} filter-btn">
    ${btn.strCategory}
    </button>`;
        })
        .join("");
      const filterBtns = document.querySelectorAll(".filter-btn");
    });
}
// btnContainer.addEventListener("click", function (e) {
//   if (e.target.classList == "filter-btn") {
//     console.log(e.target.classList);
//   }
// });

function getMeals(e) {
  if (e.target.classList.contains("filter-btn")) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.classList[0]}`
    )
      .then((response) => response.json())
      .then((data) => {
        const dishes = data.meals;
        dishesContainer.innerHTML = dishes
          .map(function (item) {
            return `<article class="dish">
              <img src=${
                item.strMealThumb
              } alt="${item.strMeal}" class="photo" />
              <div class="item-info">
                <header>
                  <h4>${item.strMeal}</h4>
                </header>
                <button class="${item.strMeal
                  .replace(/ /g, "-")
                  .toLowerCase()} recipe-details" data-id="${item.idMeal}">Read more</button>
              </div>
            </article>
            `;
          })
          .join("");
      });
  }
}
//zrobić fetch na mealRecipeModal
function getMealRecipeModal(e) {
  if (e.target.classList.contains("recipe-details")) {
    let mealItem = e.target.dataset.id;
    fetch(`${api}lookup.php?i=${e.target.dataset.id}`)
      .then((response) => response.json())
      .then((data) => {
        mealRecipeModal(data);
      });
  }
}

function mealRecipeModal(data) {
  recipeModalContent.innerHTML = `
  <img src="${data.meals[0].strMealThumb}" alt="">
        <header><h2>${data.meals[0].strMeal}</h2></header>
        <div class="recipe-modal-info">
          <div class="recipe-instruction">
            <p>${data.meals[0].strInstructions}</p>
          </div>
          <div class="btn recipe-close-btn fas fa-times"></div>
          </div>`;

  recipeModal.classList.add("active");

  // Close button functionality
  const closeBtn = document.querySelector(".recipe-close-btn");
  // if (recipeModal.classList != "active") {
  //   recipeModalContent.innerHTML = "";
  // }
  closeBtn.addEventListener("click", function () {
    recipeModal.classList.remove("active");
  });

  // console.log(recipeModalContent.parentElement.classList);
}

// function closeRecipeModal(closeBtn) {
//   closeBtn.addEventListener("click", function () {
//     console.log(recipeModalContent.parentElement.classList);
//     recipeModalContent.parentElement.classList.remove("active");
//   });
//   console.log(closeBtn.parentElement.parentElement.classList);
// }
