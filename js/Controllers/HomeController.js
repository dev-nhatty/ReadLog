class HomeController {
  constructor() {
    const storage = new StorageService();
    const savedBooks = storage.get("books") || [];
    this.library = new Library(savedBooks);
    this.ui = new HomeUI();

    this.render();
  }

  render() {
    this.ui.renderStats(this.library.getStats());

    const recent = [...this.library.getAll()]
      .sort(function(a, b) { return b.id - a.id; })
      .slice(0, 5);
    this.ui.renderRecent(recent);

    this.ui.renderFavorites(this.library.getFavorites());
  }
}