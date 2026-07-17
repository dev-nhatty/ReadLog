class DiscoverController {
  constructor() {
    this.storage = new StorageService();
    const savedBooks = this.storage.get("books") || [];
    this.library = new Library(savedBooks);
    this.gutendex = new GutendexService();
    this.googleBooks = new GoogleBooksService();
    this.ui = new DiscoverUI("search-results");

    this.searchInput = document.getElementById("google-search-input");
    this.searchBtn = document.getElementById("google-search-btn");
    this.lastResults = [];

    this.bindEvents();
    this.loadStarterBooks();
  }


  bindEvents() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.ui.container.addEventListener("click", (event) => this.handleResultClick(event));

    document.querySelectorAll(".trending-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        this.searchInput.value = tag.dataset.query;
        this.handleTopicSearch(tag.dataset.query);
      });
    });
  }

  async handleSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    this.ui.showLoading();

    const [gutendexResult, googleResult] = await Promise.allSettled([
      this.gutendex.search(query),
      this.googleBooks.search(query)
    ]);

    const gutendexBooks = gutendexResult.status === "fulfilled" ? gutendexResult.value : [];
    const googleBooks = googleResult.status === "fulfilled" ? googleResult.value : [];

    if (gutendexResult.status === "rejected") console.error("Gutendex failed:", gutendexResult.reason);
    if (googleResult.status === "rejected") console.error("Google Books failed:", googleResult.reason);

    this.lastResults = [...gutendexBooks, ...googleBooks];

    if (this.lastResults.length === 0 && gutendexResult.status === "rejected" && googleResult.status === "rejected") {
      this.ui.container.innerHTML = `<p class="empty-state">Something went wrong — try again.</p>`;
      return;
    }

    this.ui.render(this.lastResults);
  }

  bindEvents() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.ui.container.addEventListener("click", (event) => this.handleResultClick(event));

    document.querySelectorAll(".trending-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        this.searchInput.value = tag.dataset.query;
        this.handleTopicSearch(tag.dataset.query);
      });
    });
  }

async handleTopicSearch(topic) {
    this.ui.showLoading();

    const [gutendexResult, googleResult] = await Promise.allSettled([
      this.gutendex.searchByTopic(topic),
      this.googleBooks.searchBySubject(topic)
    ]);

    const gutendexBooks = gutendexResult.status === "fulfilled" ? gutendexResult.value : [];
    const googleBooks = googleResult.status === "fulfilled" ? googleResult.value : [];

    if (gutendexResult.status === "rejected") console.error("Gutendex failed:", gutendexResult.reason);
    if (googleResult.status === "rejected") console.error("Google Books failed:", googleResult.reason);

    this.lastResults = [...gutendexBooks, ...googleBooks];
    this.ui.render(this.lastResults);
  }

  async loadStarterBooks() {
    this.ui.showLoading();
    try {
      this.lastResults = await this.gutendex.getRandomBooks(4);
      this.ui.render(this.lastResults);
    } catch (error) {
      console.error(error);
      this.ui.container.innerHTML = `<p class="empty-state">Couldn't load books right now.</p>`;
    }
  }

  handleResultClick(event) {
    const action = event.target.dataset.action;
    if (!action) return;

    const externalId = event.target.dataset.id;
    const found = this.lastResults.find(function(b) { return String(b.id) === externalId; });
    if (!found) return;

    if (action === "view") {
      sessionStorage.setItem("previewBook", JSON.stringify(found));
      window.location.href = "book-details.html?preview=true";
      return;
    }

    if (action === "add") {
      const newBook = new Book({ ...found, id: Date.now() });
      this.library.add(newBook);
      this.storage.set("books", this.library.getAll());
      event.target.textContent = "Added ✓";
      event.target.disabled = true;
    }
  }
}
