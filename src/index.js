import Carousel from "./components/Carousel/index.js";
import slides from "./components/Carousel/slides.js";

import RibbonMenu from "./components/RibbonMenu/index.js";
import categories from "./components/RibbonMenu/categories.js";

import StepSlider from "./components/StepSlider/index.js";
import ProductsGrid from "./components/ProductsGrid/index.js";

import CartIcon from "./components/CartIcon/index.js";
import Cart from "./components/Cart/index.js";
export default class Main {
  constructor() {}

  async render() {
    let carousel = new Carousel(slides);
    let dataCarouselHolder = document.querySelector("[data-carousel-holder]");
    dataCarouselHolder.append(carousel.elem);

    let ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector("[data-ribbon-holder]");
    dataRibbonHolder.append(ribbonMenu.elem);

    let stepSlider = new StepSlider({ steps: 5 });
    let dataSliderHolder = document.querySelector("[data-slider-holder]");
    dataSliderHolder.append(stepSlider.elem);

    let cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector("[data-cart-icon-holder]");
    dataCartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    async function getProductList() {
      return await fetch("src/products.json").then((response) =>
        response.json()
      );
    }

    let productList = await getProductList();

    let productsGrid = new ProductsGrid(productList);
    let dataProductsGridHolder = document.querySelector(
      "[data-products-grid-holder]"
    );
    dataProductsGridHolder.innerHTML = "";
    dataProductsGridHolder.append(productsGrid.elem);

    productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegetarianOnly: document.getElementById("vegetarian-checkbox").checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      let productToAdd = productList.find(
        (product) => product.id === event.detail
      );
      cart.addProduct(productToAdd);
    });

    stepSlider.elem.addEventListener("slider-change", (event) => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productsGrid.updateFilter({
        category: event.detail,
      });
    });

    document.querySelector(".filters").addEventListener("change", (event) => {
      if (event.target.closest("#nuts-checkbox")) {
        productsGrid.updateFilter({
          noNuts: event.target.checked,
        });
      }
      if (event.target.closest("#vegetarian-checkbox")) {
        productsGrid.updateFilter({
          vegetarianOnly: event.target.checked,
        });
      }
    });
  }
}
