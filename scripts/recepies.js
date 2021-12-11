const btnContainer = document.querySelector(".btn-container");
const menuItems = document.querySelector(".menu-items");
const recipeModal = document.querySelector(".recipies-modal");
const menu = document.querySelector(".menu");
// fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
//   .then((res) => res.json())
//   .then((data) => {
//     let categories = data.categories;
//     btnContainer.innerHTML = categories
//       .map(function (category) {
//         return `<button type="button" class="filter-btn" data-id=${category.strCategory}>
//       ${category.strCategory}
//     </button>`;
//       })
//       .join("");
//     console.log(categories);
//     const filterBtn = document.querySelectorAll(".filter-btn");
//     console.log(filterBtn);
//   });
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  .then((res) => res.json())
  .then((data) => {
    let categories = data.categories;
    btnContainer.innerHTML = categories
      .map(function (singleBtn) {
        return `<button type="button" class="filter-btn" data-id=${singleBtn.strCategory}>
      ${singleBtn.strCategory}
    </button>`;
      })
      .join("");
    const filterBtn = document.querySelectorAll(".filter-btn");
    console.log(filterBtn);
    filterBtn.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        let category = e.currentTarget.dataset.id;
        console.log(e.currentTarget);
        chosingCategory(category);
      });
    });
  });

function chosingCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((resp) => resp.json())
    .then((data) => {
      menuItems.innerHTML += data.meals
        .map(function (item) {
          return `<article class="menu-item">
          <img src=${item.strMealThumb} alt="${item.strMeal}" class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.strMeal}</h4>
            </header>
            <button class="readMore" data-id="${item.idMeal}">Read more</button>
          </div>
        </article>`;
        })
        .join("");
      console.log(data.meals);
      const readMoreBtn = document.querySelectorAll(`.readMore`);
      readMoreBtn.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          recipeModal.classList.add("active");
          // menu.classList.add("modal-active");
          console.log(data.meals);
          recipeModal.innerHTML = `<div class="recipies-modal-content">
          <header><h2>${data.meals.strMeal}</h2></header>

          </div>
          
          // </div>`;
        });
      });
    });
}
