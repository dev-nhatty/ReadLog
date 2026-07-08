let books = [ 
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
        </div>
        `;
    };
    bookListDiv.innerHTML = html;
}
renderBooks();


const bookForm = document.getElementById("book-form");

addEventListener("submit", function(event) {
    event.preventDefault();

    const newBook = {
        id: books.length + 1,
        title: document.getElementById("title-input").value,
        genre: document.getElementById("genre-input").value,
        author: document.getElementById("author-input").value,
        rating: document.getElementById("rating-input").value,
        read: false
    };

    books.push(newBook);
    renderBooks();
    bookForm.reset();
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();

    let filteredBooks = [];
    for (const book of books) {
        if (book.author.toLowerCase().includes(query) || book.title.toLowerCase().includes(query)){
            filteredBooks.push(book);
        }
    }
    renderBooks(filteredBooks);
})