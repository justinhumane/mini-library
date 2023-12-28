import { books } from "../index.js";

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

  const hiddenBooks: number = document.getElementsByClassName("book hide").length;
  document.querySelector("h1").textContent = `${books.length - hiddenBooks} Classical Children Books`;
};

export default searchBook;
