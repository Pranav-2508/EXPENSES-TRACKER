// Selecting elements from the DOM
const balanceElement = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const paymentModeSelect = document.getElementById('paymentMode');
const addExpenseButton = document.getElementById('addExpense');
const addIncomeButton = document.getElementById('addIncome');
const expensesTable = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];

// Initialize balance
let currentBalance = 0.00;

// Function to update the balance display
function updateBalance(amount, type) {
    if (type === 'expense') {
        currentBalance -= parseFloat(amount);
    } else if (type === 'income') {
        currentBalance += parseFloat(amount);
    }
    balanceElement.textContent = '$' + currentBalance.toFixed(2);
}

// Function to add a new row to the expenses table
function addExpenseRow(date, description, amount, paymentMode) {
    const newRow = expensesTable.insertRow();
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${paymentMode}</td>
        <td><button class="delete-button">Delete</button></td>
    `;

    // Adding delete functionality to the newly added row
    const deleteButton = newRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        currentBalance += parseFloat(amount);
        balanceElement.textContent = '$' + currentBalance.toFixed(2);
        newRow.remove();
    });
}

// Event listener for adding expense
addExpenseButton.addEventListener('click', function() {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount)) {
        const paymentMode = paymentModeSelect.value;
        const date = new Date().toLocaleDateString();
        addExpenseRow(date, 'Expense', amount, paymentMode);
        updateBalance(amount, 'expense');
        amountInput.value = '';
    } else {
        alert('Please enter a valid amount.');
    }
});

// Event listener for adding income
addIncomeButton.addEventListener('click', function() {
    const amount = parseFloat(amountInput.value);
    if (!isNaN(amount)) {
        const paymentMode = paymentModeSelect.value;
        const date = new Date().toLocaleDateString();
        addExpenseRow(date, 'Income', amount, paymentMode);
        updateBalance(amount, 'income');
        amountInput.value = '';
    } else {
        alert('Please enter a valid amount.');
    }
});
