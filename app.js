// Catálogo de livros — CRUD com dados no localStorage do browser.

const STORAGE_KEY = "git-class-pages.books";

const STATUS_LABELS = { "por-ler": "Por ler", "lido": "Lido" };

// --- Dados -----------------------------------------------------------

function loadBooks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

let books = loadBooks();

// --- Elementos -------------------------------------------------------

const form = document.getElementById("book-form");
const formTitle = document.getElementById("form-title");
const idInput = document.getElementById("book-id");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const statusInput = document.getElementById("status");
const ratingInput = document.getElementById("rating");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const list = document.getElementById("book-list");
const empty = document.getElementById("empty");
const count = document.getElementById("count");

// --- Render ----------------------------------------------------------

function cell(text) {
  const td = document.createElement("td");
  td.textContent = text; // textContent: o texto do utilizador nunca é interpretado como HTML
  return td;
}

function button(label, className, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.className = className;
  btn.addEventListener("click", onClick);
  return btn;
}

function render() {
  list.replaceChildren();

  for (const book of books) {
    const tr = document.createElement("tr");
    tr.append(
      cell(book.title),
      cell(book.author),
      cell(STATUS_LABELS[book.status]),
      cell(book.rating ? "★".repeat(book.rating) : "—")
    );

    const actions = document.createElement("td");
    actions.className = "row-actions";
    actions.append(
      button("Editar", "small secondary", () => startEdit(book.id)),
      button("Apagar", "small danger", () => removeBook(book.id))
    );
    tr.append(actions);
    list.append(tr);
  }

  empty.hidden = books.length > 0;
  count.textContent = books.length ? `(${books.length})` : "";
}

// --- Ações -----------------------------------------------------------

function resetForm() {
  form.reset();
  idInput.value = "";
  formTitle.textContent = "Novo livro";
  saveBtn.textContent = "Adicionar";
  cancelBtn.hidden = true;
}

function startEdit(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;
  idInput.value = book.id;
  titleInput.value = book.title;
  authorInput.value = book.author;
  statusInput.value = book.status;
  ratingInput.value = book.rating ?? "";
  formTitle.textContent = "Editar livro";
  saveBtn.textContent = "Guardar";
  cancelBtn.hidden = false;
  titleInput.focus();
}

function removeBook(id) {
  books = books.filter((b) => b.id !== id);
  saveBooks(books);
  if (idInput.value === id) resetForm();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    status: statusInput.value,
    rating: ratingInput.value ? Number(ratingInput.value) : null,
  };
  if (!data.title || !data.author) return;

  const id = idInput.value;
  if (id) {
    books = books.map((b) => (b.id === id ? { ...b, ...data } : b));
  } else {
    books.push({ id: crypto.randomUUID(), ...data });
  }

  saveBooks(books);
  resetForm();
  render();
});

cancelBtn.addEventListener("click", resetForm);

render();
