// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Custom Hooks
import { getNowTime } from "./useGetNowTime";

export async function addStoreHistory(data, narxi = "", location) {
  let historyData = null;

  location === "/mahsulot-sotish"
    ? (historyData = {
        qachonSotildi: getNowTime(),
        qanchaSotildi: data.soni,
        narxi,
        mahsulotNomi: data.mahsulotNomi,
        qaysiKorxonagaYokiShaxsga: data.qaysiKorxonagaSotildi,
        kimTomonidan:
          JSON.parse(localStorage.getItem("rol"))?.ism +
          " " +
          JSON.parse(localStorage.getItem("rol"))?.familiya,
      })
    : location === "/mahsulot-sotib-olish"
    ? (historyData = {
        qachonSotibOlindi: getNowTime(),
        qanchaSotibOlindi: data.soni,
        narxi,
        mahsulotNomi: data.mahsulotNomi,
        qaysiKorxonadanYokiShaxsdan: data.qaysiKorxonagaSotildi,
        kimTomonidan:
          JSON.parse(localStorage.getItem("rol"))?.ism +
          " " +
          JSON.parse(localStorage.getItem("rol"))?.familiya,
      })
    : (historyData = {
        kiritilganSana: getNowTime(),
        chiqim: data.soni,
        check: data.check,
        masulShaxs: data.masulShaxs,
      });

  // localStorage.setItem(
  //   "rol",
  //   JSON.stringify({
  //     rol: "sotuvchi",
  //     ism: "Jasurbek",
  //     familiya: "Shomaqsudov",
  //   })
  // );

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
