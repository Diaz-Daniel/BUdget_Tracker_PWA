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

window.addEventListener("online", checkDatabase);
