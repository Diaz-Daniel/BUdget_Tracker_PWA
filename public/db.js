let db;

// Create a new db request for a "budget" database.
const request = indexedDB.open("Transaction", 1);

request.onupgradeneeded = function (e) {
  db = e.target.result;

  db.createObjectStore("BudgetStore", { autoIncrement: true });
};

request.onerror = function (e) {
  console.log(`Woops! ${e.target.errorCode}`);
};

request.onsuccess = function (e) {
  db = e.target.result;
  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  // Open a transaction on your BudgetStore db
  let transaction = db.transaction(["BudgetStore"], "readwrite");

  // access your BudgetStore object
  const store = transaction.objectStore("BudgetStore");

  store.add(record);
}

window.addEventListener("online", checkDatabase);
