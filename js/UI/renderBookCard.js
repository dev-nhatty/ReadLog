function renderStars(rating) {
  const rounded = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return "&#9733;".repeat(rounded) + "&#9734;".repeat(5 - rounded);
}

function renderBookCard(book, options = {}) {
  const {
    showGenre = false,
    showRating = false,
    showStatusBadge = false,
    showDescription = false,
    showSubjects = false,
    buttons = []
  } = options;

  const buttonsHtml = buttons.map(function(btn) {
    return `<button class="${btn.className}" data-action="${btn.action}" data-id="${book.id}">${btn.label}</button>`;
  }).join("");
  const safeSubjects = Array.isArray(book.subjects) ? book.subjects : [];

  return `
    <div class="book-card" data-id="${book.id}">
      ${showStatusBadge ? `<span class="badge ${book.read ? "badge-read" : "badge-unread"}">${book.read ? "Read" : "Unread"}</span>` : ""}
      <a class="book-cover-link" href="book-details.html?id=${book.id}">
        ${book.cover ? `<img src="${book.cover}" class="book-cover" alt="${book.title} cover">` : `<div class="book-cover placeholder">${book.title}</div>`}
      </a>
      <div class="book-card-body">
        ${showGenre ? `<p class="book-genre">${book.genre || "Fiction"}</p>` : ""}
        <h3><a href="book-details.html?id=${book.id}">${book.title}</a></h3>
        <p class="book-author">${book.author}</p>
        ${showRating ? `<p class="book-rating">${renderStars(book.rating)}</p>` : ""}
        ${showSubjects && safeSubjects.length ? `<div class="book-subjects">${safeSubjects.slice(0, 2).map(s => `<span class="tag">${s}</span>`).join("")}</div>` : ""}
        ${showDescription && book.description ? `<p class="book-description">${book.description.slice(0, 120)}...</p>` : ""}
      </div>
      <div class="book-actions">${buttonsHtml}</div>
    </div>
  `;
}
