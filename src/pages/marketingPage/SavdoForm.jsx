import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// Firebase
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

// Custom Hooks
import { addStoreHistory } from "../../customHooks/useAddStoreHistory";
import { getStoreHistory } from "../../customHooks/useGetStoreHistory";

export default function SavdoForm() {
  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState({ nomi: false, soni: false });
  const [user, setUser] = useState();
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
  } = useForm();

  // POST PRODUCTS
  async function addProducts(data) {
    setMahsulotName((p) => ({ ...p, mahsulotNomi: data.mahsulotNomi }));
    let newData = products;
    let isNomiError = true;
    let isSoniError = false;
    let narxi = "0";
    data.mahsulotNomi = isSelect;

    newData?.map((i) => {
      if (i.mahsulotNomi === isSelect) {
        narxi = i.narxi;
        isNomiError = false;
        Number(i.soni) > Number(numValue)
          ? (i.soni = Number(i.soni - numValue))
          : (isSoniError = true);
        data.soni = numValue;
      }
    });
    if (isNomiError) setError((p) => ({ ...p, nomi: true }));
    if (isSoniError) setError((p) => ({ ...p, soni: true }));

    if (!isNomiError && !isSoniError) {
      try {
        addStoreHistory(data, narxi);
        await setDoc(doc(db, "storage2", "RQVXHDw3ev7t7N37HU1M"), {
          products: newData,
        });
        getDatas();
      } catch (err) {
        console.log(err);
      }
    }
  }
  //////////////////////////////////

  // SEARCH FUNCTION
  function searchProducts(search) {
    setIsSelect(search.target.value);
    setIsOpen(true);
    let curProducts = products;
    let curData = [];
    if (search.target.value === "") {
      curData = [];
    } else {
      curData = curProducts?.filter((i) =>
        i?.mahsulotNomi
          ?.toLowerCase()
          .includes(search.target.value.toLowerCase())
          ? true
          : false
      );
    }
    setFilteredData(curData);
  }

  // GetDatas
  function getDatas() {
    try {
      onSnapshot(doc(db, "storage2", "RQVXHDw3ev7t7N37HU1M"), (doc) => {
        setProducts(doc?.data()?.products);
      });
    } catch (err) {
      console.log(err);
    }
  }

  //
  useEffect(() => {
    getDatas();
  }, []);

  return (
    <StyledSavdoForm>
      <div className="container">
        {/* <h1>Mahsulot sotish</h1> */}
        <form onSubmit={handleSubmit(addProducts)} className="form__wrapper">
          <div className="input__wrapper">
            <Input
              value={isSelect}
              errors={errors}
              errName="mahsulotNomi"
              error={{
                error: error?.nomi,
                errName: `Omborda bunday mahsulot yo'q !`,
              }}
              placeholder="Mahsulot nomini kiriting"
              label="Mahsulot nomi *"
              option={{
                ...register("mahsulotNomi", {
                  required: "Mahsulot nomi kiritilmadi !",
                  onChange: (e) => {
                    searchProducts(e);
                    setError(false);
                  },
                }),
              }}
            />
            {filteredData?.length > 0 && isOpen ? (
              <div className="currProduct">
                <ul>
                  {filteredData?.map((i, idx) => (
                    <li key={i?.mahsulotNomi + " " + idx}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSelect(i?.mahsulotNomi);
                          setIsOpen(false);
                        }}
                      >
                        {i?.mahsulotNomi}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="input__wrapper">
            <Input
              onChange={(e) => {
                setNumValue(e);
                setError(false);
              }}
              type="number"
              errors={errors}
              error={{
                error: error?.soni,
                errName: `Omborda ${mahsulotName.mahsulotNomi} ${mahsulotName.soni} ta bor. Bundan ko'p mahsulot sotaolmaysiz !`,
              }}
              errName="soni"
              placeholder="Mahsulotdan qancha sotishingizni kiriting"
              label="Soni *"
              option={{
                ...register("soni", {
                  required: "Mahsulot qancha sotilishi kiritilmadi !",
                  minLength: {
                    value: 3,
                    message: "Minimal 100 ta sotish mumkin !",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Input
              errors={errors}
              errName="qaysiKorxonagaSotildi"
              placeholder="Qaysi korxonaga sotishingizni kiriting"
              label="Qaysi korxonaga sotmoqchsiz ? *"
              option={{
                ...register("qaysiKorxonagaSotildi", {
                  required: "Mahsulot nomi kiritilmadi !",
                }),
              }}
            />
          </div>

          <div className="input__wrapper">
            <Button disbl={disbl} type="submit" content="Mahsulotni sotish" />
          </div>
        </form>
      </div>
    </StyledSavdoForm>
  );
}

const StyledSavdoForm = styled.div`
  padding: 10px 0px 0px;
  margin: 0 auto;

  .container {
    padding: 10px 16px;
    /* border: 1px solid #000; */

    h1 {
      margin-bottom: 30px;
      text-align: center;
    }

    .form__wrapper {
      margin: 0 auto;
      display: flex;
      max-width: 700px;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 46px;
      row-gap: 43px;

      .input__wrapper {
        position: relative;
        width: 320px;

        .currProduct {
          position: absolute;
          width: max-content;
          background-color: #fff;
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
          z-index: 3;

          ul {
            display: flex;
            flex-direction: column;
            row-gap: 0px !important;

            li {
              width: 100%;

              button {
                cursor: pointer;
                padding: 10px 20px;
                width: 100%;
                color: #000;
                border: none;
                text-align: center;
                background-color: #fff;
                transition: 200ms;

                &:hover,
                &:focus {
                  outline: none;
                  background-color: silver;
                }
              }
            }
          }
        }
      }
    }
  }
`;
