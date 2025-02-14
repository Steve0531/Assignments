// Enum for categories
var Category;
(function (Category) {
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Bills"] = "Bills";
    Category["Shopping"] = "Shopping";
})(Category || (Category = {}));
// UI Elements
var expenseForm = document.getElementById("expense-form");
var amountInput = document.getElementById("amount");
var dateInput = document.getElementById("date");
var categoryInput = document.getElementById("category");
var descriptionInput = document.getElementById("description");
var expenseList = document.getElementById("expense-list");
var totalExpensesDisplay = document.getElementById("total-expenses");
var filterCategory = document.getElementById("filter-category");
var expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
// Function to render expenses
function renderExpenses() {
    expenseList.innerHTML = "";
    var total = 0;
    var filteredExpenses = filterCategory.value === "All"
        ? expenses
        : expenses.filter(function (expense) { return expense.category === filterCategory.value; });
    filteredExpenses.forEach(function (expense) {
        var li = document.createElement("li");
        li.innerHTML = "\n            ".concat(expense.date, " - <strong>").concat(expense.category, "</strong>: \u20B9").concat(expense.amount, " (").concat(expense.description, ")\n            <button onclick=\"deleteExpense('").concat(expense.id, "')\">\u274C</button>\n        ");
        expenseList.appendChild(li);
        total += expense.amount;
    });
    totalExpensesDisplay.textContent = total.toString();
}
// Add Expense
expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var newExpense = {
        id: Date.now().toString(),
        amount: Number(amountInput.value),
        date: dateInput.value,
        category: categoryInput.value,
        description: descriptionInput.value
    };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    amountInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    renderExpenses();
});
// Delete Expense
window.deleteExpense = function (id) {
    expenses = expenses.filter(function (expense) { return expense.id !== id; });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
};
// Filter Expenses
filterCategory.addEventListener("change", renderExpenses);
// Initial render
renderExpenses();
