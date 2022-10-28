// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export async function getStoreHistory() {
  let hisdata = [];
  try {
    onSnapshot(doc(db, "storage2", "zWcuaTnZqglflTVQHkAE"), (docAll) => {
      docAll.data().storeHistory.map((i) => {
        hisdata.push(i);
        localStorage.getItem("storeHistory")
          ? localStorage.setItem(
              "storeHistory",
              JSON.stringify([...JSON.parse(localStorage.getItem("storeHistory")), i])
            )
          : localStorage.setItem("storeHistory", JSON.stringify([i]));
      });
    });
  } catch (err) {
    console.log(err);
  }
  return hisdata;
}
