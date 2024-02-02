class CategoryChange {
  categoryList = ["pending", "finished", "bin"];

  mainCategoryList = document.querySelector(
    "#mainCategoryList"
  ) as HTMLUListElement;

  sideBarCats = document.querySelector("#sideBarCats") as HTMLDivElement;

  handleCategoryChange(handle: (cat: string) => void) {
    [this.mainCategoryList, this.sideBarCats].forEach((arr) => {
      arr.addEventListener("click", (e) => {
        const target = e.target as HTMLLIElement;
        const element = target.closest("li");
        if (element === null) return;
        const cat = [...element.classList].slice(0, 1)[0];
        if (this.categoryList.includes(cat)) {
          this.categoryChange(cat);
          handle(cat);
        }
      });
    });
  }

  categoryChange(category: string) {
    this.renderActiveCat(category);
  }

  renderActiveCat(category: string) {
    const elements = this.sideBarCats.querySelectorAll("li");
    elements.forEach((element) => {
      element.classList.remove("active-cat");
      const cat = [...element.classList].slice(0, 1)[0];
      if (category === cat) element.classList.add("active-cat");
    });
  }
}

export default new CategoryChange();
