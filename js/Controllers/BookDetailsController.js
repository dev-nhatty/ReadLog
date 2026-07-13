class BookDetailsController {
  constructor() {
    this.storage = new StorageService();
    const savedBooks = this.storage.get("books") || [];
    this.library = new Library(savedBooks);
    this.api = new GoogleBooksService();
    this.ui = new DetailsUI("details-container");

    const params = new URLSearchParams(window.location.search);
    this.isPreview = params.get("preview") === "true";
    this.bookId = Number(params.get("id"));

    this.render();
    this.bindEvents();
  }

  render() {
    if (this.isPreview) {
      const raw = sessionStorage.getItem("previewBook");
      this.book = raw ? new Book(JSON.parse(raw)) : null;
    } else {
      this.book = this.library.findById(this.bookId);
    }

    this.ui.render(this.book, this.isPreview);

    if (this.book) {
      this.loadRecommendations();
    }
  }

  async loadRecommendations() {
    try {
      const recs = await this.api.searchBySubject(this.book.genre);
      this.ui.renderRecommendations(recs.slice(0, 6));
    } catch (error) {
      console.error(error);
      this.ui.renderRecommendations([]);
    }
  }

  bindEvents() {
    document.getElementById("details-container").addEventListener("click", (event) => {
      const action = event.target.dataset.action;
      if (!action || !this.book) return;

      if (action === "add-to-library") {
        const newBook = new Book({ ...this.book, id: Date.now() });
        this.library.add(newBook);
        this.storage.set("books", this.library.getAll());
        sessionStorage.removeItem("previewBook");
        window.location.href = "library.html";
        return;
      }

      if (action === "favorite") {
        this.book.toggleFavorite();
      } else if (action === "read") {
        this.book.toggleRead();
      } else if (action === "delete") {
        this.library.remove(this.book.id);
        this.storage.set("books", this.library.getAll());
        window.location.href = "library.html";
        return;
      }

      this.storage.set("books", this.library.getAll());
      this.render();
    });
  }
}