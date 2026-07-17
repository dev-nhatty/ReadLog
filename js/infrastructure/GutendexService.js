class GutendexService {
  mapToBook(item) {
    return new Book({
      id: item.id,
      title: item.title,
      author: item.authors.length ? item.authors.map(a => a.name).join(", ") : "Unknown author",
      genre: item.subjects.length ? item.subjects[0] : "Unknown",
      cover: item.formats["image/jpeg"] || "",
      subjects: item.subjects,
      description: item.summaries && item.summaries.length ? item.summaries[0] : "",
      downloadLink: item.formats["text/html"] || item.formats["application/epub+zip"] || "",
      rating: 0,
      read: false,
      favorite: false
    });
  }

  async search(query) {
    const response = await fetch(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results.map((item) => this.mapToBook(item));
  }

  async searchByTopic(topic) {
    const response = await fetch(`https://gutendex.com/books?topic=${encodeURIComponent(topic)}`);
    const data = await response.json();
    return data.results.map((item) => this.mapToBook(item));
  }

  async getRandomBooks(count = 4) {
    const randomPage = Math.floor(Math.random() * 300) + 1;
    const response = await fetch(`https://gutendex.com/books?page=${randomPage}`);
    const data = await response.json();
    const shuffled = [...data.results].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((item) => this.mapToBook(item));
  }
}