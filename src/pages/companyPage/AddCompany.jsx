import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StyledSavdoForm } from "../../assets/style/formStyles";

// Firebase
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";

export default function AddCompany() {
  // navigate
  const navigate = useNavigate();

  const [disbl, setDisbl] = useState(false);
  const [oldDatas, setOldDatas] = useState([]);
  const [formSelect, setFormSelect] = useState("Kompaniya");
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    companyBoss: "",
  });
  const [personData, setPersonData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    genre: "",
    birthday: "",
  });

  //   form onchanges function
  function changeData(setData, name, value) {
    setData((p) => ({ ...p, [name]: value }));
  }

  //   form onSubmit function // set data
  async function handleSubmit(e, data) {
    e.preventDefault();
    setDisbl(true);

    try {
      await setDoc(doc(db, "storage2", "nDLTOuF4yuVFKBhwmCRC"), {
        companies: [...oldDatas, data],
      });
      toast.success("Xaridor muvafaqqiyatli qo'shildi");

      //   clear data state
      data.genre
        ? setPersonData({
            name: "",
            address: "",
            phoneNumber: "",
            genre: "",
            birthday: "",
          })
        : setCompanyData({
            name: "",
            address: "",
            phoneNumber: "",
            additionalPhoneNumber: "",
            companyBoss: "",
          });
      navigate("...");
    } catch (error) {
      console.log(error);
      toast.error("Xaridor qo'shishda xato yuz berdi. Qayta urinib ko'ring!");
    } finally {
      setDisbl(false);
    }
  }

  //   get all xaridorlar)
  useEffect(() => {
    onSnapshot(doc(db, "storage2", "nDLTOuF4yuVFKBhwmCRC"), (doc) => {
      setOldDatas(doc.data().companies);
    });
  }, []);

  return (
    <StyledSavdoForm>
      <div className="container">
        <h1>Kompaniya yoki Tadbirkor shaxs qo'shish</h1>
        <div className="select__wrapper">
          <Select
            isFormSelect={true}
            list={["Kompaniya", "Shaxs"]}
            label="Kompaniya yoki Tadbirkor ?"
            sortData={setFormSelect}
          />
        </div>
        {formSelect === "Kompaniya" ? (
          <form
            onSubmit={(e) => handleSubmit(e, companyData)}
            className="form__wrapper"
          >
            <div className="input__wrapper">
              <Input
                require
                value={companyData.name}
                onChange={(e) =>
                  setCompanyData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="kompaniya nomini kiriting"
                label="Kompaniya nomi"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                value={companyData.address}
                onChange={(e) =>
                  changeData(setCompanyData, "address", e.target.value)
                }
                placeholder="kompaniya manzilini kiriting"
                label="Manzil"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                // type="number"
                value={companyData.phoneNumber}
                onChange={(e) =>
                  changeData(setCompanyData, "phoneNumber", e.target.value)
                }
                placeholder="kompaniyaning telefon raqami"
                label="Telefon raqam"
              />
            </div>
            <div className="input__wrapper">
              <Input
                value={companyData.companyBoss}
                onChange={(e) =>
                  changeData(setCompanyData, "companyBoss", e.target.value)
                }
                placeholder="kompaniya boshlig'ining F.I.O. sini kiriting"
                label="Direktor F.I.O. si"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                // type="number"
                value={companyData.additionalPhoneNumber}
                onChange={(e) =>
                  changeData(
                    setCompanyData,
                    "additionalPhoneNumber",
                    e.target.value
                  )
                }
                placeholder="qo'shimcha telefon raqamni kiriting"
                label="Qo'shimcha telefon raqam"
              />
            </div>
            <div className="input__wrapper">
              <Button
                content="Tasdiqlash"
                type="submit"
                width="100%"
                disbl={disbl}
              />
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => handleSubmit(e, personData)}
            className="form__wrapper"
          >
            <div className="input__wrapper">
              <Input
                require
                value={personData.name}
                onChange={(e) =>
                  changeData(setPersonData, "name", e.target.value)
                }
                placeholder="F.I.O. ni kiriting"
                label="Shaxs ism familiyasi"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                value={personData.address}
                onChange={(e) =>
                  changeData(setPersonData, "address", e.target.value)
                }
                placeholder="shaxsning yashovchi manzilini kiriting"
                label="Manzil"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                // type="number"
                value={personData.phoneNumber}
                onChange={(e) =>
                  changeData(setPersonData, "phoneNumber", e.target.value)
                }
                placeholder="shaxsning telefon raqami"
                label="Telefon raqam"
              />
            </div>
            <div className="input__wrapper">
              <Input
                type="number-2"
                require
                value={personData.birthday}
                onChange={(e) =>
                  changeData(setPersonData, "birthday", e.target.value)
                }
                placeholder="shaxsning tug'ilgan yili"
                label="Tug'ilgan sana"
              />
            </div>
            <div className="input__wrapper">
              <Input
                require
                value={personData.genre}
                onChange={(e) =>
                  changeData(setPersonData, "genre", e.target.value)
                }
                placeholder="shaxsning jinsini kiriting"
                label="Jinsi"
              />
            </div>
            <div className="input__wrapper">
              <Button
                content="Tasdiqlash"
                type="submit"
                width="100%"
                disbl={disbl}
              />
            </div>
          </form>
        )}
      </div>
    </StyledSavdoForm>
  );
}
