class GoogleBooksService {
  async search(query) {
    return this.fetchItems(query);
  }
  async searchBySubject(genre) {
    const cleanGenre = this.cleanGenre(genre);

    let items = await this.fetchItems(`subject:${cleanGenre}`);
    if (items.length === 0) {
      items = await this.fetchItems(cleanGenre);
    }
    return items;
  }

  cleanGenre(genre) {
    if (!genre) return "fiction";
    const firstPart = genre.split("--")[0];
    return firstPart.replace(/[^a-zA-Z\s]/g, "").trim() || "fiction";
  }

  async fetchItems(query) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${GOOGLE_BOOKS_API_KEY}`);
    const data = await response.json();
    if (!data.items) return [];

    return data.items.map(function(item) {
      const info = item.volumeInfo;
      return new Book({
        id: item.id,
        title: info.title || "Unknown title",
        author: info.authors ? info.authors.join(", ") : "Unknown author",
        genre: info.categories ? info.categories[0] : query,
        cover: info.imageLinks ? info.imageLinks.thumbnail : "",
        description: info.description || "",
        pageCount: info.pageCount || null,
        language: info.language || "",
        publishedYear: info.publishedDate ? info.publishedDate.slice(0, 4) : null,
        rating: 0,
        read: false,
        favorite: false
      });
    });
  }
}