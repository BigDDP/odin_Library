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

class Book {
    constructor(item) {
        this.title = item.title;
        this.content = item.content;
        this.author = item.author;
        this.pages = item.pages;
        this.status = item.status;
        this.UID = crypto.randomUUID();
    }

    setStatus(newStatus) {
        this.status = newStatus;
    }
};

const init = (() => {
    const table = document.querySelector("tbody");
    const form = document.querySelector("form");
    const bookBtn = document.getElementById("new_book");
    const popupElement = document.querySelector(".popup");

    bookBtn.addEventListener("click", () => {
        buildDOM.showPopup();
    });

    table.addEventListener("click", (e) => {
        const button = e.target.closest(".trash");
        if (!button) return;

        libraryController.myLibrary = libraryController.myLibrary.filter(book => book.UID !== button.id);

        console.log(libraryController.myLibrary);
        buildDOM.removeRow(button);
    });

    table.addEventListener("change", (e) => {
        const select = e.target.closest("select");
        if (!select) return;
        
        const book = libraryController.myLibrary.find(book => book.UID === select.dataset.id);

        console.log(libraryController.myLibrary);
        book.setStatus(select.value);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let item = {
            title: title.value, 
            author: author.value, 
            content: content.value, 
            pages: pages.value, 
            status: statuses.value
        };

        const book = new Book(item);
        libraryController.addBookToLibrary(book);

        form.reset();
        popupElement.setAttribute("class", "popup");
    });

    return {table, form, popupElement};
})();

const buildDOM = (() => {
    const addItemRow = (item) => {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        const cell6 = document.createElement("td");

        cell1.textContent = item.title;
        cell2.textContent = item.content;
        cell3.textContent = item.author;
        cell4.textContent = item.pages;
        cell5.innerHTML = `
            <select data-id="${item.UID}">
                <option value="">Select a value...</option>
                <option value="Reading" ${item.status === "Reading" ? "selected" : ""}>Reading</option>
                <option value="Completed" ${item.status === "Completed" ? "selected" : ""}>Completed</option>
                <option value="Dropped" ${item.status === "Dropped" ? "selected" : ""}>Dropped</option>
                <option value="Pending" ${item.status === "Pending" ? "selected" : ""}>Pending</option>
            </select>
        `;
        cell6.innerHTML = `<button class='trash' id='${item.UID}'>🗑️</button>`;

        init.table.appendChild(row);
        row.append(cell1, cell2, cell3, cell4, cell5, cell6);
    };

    const showPopup = () => {
        init.popupElement.setAttribute("class", "popup open");
    };

    const removeRow = (element) => {
        element.closest("tr").remove();
    };
    
    return { addItemRow, showPopup, removeRow };
})();

const libraryController = (() => {
    let myLibrary = [];

    const addBookToLibrary = (book) => {
        myLibrary.push(book);

        buildDOM.addItemRow(book)
    };

    array.forEach(item => {
        const book = new Book(item);
        addBookToLibrary(book);
    });

    return { addBookToLibrary, myLibrary};
})();