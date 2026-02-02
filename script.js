const array = [
    {
        title: "The Silent Path",
        content: "A monk seeks truth in a world of noise.",
        author: "Lena Moore",
        pages: 210,
        status: "Completed"
    },
    {
        title: "Iron Skies",
        content: "Pilots fight for survival above a broken Earth.",
        author: "Caleb Wright",
        pages: 340,
        status: "Reading"
    },
    {
        title: "Midnight Library",
        content: "Every book reveals a life that might have been.",
        author: "Nora James",
        pages: 280,
        status: "Pending"
    },
    {
        title: "Glass Hearts",
        content: "Love and lies collide in a fragile city.",
        author: "Amira Cole",
        pages: 195,
        status: "Dropped"
    },
    {
        title: "The Last Signal",
        content: "A final message changes humanity forever.",
        author: "Evan Cross",
        pages: 320,
        status: "Reading"
    }
];

const table = document.querySelector("tbody");
const form = document.querySelector("form");
const bookBtn = document.getElementById("new_book");
const popupElement = document.querySelector(".popup");

let myLibrary = [];

bookBtn.addEventListener("click", () => {
    popupElement.setAttribute("class", "popup open");
});

function Book(title, content, author, pages, status) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.UID = crypto.randomUUID();
};

Book.prototype.setStatus = function (newStatus) {
    this.status = newStatus;
};

function initialLoad() {
    array.forEach(item => {
        const book = new Book(item.title, item.content, item.author, item.pages, item.status);

        addBookToLibrary(book);
    });
};

initialLoad();

function addBookToLibrary(book) {
    myLibrary.push(book);

    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    const cell5 = document.createElement("td");
    const cell6 = document.createElement("td");

    cell1.textContent = book.title;
    cell2.textContent = book.content;
    cell3.textContent = book.author;
    cell4.textContent = book.pages;
    cell5.innerHTML = `
        <select data-id="${book.UID}">
            <option value="">Select a value...</option>
            <option value="Reading" ${book.status === "Reading" ? "selected" : ""}>Reading</option>
            <option value="Completed" ${book.status === "Completed" ? "selected" : ""}>Completed</option>
            <option value="Dropped" ${book.status === "Dropped" ? "selected" : ""}>Dropped</option>
            <option value="Pending" ${book.status === "Pending" ? "selected" : ""}>Pending</option>
        </select>
    `;
    cell6.innerHTML = `<button class='trash' id='${book.UID}'>🗑️</button>`;

    table.appendChild(row);
    row.append(cell1, cell2, cell3, cell4, cell5, cell6);
}

table.addEventListener("click", (e) => {
        const button = e.target.closest(".trash");
        if (!button) return;
        
        myLibrary = myLibrary.filter(book => book.UID !== button.id);

        button.closest("tr").remove();
    });

table.addEventListener("change", (e) => {
    const select = e.target.closest("select");
    if (!select) return;
    
    const book = myLibrary.find(book => book.UID === select.dataset.id);

    book.setStatus(select.value);

    console.log(myLibrary)
});

form.addEventListener("submit", () => {
    event.preventDefault();

    const book = new Book(title.value, author.value, content.value, pages.value, statuses.value);
    addBookToLibrary(book);

    form.reset();
    popupElement.setAttribute("class", "popup");
});

