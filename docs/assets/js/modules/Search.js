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
};
export default searchBook;
