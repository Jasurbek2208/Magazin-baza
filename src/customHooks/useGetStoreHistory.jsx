// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export async function getStoreHistory() {
  
  onSnapshot(doc(db, "storage2", "zWcuaTnZqglflTVQHkAE"), (docAll) => {
        
        localStorage.setItem("storeHistory", JSON.stringify(docAll?.data()?.storeHistory));
    });

    onSnapshot(doc(db, "storage2", "YVkxqmCuab7CedFFrMIU"), (docAll) => {

        localStorage.setItem("oziqOvqatChiqim", JSON.stringify(docAll?.data()?.oziqOvqatChiqim));
    });

    onSnapshot(doc(db, "storage2", "MCK41JPlggbyt5BSkqCx"), (docAll) => {

        localStorage.setItem("korxonaUchunChiqim", JSON.stringify(docAll?.data()?.korxonaUchunChiqim));
    });
}
