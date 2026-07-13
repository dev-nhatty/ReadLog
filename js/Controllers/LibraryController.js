class LibraryController {
constructor() {
  this.storage = new StorageService();
  const savedBooks = this.storage.get("books") || [];
  this.library = new Library(savedBooks);
  this.ui = new LibraryUI("book-list");

  this.form = document.getElementById("book-form");
  this.searchInput = document.getElementById("search-input");
  this.sortSelect = document.getElementById("sort-select");
  this.favoritesFilter = document.getElementById("favorites-filter");
  this.genreFilter = document.getElementById("genre-filter");
  this.statusFilter = document.getElementById("status-filter");

  this.bindEvents();
  this.populateGenreFilter();
  this.updateView();
  this.bindStarRating();
}

populateGenreFilter() {
  const genres = [...new Set(this.library.getAll().map(b => b.genre).filter(Boolean))];
  this.genreFilter.innerHTML = `<option value="all">All Genres</option>` +
    genres.map(g => `<option value="${g}">${g}</option>`).join("");
}

  bindEvents() {
  this.form.addEventListener("submit", (event) => this.handleAddBook(event));
  this.searchInput.addEventListener("input", () => this.updateView());
  this.sortSelect.addEventListener("change", () => this.updateView());
  this.favoritesFilter.addEventListener("change", () => this.updateView());
  this.genreFilter.addEventListener("change", () => this.updateView());
  this.statusFilter.addEventListener("change", () => this.updateView());
  this.ui.container.addEventListener("click", (event) => this.handleCardClick(event));
 }

  handleAddBook(event) {
    event.preventDefault();
    const newBook = new Book({
      id: Date.now(),
      title: document.getElementById("title-input").value,
      author: document.getElementById("author-input").value,
      genre: document.getElementById("genre-input").value,
      rating: Number(document.getElementById("rating-input").value),
      read: false,
      favorite: false
    });
    this.library.add(newBook);
    this.persistAndUpdate();
    this.form.reset();
    this.form.reset();
    document.querySelectorAll("#star-picker span").forEach(s => s.classList.remove("filled"));
  }

  handleCardClick(event) {
    const action = event.target.dataset.action;
    const id = Number(event.target.dataset.id);
    if (!action) return;

    if (action === "delete") {
      this.library.remove(id);
      this.persistAndUpdate();
    } else if (action === "favorite") {
      const book = this.library.findById(id);
      book.toggleFavorite();
      this.persistAndUpdate();
    } else if (action === "view") {
      window.location.href = `book-details.html?id=${id}`;
    }
  }

  persistAndUpdate() {
    this.storage.set("books", this.library.getAll());
    this.updateView();
  }

  updateView() {
    this.ui.renderStats(this.library.getStats());
    let result = this.searchInput.value ? this.library.search(this.searchInput.value) : this.library.getAll();

    if (this.favoritesFilter.checked) {
        result = result.filter(function(book) { return book.favorite; });
    }
    if (this.genreFilter.value !== "all") {
        result = result.filter((book) => book.genre === this.genreFilter.value);
    }
    if (this.statusFilter.value === "read") {
        result = result.filter(function(book) { return book.read; });
    } else if (this.statusFilter.value === "unread") {
        result = result.filter(function(book) { return !book.read; });
    }

    result = this.library.sortBy(this.sortSelect.value, result);
    this.ui.render(result);
  }

  bindStarRating() {
    const stars = document.querySelectorAll("#star-picker span");
    const ratingInput = document.getElementById("rating-input");

    stars.forEach(function(star) {
      star.addEventListener("click", function() {
        const value = Number(star.dataset.value);
        ratingInput.value = value;
        stars.forEach(function(s) {
          s.classList.toggle("filled", Number(s.dataset.value) <= value);
        });
      });
    });
  }
}
