
import { renderListWithTemplate, displayDiscount } from "./utils.mjs"

const productCardTemplate = (product) => 
  `
          <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              ${displayDiscount(product)}
              </a>
          </li>
  `;

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    this.data = await this.dataSource.getData(this.category);
    // const list = await this.dataSource.getData(this.category);
    // render the list
    this.renderList(this.data);
    // this.data = await this.datasource.getData();

    this.searchProduct(this.data);
    
  }

  get Products() {
    return this.data;
  }

  renderList(list) {
    this.listElement.innerHTML = '';
    renderListWithTemplate(productCardTemplate, this.listElement, list); 
  }

  
  searchProduct(list) {
    const searchBar = document.querySelector("#searchBar");
    searchBar.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toLowerCase();
      const filteredProducts = list.filter( (product) =>{
        return(
          product.Name.toLowerCase().includes(searchString) ||
          product.NameWithoutBrand.toLowerCase().includes(searchString)
        )
      });
      renderListWithTemplate(productCardTemplate, this.listElement, filteredProducts);
  
    })
  }

  


}

