let db;
let dbVersion;
const request = window.indexedDB.open("transactionsDB", dbVersion || 21);

request.onupgradeneeded = e => {

    const { oldVersion } = e;
    const newVersion = e.newVersion || db.version;
  
    console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);
  
    db = e.target.result;
  
    if (db.objectStoreNames.length === 0) {
      db.createObjectStore('transactionsStore', { autoIncrement: true });
    }
}

request.onerror = function(event) {
    console.log(`ERROR! ${event.target.errorCode}`);
};

request.onsuccess = function (event) {
    db = event.target.result;
};

export function saveRecord(expense) {
    
    const transaction = db.transaction(["transactionsStore"], 'readwrite');
    const store = transaction.objectStore("transactionsStore");

    store.add(expense);
    console.log('Saved record to indexedDB!');
}

function checkDatabase() {
    let transaction = db.transaction(['transactionsStore'], 'readwrite');
  
    const store = transaction.objectStore('transactionsStore');
  
    const getAll = store.getAll();
  
    getAll.onsuccess = function () {
      if (getAll.result.length > 0) {
        fetch('/api/transaction/bulk', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.length !== 0) {
              transaction = db.transaction(['transactionsStore'], 'readwrite');
  
              const currentStore = transaction.objectStore('transactionsStore');
  
              currentStore.clear();
            }
          });
      }
    };
  }

window.addEventListener('online', checkDatabase);