const renderBook = (book, style) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add(style);
    bookElement.style.backgroundColor = book.color;
    for (const key in book) {
        if (book[key].showOnBook) {
            const subElement = document.createElement(book[key].elementType);
            subElement.textContent = book[key].value;
            bookElement.append(subElement);
        }
    }
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
    const details = {
        header: document.createElement("div"),
        plot: document.createElement("p"),
        info: document.createElement("div"),
        button: document.createElement("button"),
    };
    details.info.classList.add("details-card");
    details.button.textContent = "Oh, I want to read it";
    for (const key in book) {
        if (book[key].elementType) {
            const subElement = document.createElement(book[key].elementType);
            const value = book[key].value === null ? "Unknown" : String(book[key].value);
            const content = book[key].prefix
                ? `${key === "author" ? `${book[key].prefix} ${value}` : `<strong>${book[key].prefix}</strong> ${value}`}`
                : value;
            subElement.innerHTML = content;
            const detailsSection = details[book[key].detailType];
            detailsSection.append(subElement);
        }
    }
    for (const key in details) {
        detailsElement.append(details[key]);
    }
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
export { renderBook, toggleModalVisibilty };
