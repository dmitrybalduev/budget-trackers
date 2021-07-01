const request = window.indexedDB.open("transactionsDB", 1);

request.onupgradeneeded = event => {
    const db = event.target.result;
    
    // Creates an object store with a listID keypath that can be used to query on.
    const toDoListStore = db.createObjectStore("transactionsStore", { autoIncrement: true });
    // Creates a statusIndex that we can query on.
    toDoListStore.createIndex("statusIndex", "status"); 
    console.log('indexedDB upgraded');
}