class LibraryUI {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(books) {
    if (books.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state">
          <p>Your library is empty.</p>
          <button id="empty-add-btn">Add Your First Book</button>
        </div>
      `;
      return;
    }

    let html = "";
    for (const book of books) {
      html += renderBookCard(book, {
        showGenre: true,
        showRating: true,
        showStatusBadge: true,
        buttons: [
          { label: "View Details", action: "view", className: "btn-view" },
          { label: book.favorite ? "Unfavorite" : "Favorite", action: "favorite", className: "btn-favorite" },
          { label: "Delete", action: "delete", className: "btn-delete" }
        ]
      });
    }
    this.container.innerHTML = html;
  }

  renderStats(stats) {
    document.getElementById("library-total").textContent = stats.total;
    document.getElementById("library-reading").textContent = stats.unread;
  }
}
