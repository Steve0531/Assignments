interface Expense {
    id: string;
    amount: number;
    date: string;
    category: Category;
    description: string;
}

enum Category {
    Food = "Food",
    Travel = "Travel",
    Bills = "Bills",
    Shopping = "Shopping"
}

const expenseForm = document.getElementById("expense-form") as HTMLFormElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const expenseList = document.getElementById("expense-list") as HTMLUListElement;
const totalExpensesDisplay = document.getElementById("total-expenses") as HTMLSpanElement;
const filterCategory = document.getElementById("filter-category") as HTMLSelectElement;

let expenses: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    const filteredExpenses = filterCategory.value === "All" ? expenses : expenses.filter(expense => expense.category === filterCategory.value);

    filteredExpenses.forEach(expense => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${expense.date} - <strong>${expense.category}</strong>: Rs${expense.amount} (${expense.description})
            <button onclick="deleteExpense('${expense.id}')">❌</button>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });

    totalExpensesDisplay.textContent = total.toString();
}

expenseForm.addEventListener("click", () => {
    
    const newExpense: Expense = {
        id: Date.now().toString(),
        amount: Number(amountInput.value),
        date: dateInput.value,
        category: categoryInput.value as Category,
        description: descriptionInput.value
    };

    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    amountInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";

    renderExpenses();
});

const deleteExpense = (id: string) => {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
};

filterCategory.addEventListener("change", renderExpenses);

renderExpenses();
