import debounce from "./modules/Debounce.js";
import createDetailedBook from "./modules/CreateBook.js";
import searchBook from "./modules/Search.js";
import { renderBook, toggleModalVisibilty } from "./modules/Books.js";
let books = [];
const closeButton = document.querySelector(".close");
closeButton.addEventListener("click", () => {
    toggleModalVisibilty();
});
const fetchBooks = async () => {
    const baseUrl = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
    try {
        const response = await fetch(baseUrl);
        if (!response)
            throw new Error();
        const booksData = await response.json();
        books = booksData.map((book) => createDetailedBook(book));
        return books;
    }
    catch (err) {
        console.log(err);
    }
};
fetchBooks().then(() => renderBooks());
const renderBooks = () => {
    document.querySelector("h1").textContent = `${books.length} Classical Children Books`;
    const bookContainer = document.querySelector(".book-container");
    books.forEach((book) => {
        bookContainer.append(renderBook(book, "book"));
    });
    const searchInput = document.querySelector("input");
    searchInput.addEventListener("keydown", () => {
        debounce(() => searchBook(searchInput.value), 1000)();
    });
};
