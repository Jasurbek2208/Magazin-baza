import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

// Style
import { StyledSavdoForm } from "../../assets/style/formStyles";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

export default function TaminotForm() {
  const location = useLocation().pathname;

  //
  const [image, setImage] = useState("");
  const [disbl, setDisbl] = useState(false);

  //
  const [error, setError] = useState({ nomi: false, soni: false });
  const [products, setProducts] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [isSelect, setIsSelect] = useState("");
  const [numValue, setNumValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mahsulotName, setMahsulotName] = useState({
    mahsulotNomi: "",
    soni: "",
    narxi: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function addSupply(data) {
    setDisbl(true);

    try {
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  }

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <StyledSavdoForm>
      <div className="container">
        {location === "/oziq-ovqat-uchun-chiqim" ? (
          <h1>Oziq-ovqat uchun chiqim</h1>
        ) : (
          <h1>Korxona uchun ta'minot</h1>
        )}
        <form
          onSubmit={handleSubmit(addSupply)}
          className="form__wrapper"
          style={{ flexDirection: "column", alignItems: "center" }}
        >
          <div className="input__wrapper">
            <Input
              onChange={(e) => {
                setNumValue(e);
                setError(false);
              }}
              type="number"
              value={numValue}
              errors={errors}
              error={{
                error: error?.soni,
                errName: `Omborda ${mahsulotName.mahsulotNomi} ${mahsulotName.soni} ta bor. Bundan ko'p mahsulot sotaolmaysiz !`,
              }}
              errName="soni"
              placeholder="Mahsulotdan qancha sotishingizni kiriting"
              label="Sarflangan budjet *"
              option={{
                ...register("soni", {
                  required:
                    location === "/mahsulot-sotish"
                      ? "Mahsulot qancha sotilishi kiritilmadi !"
                      : "Mahsulot qancha sotib olinishi kiritilmadi !",
                  minLength: {
                    value: 3,
                    message:
                      location === "/mahsulot-sotish"
                        ? "Minimal 100 ta sotish mumkin !"
                        : "Minimal 100 ta sotib olish mumkin !",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              label="Checkni yuborish *"
              type="file"
            />
          </div>
          <div className="input__wrapper">
            <Button
              disbl={disbl}
              width="100%"
              type="submit"
              content="Tasdiqlash"
            />
          </div>
        </form>
      </div>
    </StyledSavdoForm>
  );
}
