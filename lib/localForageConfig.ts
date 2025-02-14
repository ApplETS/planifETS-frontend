import localforage from 'localforage';

const forage = localforage.createInstance({
  name: 'PlanifETS',
  storeName: 'zustand_store',
  driver: localforage.INDEXEDDB,
});

export default forage;
