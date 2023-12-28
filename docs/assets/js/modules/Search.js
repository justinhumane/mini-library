import { books } from "../index.js";
const searchBook = (keyword) => {
    const bookElements = document.querySelectorAll(".book");
    bookElements.forEach((bookElement) => {
        const bookTitle = bookElement.firstChild.firstChild.textContent.toLowerCase();
        if (!bookTitle.includes(keyword.toLowerCase())) {
            bookElement.classList.add("hide");
        }
        else {
            bookElement.classList.remove("hide");
        }
    });
    const hiddenBooks = document.getElementsByClassName("book hide").length;
    document.querySelector("h1").textContent = `${books.length - hiddenBooks} Classical Children Books`;
};
export default searchBook;
