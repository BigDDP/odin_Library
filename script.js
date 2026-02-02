let array = [
  {
    title: "The Silent Path",
    content: "A monk seeks truth in a world of noise.",
    author: "Lena Moore"
  },
  {
    title: "Iron Skies",
    content: "Pilots fight for survival above a broken Earth.",
    author: "Caleb Wright"
  },
  {
    title: "Midnight Library",
    content: "Every book reveals a life that might have been.",
    author: "Nora James"
  },
  {
    title: "Glass Hearts",
    content: "Love and lies collide in a fragile city.",
    author: "Amira Cole"
  },
  {
    title: "The Last Signal",
    content: "A final message changes humanity forever.",
    author: "Evan Cross"
  }
];

const table = document.querySelector("tbody");

const myLibrary = [];

function Book(title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.UID = crypto.randomUUID();
};

function addBookToLibrary() {
    array.forEach(item => {
        const book = Book(item.title, item.content, item.author);

        myLibrary.push(book);

        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");

        cell1.textContent = item.title;
        cell2.textContent = item.content;
        cell3.textContent = item.author;

        table.appendChild(row);
        row.append(cell1, cell2, cell3);
    });
}

addBookToLibrary();

console.log(myLibrary);