import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { TabTitle } from "../../utils/Utils";
import { StyledSavdoForm } from "../../assets/style/formStyles";

// Firebase
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function AddProductList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Title
  TabTitle("Omborga mahsulot qo'shish | Magazin Baza");

  // navigate
  const navigate = useNavigate();
  //
  const [products, setProducts] = useState();
  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState({
    mahsulotNomi: false,
  });

  async function addProducts(data) {
    setDisbl(true);

    let g = data.narxi
      .split("")
      .filter(
        (i) =>
          String(i) === "0" ||
          String(i) === "1" ||
          String(i) === "2" ||
          String(i) === "3" ||
          String(i) === "4" ||
          String(i) === "5" ||
          String(i) === "6" ||
          String(i) === "7" ||
          String(i) === "8" ||
          String(i) === "9"
      );
    data.narxi = Number(g.join(""));
    data.soni = 0;

    //
    let isNomiError = true;

    products.map((product) => {
      if (product.mahsulotNomi === data.mahsulotNomi) {
        isNomiError = false;
      }
    });

    if (!isNomiError) setError((p) => ({ ...p, mahsulotNomi: true }));

    if (isNomiError) {
      try {
        await setDoc(doc(db, "storage2", "RQVXHDw3ev7t7N37HU1M"), {
          products: [...products, data],
        });
        navigate("..");
        toast.success("Mahsulot muvofaqiyatli qo'shildi !");
      } catch (error) {
        console.log(error);
      } finally {
        localStorage.removeItem("storeHistory");
        setDisbl(false);
      }
    }
  }

  useEffect(() => {
    onSnapshot(doc(db, "storage2", "RQVXHDw3ev7t7N37HU1M"), (doc) => {
      setProducts(doc?.data()?.products);
    });
  }, []);

  return (
    <StyledSavdoForm>
      <div className="container">
        <h1>Omborga mahsulot qo'shish</h1>

        <form onSubmit={handleSubmit(addProducts)} className="form__wrapper">
          <div className="input__wrapper">
            <Input
              errName="mahsulotNomi"
              errors={errors}
              error={{
                error: error?.mahsulotNomi,
                errName: `Omborda bunday mahsulot bor !`,
              }}
              placeholder="Mahsulot nomini kiriting"
              label="Mahsulot nomi *"
              option={{
                ...register("mahsulotNomi", {
                  required: "Mahsulot nomi kiritilmadi !",
                  minLength: {
                    value: 4,
                    message: "Kamida 4ta belgi bo'lishi kerak !",
                  },
                  onChange: (e) => {
                    setError(false);
                    setDisbl(false);
                  },
                }),
              }}
            />
          </div>

          <div className="input__wrapper">
            <Input
              type="number"
              errName="narxi"
              errors={errors}
              placeholder="Mahsulotdan qancha sotishingizni kiriting"
              label="Mahsulotning doimiy narxi (so'mda) *"
              option={{
                ...register("narxi", {
                  required: "Mahsulotning doimiy narxi kiritilmadi !",
                  minLength: {
                    value: 3,
                    message: "Minimal narx 100 so'm !",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Button
              content="Tasdiqlash"
              type="submit"
              disbl={disbl}
              width="100%"
            />
          </div>
        </form>
      </div>
    </StyledSavdoForm>
  );
}
