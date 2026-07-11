class Book {
  constructor({ id, title, author, genre, rating, read, favorite, cover, subjects, description, pageCount, language, publishedYear, downloadLink }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.rating = rating;
    this.read = read || false;
    this.favorite = favorite || false;
    this.cover = cover || "";
    this.subjects = subjects || [];
    this.description = description || "";
    this.pageCount = pageCount || null;
    this.language = language || "";
    this.publishedYear = publishedYear || null;
    this.downloadLink = downloadLink || "";
  }

  toggleRead() {
    this.read = !this.read;
  }

  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  matches(query) {
    const q = query.toLowerCase();
    return this.title.toLowerCase().includes(q) || this.author.toLowerCase().includes(q);
  }
}