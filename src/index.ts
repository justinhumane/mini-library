import debounce from "./debounce.js";
import Book from "./interfaces/book";

let books: Book[] | undefined = [];

const closeButton: HTMLDivElement = document.querySelector(".close");
closeButton.addEventListener("click", () => {
  toggleModalVisibilty();
});

const fetchBooks = async (): Promise<void> => {
  const baseUrl: string = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
  try {
    const response: Response = await fetch(baseUrl);
    if (!response) throw new Error();
    books = await response.json();
  } catch (err) {
    console.log(err);
  }
};
fetchBooks().then(() => renderBooks());

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

const renderBook = (book: Book, style: string): HTMLDivElement => {
  const bookElement: HTMLDivElement = document.createElement("div");
  bookElement.classList.add(style);
  bookElement.style.background = `linear-gradient(208deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 92.13%), ${book.color}`;

  const bookText: HTMLDivElement = document.createElement("div");
  bookText.classList.add(`${style}-text`);

  const bookTitle: HTMLHeadingElement = document.createElement("h2");
  const bookAuthor: HTMLParagraphElement = document.createElement("p");
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookText.append(bookTitle, bookAuthor);

  bookElement.append(bookText);

  if (style === "book") {
    bookElement.addEventListener("click", () => {
      pushModalInfo(book);
    });
  }

  return bookElement;
};

const renderBookInfo = (book: Book): HTMLDivElement => {
  const detailsElement: HTMLDivElement = document.createElement("div");
  detailsElement.classList.add("details");

  // Details heading
  const detailsHeader: HTMLDivElement = document.createElement("div");
  const title: HTMLHeadingElement = document.createElement("h2");
  const author: HTMLParagraphElement = document.createElement("p");
  author.classList.add("author");
  title.textContent = book.title;
  author.textContent = `By ${book.author}`;
  detailsHeader.append(title, author);

  // Plot
  const plot: HTMLParagraphElement = document.createElement("p");
  plot.textContent = book.plot;

  // Info card
  const infoCard: HTMLDivElement = document.createElement("div");
  infoCard.classList.add("details-card");

  const audience: HTMLParagraphElement = document.createElement("p");
  const year: HTMLParagraphElement = document.createElement("p");
  const pages: HTMLParagraphElement = document.createElement("p");
  const publisher: HTMLParagraphElement = document.createElement("p");

  audience.innerHTML = `<strong>Audience:</strong> ${book.audience}`;
  year.innerHTML = `<strong>First published:</strong> ${book.year}`;
  if (book.pages === null) {
    pages.innerHTML = `<strong>Pages:</strong> Unknown`;
  } else {
    pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
  }
  publisher.innerHTML = `<strong>Publisher:</strong> ${book.publisher}`;

  infoCard.append(audience, year, pages, publisher);

  // Button
  const button: HTMLButtonElement = document.createElement("button");
  button.textContent = "Oh, I want to read it";

  detailsElement.append(detailsHeader, plot, infoCard, button);

  return detailsElement;
};

const pushModalInfo = (book: Book): void => {
  const modalBookContainer: HTMLDivElement = document.querySelector(".modal-book-container");
  while (modalBookContainer.lastElementChild) {
    modalBookContainer.removeChild(modalBookContainer.lastElementChild);
  }

  modalBookContainer.append(renderBook(book, "modal-book"), renderBookInfo(book));

  toggleModalVisibilty();
};

const toggleModalVisibilty = (): void => {
  const modal: HTMLDivElement = document.querySelector(".modal");
  modal.classList.toggle("hide");
};

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
