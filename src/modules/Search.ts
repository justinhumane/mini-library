const searchBook = (keyword: string): void => {
  const bookElements: NodeListOf<HTMLElement> = document.querySelectorAll(".book");

  bookElements.forEach((bookElement) => {
    const bookTitle: string = bookElement.firstChild.firstChild.textContent.toLowerCase();
    if (!bookTitle.includes(keyword.toLowerCase())) {
      bookElement.classList.add("hide");
    } else {
      bookElement.classList.remove("hide");
    }
  });
};

export default searchBook;
