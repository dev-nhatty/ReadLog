class GutendexService {
  async search(query) {
    const response = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    const data = await response.json();

    return data.results.map(function(item) {
      return new Book({
        id: item.id,
        title: item.title,
        author: item.authors.length ? item.authors.map(a => a.name).join(", ") : "Unknown author",
        genre: item.subjects.length ? item.subjects[0] : "Unknown",
        cover: item.formats["image/jpeg"] || "",
        subjects: item.subjects,
        downloadLink: item.formats["text/html"] || item.formats["application/epub+zip"] || "",
        rating: 0,
        read: false,
        favorite: false
      });
    });
  }
}