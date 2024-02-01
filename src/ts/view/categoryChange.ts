class CategoryChange {
  pendingTasksCat = document.querySelector("#pendingTasksCat") as HTMLLIElement;
  finishedTasksCat = document.querySelector(
    "#finishedTasksCat"
  ) as HTMLLIElement;
  binTasksCat = document.querySelector("#binTasksCat") as HTMLLIElement;

  pending = document.querySelector("#pendingTasks") as HTMLDivElement;
  finished = document.querySelector("#finishedTasks") as HTMLDivElement;
  bin = document.querySelector("#moveToBin") as HTMLDivElement;

  handleCategoryChange(handle: (cat: string) => void) {
    [
      { element: this.pending, category: "pending" },
      { element: this.finished, category: "finished" },
      { element: this.bin, category: "bin" },
    ].forEach((obj) =>
      obj.element.addEventListener("click", () => {
        this.categoryChange(obj.category);
        handle(obj.category);
      })
    );

    [
      { element: this.pendingTasksCat, category: "pending" },
      { element: this.finishedTasksCat, category: "finished" },
      { element: this.binTasksCat, category: "bin" },
    ].forEach((obj) =>
      obj.element.addEventListener("click", () => {
        this.categoryChange(obj.category);
        handle(obj.category);
      })
    );
  }

  categoryChange(category: string) {
    this.renderActiveCat(category);
  }

  renderActiveCat(category: string) {
    [
      { element: this.pending, category: "pending" },
      { element: this.finished, category: "finished" },
      { element: this.bin, category: "bin" },
    ].forEach((obj) => {
      obj.element.classList.remove("active-cat");
      if (category === obj.category) obj.element.classList.add("active-cat");
    });
  }
}

export default new CategoryChange();
