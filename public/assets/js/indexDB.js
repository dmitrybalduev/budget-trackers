const request = window.indexedDB.open("transactionsDB", 1);
let db;

request.onupgradeneeded = event => {
    db = event.target.result;
    
    // Creates an object store with a listID keypath that can be used to query on.
    const toDoListStore = db.createObjectStore("transactionsStore", { autoIncrement: true });
    // Creates a statusIndex that we can query on.
    toDoListStore.createIndex("statusIndex", "status"); 
    console.log('indexedDB upgraded');
}

request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log('Connection to indexedDB is successfull!');
};

//exporting function that will be called in index.js in catch block if request to save data is not successfull
export function saveRecord(expense) {
    
    const transaction = db.transaction("transactionsStore", 'readwrite');
    const transactionStore = transaction.objectStore("transactionsStore");

    store.add(expense);
    console.log('Saved record to indexedDB!');
}