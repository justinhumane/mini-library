import debounce from "./debounce.js";
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
        books = await response.json();
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
const renderBook = (book, style) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add(style);
    bookElement.style.background = `linear-gradient(208deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 92.13%), ${book.color}`;
    const bookText = document.createElement("div");
    bookText.classList.add(`${style}-text`);
    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
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
const renderBookInfo = (book) => {
    const detailsElement = document.createElement("div");
    detailsElement.classList.add("details");
    // Details heading
    const detailsHeader = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    author.classList.add("author");
    title.textContent = book.title;
    author.textContent = `By ${book.author}`;
    detailsHeader.append(title, author);
    // Plot
    const plot = document.createElement("p");
    plot.textContent = book.plot;
    // Info card
    const infoCard = document.createElement("div");
    infoCard.classList.add("details-card");
    const audience = document.createElement("p");
    const year = document.createElement("p");
    const pages = document.createElement("p");
    const publisher = document.createElement("p");
    audience.innerHTML = `<strong>Audience:</strong> ${book.audience}`;
    year.innerHTML = `<strong>First published:</strong> ${book.year}`;
    if (book.pages === null) {
        pages.innerHTML = `<strong>Pages:</strong> Unknown`;
    }
    else {
        pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
    }
    publisher.innerHTML = `<strong>Publisher:</strong> ${book.publisher}`;
    infoCard.append(audience, year, pages, publisher);
    // Button
    const button = document.createElement("button");
    button.textContent = "Oh, I want to read it";
    detailsElement.append(detailsHeader, plot, infoCard, button);
    return detailsElement;
};
const pushModalInfo = (book) => {
    const modalBookContainer = document.querySelector(".modal-book-container");
    while (modalBookContainer.lastElementChild) {
        modalBookContainer.removeChild(modalBookContainer.lastElementChild);
    }
    modalBookContainer.append(renderBook(book, "modal-book"), renderBookInfo(book));
    toggleModalVisibilty();
};
const toggleModalVisibilty = () => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("hide");
};
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
