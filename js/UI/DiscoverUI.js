class DiscoverUI {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  showLoading() {
    this.container.innerHTML = `<p class="loading">Searching books...</p>`;
  }

  render(books) {
    if (books.length === 0) {
      this.container.innerHTML = `<p class="empty-state">No books found.</p>`;
      return;
    }

    let html = "";
    for (const book of books) {
      html += renderBookCard(book, {
        showSubjects: true,
        showDescription: true,
        buttons: [
          { label: "View Details", action: "view", className: "btn-view" },
          { label: "Add to Library", action: "add", className: "btn-add" }
        ]
      });
    }
    this.container.innerHTML = html;
  }
}