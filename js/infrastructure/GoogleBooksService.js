class GoogleBooksService {
  async searchBySubject(genre) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}`);
    const data = await response.json();

    if (!data.items) return [];

    return data.items.map(function(item) {
      const info = item.volumeInfo;
      return new Book({
        id: item.id,
        title: info.title || "Unknown title",
        author: info.authors ? info.authors.join(", ") : "Unknown author",
        genre: info.categories ? info.categories[0] : genre,
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