let books = JSON.parse(localStorage.getItem("books")) || [ 
    {
    id: 1,
    title: "The Midnight Library",
    genre: "Contemporary Fantasy",
    author: "Matt Haig",
    rating: 4.3,
    read: true
  },
  {
    id: 2,
    title: "Dune",
    genre: "Science Fiction",
    author: "Frank Herbert",
    rating: 4.7,
    read: false
  },
  {
    id: 3,
    title: "Educated",
    genre: "Memoir",
    author: "Tara Westover",
    rating: 4.5,
    read: true
  },
  {
    id: 4,
    title: "The Night Circus",
    genre: "Fantasy",
    author: "Erin Morgenstern",
    rating: 4.2,
    read: false
  }
];

const bookListDiv = document.getElementById("book-list");
function renderBooks(bookArray = books) {
    let html = ""
    for (const book of bookArray) {
        html += `
        <div class= "book-card">
            <h3> ${book.title} </h3>
            <p>Author: ${book.author}</p>
            <p>Genre: ${book.genre}</p>
            <p>Rating: ${book.rating}</p>
            <p>Status: ${book.read ? "Read" : "Unread"}</p>
            <button class= "toggle-btn" data-id= "${book.id}">Mark as ${!(book.read) ? "Read" : "Unread"}</button>
            <button class= "delete-btn" data-id= "${book.id}">Delete</button>
        </div>
        `;
    };
    bookListDiv.innerHTML = html;
}
renderBooks();


const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBook = {
        id: books.length + 1,
        title: document.getElementById("title-input").value,
        genre: document.getElementById("genre-input").value,
        author: document.getElementById("author-input").value,
        rating: Number(document.getElementById("rating-input").value),
        read: false
    };

    books.push(newBook);
    saveAndUpdate();
    bookForm.reset();
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", updateView);

const sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", updateView);

bookListDiv.addEventListener("click", function(event) {
    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("toggle-btn")){
        const book = books.find(function(book){
            return book.id === id;
        });
        book.read = !book.read;
        saveAndUpdate();
    };
    if (event.target.classList.contains("delete-btn")){
        const bookIndex = books.findIndex(function(b) {return b.id === id});
        books.splice(bookIndex, 1);
        saveAndUpdate();
    }
});

function saveAndUpdate() {
    localStorage.setItem("books", JSON.stringify(books));
    updateView();
};

function updateView() {
    const query = searchInput.value.toLowerCase();

    let result = books.filter(function(book) {
        return book.author.toLocaleLowerCase().includes(query) || book.title.toLocaleLowerCase().includes(query);
    })

    const sortValue = document.getElementById("sort-select").value;
    if (sortValue === "rating-desc") {
        result.sort(function(a, b){return b.rating - a.rating;})
    } else if (sortValue === "title-asc") {
        result.sort(function(a, b){return a.title.localeCompare(b.title)});
    }

    renderBooks(result);
};

