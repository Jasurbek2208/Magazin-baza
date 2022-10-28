// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Custom Hooks
import { getNowTime } from "./useGetNowTime";

export async function addStoreHistory(data, narxi) {
  const historyData = {
    qachonSotildi: getNowTime(),
    qanchaSotildi: data.soni,
    narxi,
    mahsulotNomi: data.mahsulotNomi,
    qaysiKorxonagaYokiShaxsga: data.qaysiKorxonagaSotildi,
    kimTomonidan:
      JSON.parse(localStorage.getItem("rol"))?.ism +
      " " +
      JSON.parse(localStorage.getItem("rol"))?.familiya,
  };
  // localStorage.setItem(
  //   "rol",
  //   JSON.stringify({
  //     rol: "sotuvchi",
  //     ism: "Jasurbek",
  //     familiya: "Shomaqsudov",
  //   })
  // );

  try {
    await setDoc(doc(db, "storage2", "zWcuaTnZqglflTVQHkAE"), {
      storeHistory: [
        ...JSON.parse(localStorage.getItem("storeHistory")),
        historyData,
      ],
    });
  } catch (err) {
    console.log(err);
  }
}
