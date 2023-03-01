import React, { useEffect, useState } from "react";
import { TabTitle } from "../../utils/Utils";
import { toast } from "react-toastify";
import { StyledCurrentModal } from "../companyPage/CurrentModal";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

export default function CurrentModal({ admins, currentAdmin, isClose }) {
  TabTitle("Xaridor ma'lumoti | Magazin Baza");

  const [disbl, setDisbl] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // for edit current partner
  const [currEditedPartner, setCurrEditedPartner] = useState(currentAdmin);

  async function deleteCurrPartner() {
    setDisbl(true);
    const oldDatas = admins.filter((i) => i.id !== currentAdmin.id);

    try {
      await setDoc(doc(db, "storage2", "nDLTOuF4yuVFKBhwmCRC"), {
        companies: oldDatas,
      });

      toast.success("Xaridor muvafaqqiyatli o'chirildi");
      isClose(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  }

  async function saveEditedPartner() {
    setDisbl(true);
    const oldDatas = [];

    admins.forEach((i) =>
      i.id !== currentAdmin.id
        ? oldDatas.push(i)
        : oldDatas.push(currEditedPartner)
    );

    try {
      await setDoc(doc(db, "storage2", "nDLTOuF4yuVFKBhwmCRC"), {
        companies: oldDatas,
      });

      toast.success("Xaridor ma'lumoti muvafaqqiyatli o'zgartirildi");
      isClose(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  }

  function valueOnChanged(name, value) {
    setCurrEditedPartner((p) => ({ ...p, [name]: value }));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledCurrentModal>
      <div className="container">
        <h1>Admin</h1>
        <div className="info__wrapper">
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Ism:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.firstName}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  value={currEditedPartner.firstName}
                  onChange={(e) => valueOnChanged("firstName", e.target.value)}
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Familiya:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.lastName}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  value={currEditedPartner.lastName}
                  onChange={(e) => valueOnChanged("lastName", e.target.value)}
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Jinsi:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.genre}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  value={currEditedPartner.genre}
                  onChange={(e) => valueOnChanged("genre", e.target.value)}
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Email:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.email}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  value={currEditedPartner.email}
                  onChange={(e) => valueOnChanged("email", e.target.value)}
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Telefon raqam:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.phoneNumber}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  require
                  type="number-3"
                  value={currEditedPartner.phoneNumber}
                  pattern="[+]{1}[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                  onChange={(e) => {
                    e.target.setCustomValidity("");
                    valueOnChanged("phoneNumber", e.target.value);
                    if (!e.target.validity.valid) {
                      e.target.setCustomValidity(
                        "Raqam noto'g'ri kiritilgan ! Misol: +998-97-105-05-05"
                      );
                    }
                  }}
                  placeholder="+998-97-105-05-05"
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Lavozimi:</h5>
            <p
              title={!isEdited ? "Lavozimni o'zgartirish mumkin emas!" : null}
              className="information"
            >
              {currentAdmin.rol.map((rol, idx) => (
                <span key={String(rol + idx)}>
                  {rol}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="actions__wrapper">
          <div className="button__wrapper">
            <Button
              content={isEdited ? "Save" : "Close"}
              width="100%"
              disbl={disbl}
              onClick={() => (isEdited ? saveEditedPartner() : isClose(false))}
            />
          </div>

          <div className="button__wrapper">
            <Button
              content={isEdited ? "Cencel" : "Edit"}
              width="100%"
              disbl={disbl}
              onClick={() => {
                setIsEdited((p) => !p);
                setCurrEditedPartner(currentAdmin);
              }}
            />
          </div>

          <div className="button__wrapper">
            <Button
              content="Delete"
              width="100%"
              disbl={disbl || isEdited}
              onClick={deleteCurrPartner}
            />
          </div>
        </div>
      </div>
    </StyledCurrentModal>
  );
}
