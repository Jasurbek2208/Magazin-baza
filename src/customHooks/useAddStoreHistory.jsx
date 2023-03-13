// Firebase
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Custom Hooks
import { getNowTime } from "./useGetNowTime";

export async function addStoreHistory(data, narxi = "", location) {
  let historyData = null;

  onSnapshot(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), (doc) => {
    doc?.data()?.admins.map((currUser) => {
      if (localStorage.getItem("TOKEN") === currUser.accessToken) {
        localStorage.setItem(
          "lastRol",
          currUser.firstName + " " + currUser.lastName
        );
      }
    });
  });

  location === "/mahsulot-sotish"
    ? (historyData = {
        id: data.id,
        qachonSotildi: getNowTime(),
        qanchaSotildi: data.soni,
        narxi,
        mahsulotNomi: data.mahsulotNomi,
        qaysiKorxonagaYokiShaxsga: data.qaysiKorxonagaSotildi,
        kimTomonidan: localStorage.getItem("lastRol"),
      })
    : location === "/mahsulot-sotib-olish"
    ? (historyData = {
        id: data.id,
        qachonSotibOlindi: getNowTime(),
        qanchaSotibOlindi: data.soni,
        narxi,
        mahsulotNomi: data.mahsulotNomi,
        qaysiKorxonadanYokiShaxsdan: data.qaysiKorxonadanSotibOlindi,
        kimTomonidan: localStorage.getItem("lastRol"),
      })
    : (historyData = {
        id: data.id,
        kiritilganSana: getNowTime(),
        chiqim: data.soni,
        check: data.check,
        masulShaxs: localStorage.getItem("lastRol"),
      });

  try {
    location === "/mahsulot-sotib-olish" || location === "/mahsulot-sotish"
      ? await setDoc(doc(db, "storage2", "zWcuaTnZqglflTVQHkAE"), {
          storeHistory: [
            ...JSON.parse(localStorage.getItem("storeHistory")),
            historyData,
          ],
        })
      : location === "/oziq-ovqat-uchun-chiqim"
      ? await setDoc(doc(db, "storage2", "YVkxqmCuab7CedFFrMIU"), {
          oziqOvqatChiqim: [
            ...JSON.parse(localStorage.getItem("oziqOvqatChiqim")),
            historyData,
          ],
        })
      : await setDoc(doc(db, "storage2", "MCK41JPlggbyt5BSkqCx"), {
          korxonaUchunChiqim: [
            ...JSON.parse(localStorage.getItem("korxonaUchunChiqim")),
            historyData,
          ],
        });
  } catch (err) {
    console.log(err);
  }
}
