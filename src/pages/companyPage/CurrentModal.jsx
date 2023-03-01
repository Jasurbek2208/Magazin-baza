import React, { useEffect, useState } from "react";
import { TabTitle } from "../../utils/Utils";
import { toast } from "react-toastify";
import styled from "styled-components";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

export default function CurrentModal({ partners, currentPartner, isClose }) {
  TabTitle("Xaridor ma'lumoti | Magazin Baza");

  const [disbl, setDisbl] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // for edit current partner
  const [currEditedPartner, setCurrEditedPartner] = useState(currentPartner);

  async function deleteCurrPartner() {
    setDisbl(true);
    const oldDatas = partners.filter((i) => i.id !== currentPartner.id);

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

    partners.forEach((i) =>
      i.id !== currentPartner.id
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
        {currentPartner.companyBoss ? (
          <>
            <h1>Hamkor Kompaniya</h1>
            <div className="info__wrapper">
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Kompaniya nomi:</h5>
                {!isEdited ? (
                  <p>{currentPartner.name}</p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.name}
                      onChange={(e) => valueOnChanged("name", e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Kompaniya boshlig'i:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.companyBoss}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.companyBoss}
                      onChange={(e) =>
                        valueOnChanged("companyBoss", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Kompaniya manzili:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.address}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.address}
                      onChange={(e) =>
                        valueOnChanged("address", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Telefon raqam:</h5>
                {!isEdited ? (
                  <p
                    typeof="number"
                    className={"information" + (isEdited ? " edited" : "")}
                  >
                    {currentPartner.phoneNumber}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.phoneNumber}
                      onChange={(e) =>
                        valueOnChanged("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Qo'shimcha telefon raqam:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.additionalPhoneNumber}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.additionalPhoneNumber}
                      onChange={(e) =>
                        valueOnChanged("additionalPhoneNumber", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>Hamkor Tadbirkor shaxs</h1>
            <div className="info__wrapper">
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>ism:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.name}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.name}
                      onChange={(e) => valueOnChanged("name", e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Jinsi:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.genre}
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
                <h5>Manzil:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.address}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.address}
                      onChange={(e) =>
                        valueOnChanged("address", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Tug'ilgan yili:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.birthday}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.birthday}
                      onChange={(e) =>
                        valueOnChanged("birthday", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
              <div className={"info" + (isEdited ? " edited" : "")}>
                <h5>Telefon raqam:</h5>
                {!isEdited ? (
                  <p className={"information" + (isEdited ? " edited" : "")}>
                    {currentPartner.phoneNumber}
                  </p>
                ) : (
                  <div className="input__wrapper">
                    <Input
                      value={currEditedPartner.phoneNumber}
                      onChange={(e) =>
                        valueOnChanged("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

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
                setCurrEditedPartner(currentPartner);
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

export const StyledCurrentModal = styled.div`
  padding: 100px 0px 50px;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  z-index: 10;

  h1 {
    text-align: center;
  }

  .info__wrapper {
    margin: 40px auto 0px;
    width: 100%;
    max-width: 650px;

    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow-x: auto;

    .info {
      padding: 10px 0px 18.2px;
      min-width: 480px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 50px;

      & {
        border-bottom: 2px solid #333;
      }

      &.edited {
        padding: 0px 0px 10px;
      }

      h5,
      p {
        width: 250px;
        margin: 0px;
      }

      p {
        margin-right: 5px;
        padding: 5px 10px;
        width: 180px;
        transition: 300ms;
      }

      .input__wrapper {
        margin-right: 5px;
        width: 180px;
      }
    }
  }

  .actions__wrapper {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;

    .button__wrapper {
      max-width: 200px;
      min-width: 100px;
      width: 100%;
    }
  }
`;
