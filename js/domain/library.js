class Library {
  constructor(bookDataArray = []) {
    this.books = bookDataArray.map(function(data) {
      return new Book(data);
    });
  }

  getAll() {
    return this.books;
  }

  add(book) {
    this.books.push(book);
  }

  remove(id) {
    const bookIndex = this.books.findIndex(function(b){return b.id === id;});
    this.books.splice(bookIndex, 1);
  }

  findById(id) {
    return this.books.find(function(b){return b.id === id;});
  }

  search(query) {
    let result = [];
    for(const book of this.books){
        if (book.matches(query)){
            result.push(book);
        }
    }; return result;
  }

  sortBy(criteria) {
    let sortedCopy = [...this.books];
    if (criteria === "rating-desc") {
        sortedCopy.sort(function(a, b){return b.rating - a.rating})
    } else if (criteria === "title-asc") {
        sortedCopy.sort(function(a, b){return a.title.localeCompare(b.title);})
    }
    return sortedCopy;
  }

  getFavorites() {
    let favoriteBooks = [];
    for (const book of this.books) {
        if(book.favorite){
            favoriteBooks.push(book);
        }
    }
    return favoriteBooks;
  }

  getStats() {

    let totalCount = this.books.length;

    if (totalCount === 0) {
        return {total: 0, read: 0, unread: 0, avgRating: 0};
    };
    let readCount = 0;
    let totalRating = 0;
    let ratedBooksCount = 0;
    for (const book of this.books) {
        if (book.read) {
            readCount++
        }

        if (book.rating && typeof book.rating === "number" && book.rating > 0){
            totalRating += book.rating;
            ratedBooksCount++;
        }
    };

    const avgRating = ratedBooksCount > 0 ? Number(totalRating / ratedBooksCount).toFixed(2) : 0;

    return {total: totalCount, read: readCount, unread: totalCount - readCount, avgRating: avgRating};
  }
}