"use strict";

const STORAGE_KEY = "expenseFlowRecords";

const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("expenseTitle");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("expenseDate");
const notesInput = document.getElementById("notes");

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEdit");
const formStatus = document.getElementById("formStatus");

const expenseList = document.getElementById("expenseList");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const sortBy = document.getElementById("sortBy");

const totalExpense = document.getElementById("totalExpense");
const totalCount = document.getElementById("totalCount");
const highestExpense = document.getElementById("highestExpense");
const filteredTotal = document.getElementById("filteredTotal");
const recordCount = document.getElementById("recordCount");

let expenses = loadExpenses();
let editingId = null;

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2
});

const categoryIcons = {
  Food: "🍜",
  Shopping: "🛍️",
  Transport: "🚕",
  Entertainment: "🎬",
  Bills: "🧾",
  Health: "💊",
  Education: "📚",
  Other: "📌"
};

function formatMoney(value) {
  return currency.format(value);
}

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function loadExpenses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) =>
      item &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      Number.isFinite(Number(item.amount)) &&
      Number(item.amount) > 0 &&
      typeof item.category === "string" &&
      typeof item.date === "string"
    ).map((item) => ({
      id: item.id,
      title: item.title,
      amount: Number(item.amount),
      category: item.category,
      date: item.date,
      notes: typeof item.notes === "string" ? item.notes : ""
    }));
  } catch (error) {
    console.error("Could not read saved expenses:", error);
    return [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error("Could not save expenses:", error);
    showStatus("Could not save data in this browser.", true);
    return false;
  }
}

function showStatus(message, isError = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("error", isError);
}

function resetForm() {
  form.reset();
  dateInput.value = localDateString();
  editingId = null;
  formTitle.textContent = "Add an expense";
  submitBtn.textContent = "Save Expense";
  cancelEditBtn.hidden = true;
}

function getFilteredExpenses() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = filterCategory.value;

  const result = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.notes.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  switch (sortBy.value) {
    case "oldest":
      result.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "high":
      result.sort((a, b) => b.amount - a.amount);
      break;
    case "low":
      result.sort((a, b) => a.amount - b.amount);
      break;
    case "az":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      result.sort((a, b) =>
        b.date.localeCompare(a.date) || b.id.localeCompare(a.id)
      );
  }

  return result;
}

function renderSummary() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const highest = expenses.reduce(
    (max, item) => Math.max(max, item.amount), 0
  );

  totalExpense.textContent = formatMoney(total);
  totalCount.textContent = String(expenses.length);
  highestExpense.textContent = formatMoney(highest);
}

function renderExpenses() {
  const visibleExpenses = getFilteredExpenses();

  expenseList.replaceChildren();

  if (visibleExpenses.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = expenses.length
      ? "No expenses match your search or filters."
      : "No expenses yet. Add your first transaction!";
    expenseList.appendChild(empty);
  } else {
    visibleExpenses.forEach((expense) => {
      const item = document.createElement("article");
      item.className = "expense-item";

      const icon = document.createElement("div");
      icon.className = "category-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = categoryIcons[expense.category] || "📌";

      const info = document.createElement("div");
      info.className = "expense-info";

      const title = document.createElement("h3");
      title.textContent = expense.title;

      const meta = document.createElement("div");
      meta.className = "expense-meta";
      meta.textContent = `${expense.category} · ${expense.date}${
        expense.notes ? " · " + expense.notes : ""
      }`;

      info.append(title, meta);

      const amount = document.createElement("div");
      amount.className = "expense-amount";
      amount.textContent = formatMoney(expense.amount);

      const actions = document.createElement("div");
      actions.className = "expense-actions";

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "icon-btn";
      editButton.textContent = "Edit";
      editButton.setAttribute("aria-label", `Edit ${expense.title}`);
      editButton.addEventListener("click", () => startEdit(expense.id));

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "icon-btn delete-btn";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", `Delete ${expense.title}`);
      deleteButton.addEventListener("click", () => deleteExpense(expense.id));

      actions.append(editButton, deleteButton);
      item.append(icon, info, amount, actions);
      expenseList.appendChild(item);
    });
  }

  const visibleTotal = visibleExpenses.reduce(
    (sum, expense) => sum + expense.amount, 0
  );

  filteredTotal.textContent = formatMoney(visibleTotal);
  recordCount.textContent =
    `${visibleExpenses.length} ${
      visibleExpenses.length === 1 ? "record" : "records"
    }`;
}

function render() {
  renderSummary();
  renderExpenses();
}

function startEdit(id) {
  const expense = expenses.find((item) => item.id === id);
  if (!expense) return;

  editingId = id;
  titleInput.value = expense.title;
  amountInput.value = String(expense.amount);
  categoryInput.value = expense.category;
  dateInput.value = expense.date;
  notesInput.value = expense.notes;

  formTitle.textContent = "Edit expense";
  submitBtn.textContent = "Update Expense";
  cancelEditBtn.hidden = false;
  showStatus("Editing selected expense.");
  titleInput.focus();

  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteExpense(id) {
  const expense = expenses.find((item) => item.id === id);
  if (!expense) return;

  if (!window.confirm(`Delete "${expense.title}"?`)) return;

  const previous = expenses;
  expenses = expenses.filter((item) => item.id !== id);

  if (!saveExpenses()) {
    expenses = previous;
    render();
    return;
  }

  if (editingId === id) resetForm();

  showStatus("Expense deleted successfully.");
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const date = dateInput.value;
  const notes = notesInput.value.trim();

  if (title.length < 2 || title.length > 80) {
    showStatus("Expense name must contain 2–80 characters.", true);
    titleInput.focus();
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000000) {
    showStatus("Enter a valid amount greater than ₹0.", true);
    amountInput.focus();
    return;
  }

  if (!Object.hasOwn(categoryIcons, category)) {
    showStatus("Please select a valid category.", true);
    categoryInput.focus();
    return;
  }

  if (!date || date > localDateString()) {
    showStatus("Please select a valid date that is not in the future.", true);
    dateInput.focus();
    return;
  }

  if (notes.length > 300) {
    showStatus("Notes must be 300 characters or fewer.", true);
    notesInput.focus();
    return;
  }

  const expenseData = { title, amount, category, date, notes };
  const previous = expenses;

  if (editingId) {
    expenses = expenses.map((item) =>
      item.id === editingId ? { ...item, ...expenseData } : item
    );
  } else {
    expenses.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      ...expenseData
    });
  }

  if (!saveExpenses()) {
    expenses = previous;
    render();
    return;
  }

  resetForm();
  showStatus(editingId
    ? "Expense updated successfully."
    : "Expense added successfully.");

  render();
});

cancelEditBtn.addEventListener("click", () => {
  resetForm();
  showStatus("Edit cancelled.");
});

[searchInput, filterCategory, sortBy].forEach((control) => {
  control.addEventListener("input", renderExpenses);
  control.addEventListener("change", renderExpenses);
});

document.getElementById("todayDate").textContent =
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date());

dateInput.max = localDateString();
resetForm();
render();
