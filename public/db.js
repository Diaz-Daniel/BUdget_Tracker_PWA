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
//comment
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

function checkDatabase() {
  console.log("check db invoked");

  let transaction = db.transaction(["BudgetStore"], "readwrite");

  const store = transaction.objectStore("BudgetStore");

  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.length !== 0) {
            transaction = db.transaction(["BudgetStore"], "readwrite");

            const currentStore = transaction.objectStore("BudgetStore");

            currentStore.clear();
            console.log("Clearing store");
          }
        });
    }
  };
}

window.addEventListener("online", checkDatabase);
