// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export async function getStoreHistory() {
  let hisdata = [];
  try {
    onSnapshot(doc(db, "storage2", "zWcuaTnZqglflTVQHkAE"), (docAll) => {
      docAll?.data()?.storeHistory?.map((i) => {
        hisdata.push(i);
        localStorage.getItem("storeHistory")
          ? localStorage.setItem(
              "storeHistory",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("storeHistory")),
                i,
              ])
            )
          : localStorage.setItem("storeHistory", JSON.stringify([i]));
      });
    });
    onSnapshot(doc(db, "storage2", "YVkxqmCuab7CedFFrMIU"), (docAll) => {
      docAll.data().oziqOvqatChiqim.map((i) => {
        hisdata.push(i);
        localStorage.getItem("oziqOvqatChiqim")
          ? localStorage.setItem(
              "oziqOvqatChiqim",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("oziqOvqatChiqim")),
                i,
              ])
            )
          : localStorage.setItem("oziqOvqatChiqim", JSON.stringify([i]));
      });
    });
    onSnapshot(doc(db, "storage2", "MCK41JPlggbyt5BSkqCx"), (docAll) => {
      docAll.data().korxonaUchunChiqim.map((i) => {
        hisdata.push(i);
        localStorage.getItem("korxonaUchunChiqim")
          ? localStorage.setItem(
              "korxonaUchunChiqim",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("korxonaUchunChiqim")),
                i,
              ])
            )
          : localStorage.setItem("korxonaUchunChiqim", JSON.stringify([i]));
      });
    });
  } catch (err) {
    console.log(err);
  }
  return hisdata;
}
