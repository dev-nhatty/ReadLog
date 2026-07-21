# 📚 ReadLog

A personal digital bookshelf for organizing, discovering, and tracking your reading journey — built as a learning project to practice vanilla JavaScript, object-oriented design, and working with external APIs.

---

## 🎥 Demo Video

[![Watch the ReadLog Demo](./assets/readlog-video-thumbnail.png)](https://github.com/dev-nhatty/ReadLog/releases/download/v2.0-vannila-js/readlog.demo.mp4)

*Click the image above to watch the full ReadLog demo video.*

---

## 📸 Screenshots

### Home Page

![Home Page](./screenshots/home-page.gif)

*The Home page provides a quick overview of the library, reading progress, and navigation to the main features.*

### Library Page

![Library Page](./screenshots/library.gif)

*The Library page allows users to add, search, filter, sort, and manage their book collection.*

### Discover Page

![Discover Page](./screenshots/discover-page.gif)

*The Discover page searches both Gutendex and Google Books APIs and allows books to be added directly to the library.*

### Book Details Page

![Book Details Page](./screenshots/book-details-page.gif)

*The Book Details page displays detailed information about a selected book, including recommendations based on genre.*

---

## ✨ Features

* **Track your library** — add books manually or from search, mark as read/unread, favorite, rate, and delete books.
* **Search two external book APIs at once** — Gutendex (Project Gutenberg's public domain catalog) and the Google Books API, merged into one result list.
* **Genre-based recommendations** on each book's details page.
* **Search, filter, and sort** your library by title, author, genre, read status, and favorites.
* **Persistent storage** — your library is saved locally in the browser via `localStorage`, with no backend required.
* **Preview unsaved search results** — view full details on a book before deciding to add it to your library.
* **Responsive design** across four pages: Home, Library, Discover, and Book Details.


## 🛠️ Tech Stack

Vanilla HTML, CSS, and JavaScript — no frameworks and no build step. This project was built deliberately with core web technologies to focus on JavaScript fundamentals, DOM manipulation, asynchronous programming, and object-oriented architecture rather than relying on a frontend framework.

---

## 🏗️ Architecture

The codebase is organized into four layers, each with a single responsibility:

```text
js/
├── domain/            # Book, Library — pure business logic
│                       # no knowledge of storage, the DOM, or APIs
├── infrastructure/     # StorageService, GutendexService,
│                       # GoogleBooksService — talk to the outside world
├── ui/                 # HomeUI, LibraryUI, DiscoverUI, DetailsUI,
│                       # renderBookCard — build HTML, nothing else
└── controllers/        # HomeController, LibraryController,
                        # DiscoverController, BookDetailsController —
                        # coordinate the other three layers
```

Controllers are the single point of coordination on each page: they run logic through `Library`, persist changes via `StorageService`, and trigger re-renders through the relevant UI class. No other layer talks to another layer directly — `Library` does not know `localStorage` exists, and UI classes never fetch data themselves.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dev-nhatty/ReadLog.git
cd ReadLog
```

### 2. Set up your Google Books API key

This key is required for search and recommendations to work. You can generate a free key from the Google Books API documentation.

```bash
cp js/config.example.js js/config.js
```

Then open `js/config.js` and replace the placeholder with your real key:

```javascript
const GOOGLE_BOOKS_API_KEY = "YOUR_API_KEY_HERE";
```

### 3. Run the project locally

This is a static website, so no build step or server framework is required. Open `index.html` directly in your browser, or use a simple local server such as the **Live Server** VS Code extension for the best experience.

---

## ⚠️ Project Scope

ReadLog is **not a production-ready application** and does not include user accounts, authentication, cloud storage, or personalized online access. All data is stored locally in the browser using `localStorage`, meaning each visitor sees only the data saved on their own device.

This project was created primarily as a **learning portfolio project** to demonstrate my current understanding of HTML, CSS, JavaScript, object-oriented design, DOM manipulation, local storage, and working with external APIs. It represents what I have learned so far and my ability to apply those concepts in a complete, multi-page web application.

---

## 👨‍💻 Author

**Natnael Tesfaye**

* GitHub: [@dev-nhatty](https://github.com/dev-nhatty)
* LinkedIn: [Natnael Tesfaye](https://www.linkedin.com/in/natnael-tesfaye-95b007375)

## 🌐 Hosted Site

[View ReadLog Live](https://readlog-natnael.netlify.app/)