import debounce from "./modules/Debounce.js";
import createDetailedBook from "./modules/CreateBook.js";
import searchBook from "./modules/Search.js";
import { renderBook, toggleModalVisibilty } from "./modules/Books.js";
import { Book, DetailedBook } from "./interfaces/Book";

let books: DetailedBook[] | undefined = [];

const closeButton: HTMLDivElement = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  toggleModalVisibilty();
});

const fetchBooks = async (): Promise<DetailedBook[]> => {
  const baseUrl: string = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
  try {
    const response: Response = await fetch(baseUrl);
    if (!response) throw new Error();
    const booksData: Book[] = await response.json();

    books = booksData.map((book) => createDetailedBook(book));

    return books;
  } catch (err) {
    console.log(err);
  }
};

const renderBooks = (): void => {
  document.querySelector("h1").textContent = `${books.length} Classical Children Books`;

  const bookContainer: HTMLDivElement = document.querySelector(".book-container");
  books.forEach((book) => {
    bookContainer.append(renderBook(book, "book"));
  });

  const searchInput: HTMLInputElement = document.querySelector("input");
  searchInput.addEventListener("keydown", () => {
    debounce(() => searchBook(searchInput.value), 1000)();
  });
};

fetchBooks().then(() => renderBooks());

export { books };
