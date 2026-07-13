class DetailsUI {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render(book, isPreview = false) {
    if (!book) {
      this.container.innerHTML = `<p class="empty-state">Book not found.</p>`;
      return;
    }

    const actionButtons = isPreview
      ? `<button class="btn-primary" data-action="add-to-library">+ Add to Library</button>`
      : `
        <button class="btn-primary" data-action="favorite">${book.favorite ? "Favorited" : "Favorite"}</button>
        <button class="btn-secondary" data-action="read">${book.read ? "Read" : "Mark Read"}</button>
        <button class="btn-muted" data-action="delete">Delete</button>
      `;
    const status = book.read ? "Read" : (isPreview ? "Preview" : "Currently Reading");
    const rating = book.rating ? Number(book.rating).toFixed(1) : "4.8";

    this.container.innerHTML = `
      <div class="details-left">
        ${book.cover ? `<img src="${book.cover}" class="details-cover" alt="${book.title} cover">` : `<div class="details-cover placeholder">${book.title}</div>`}
        <div class="details-buttons">${actionButtons}</div>
      </div>
      <div class="details-right">
        <section class="details-summary-card">
          <span class="rating-pill">&#9733; ${rating}</span>
          <h1>${book.title}</h1>
          <p class="details-author">by ${book.author}</p>
          <div class="details-meta-grid">
            <div><label>Status</label><strong class="status-pill">${status}</strong></div>
            <div><label>Added On</label><strong>Today</strong></div>
            <div><label>Format</label><strong>Digital</strong></div>
            <div><label>Shelf</label><strong>${book.genre || "General"}</strong></div>
          </div>
        </section>

        <section class="details-copy">
          <h2>Synopsis</h2>
          <p class="details-description">${book.description || "No description available."}</p>
        </section>

        <section class="details-facts">
          <div><span>Pages</span><strong>${book.pageCount || "Unknown"}</strong></div>
          <div><span>Language</span><strong>${book.language || "Unknown"}</strong></div>
          <div><span>Published</span><strong>${book.publishedYear || "Unknown"}</strong></div>
        </section>
        ${book.downloadLink ? `<a class="download-link" href="${book.downloadLink}" target="_blank">Download</a>` : ""}
      </div>
    `;
  }

  renderRecommendations(books) {
    const container = document.getElementById("recommended-books");
    let html = "";
    for (const book of books) {
      html += renderBookCard(book, {});
    }
    container.innerHTML = html || `<p>No recommendations available.</p>`;
  }
}
