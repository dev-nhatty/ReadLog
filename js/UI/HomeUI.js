class HomeUI {
  renderStats(stats) {
    document.getElementById("stat-total").textContent = stats.total;
    document.getElementById("stat-read").textContent = stats.read;
    document.getElementById("stat-unread").textContent = stats.unread;
    document.getElementById("stat-rating").textContent = stats.avgRating;
    document.getElementById("goal-read").textContent = stats.read;
    document.getElementById("progress-total").textContent = stats.total;

    const percent = stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0;
    document.getElementById("progress-bar").style.width = `${percent}%`;
    document.getElementById("progress-text").textContent = stats.read >= 2 ? "You are building momentum. Keep it up!" : "Add a few reads to start your challenge.";
  }

  renderRecent(books) {
    const container = document.getElementById("recent-books");
    let html = "";
    for (const book of books) {
      html += renderBookCard(book, {});
    }
    container.innerHTML = html || `<p>No books yet.</p>`;
  }

  renderFavorites(books) {
    const container = document.getElementById("favorite-books");
    let html = "";
    for (const book of books) {
      html += renderBookCard(book, { showRating: true });
    }
    container.innerHTML = html || `<p>No favorites yet.</p>`;
  }
}
