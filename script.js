const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transactionForm");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();

  text.value = "";
  amount.value = "";
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text}
    <span>
      ${sign}₹${Math.abs(transaction.amount)}
      <button onclick="removeTransaction(${transaction.id})" style="margin-left:10px;color:red;border:none;background:none;cursor:pointer;">❌</button>
    </span>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  const expenseTotal = (
    amounts.filter(item => item < 0)
      .reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  balance.innerText = total;
  income.innerText = incomeTotal;
  expense.innerText = expenseTotal;
}

form.addEventListener("submit", addTransaction);

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
