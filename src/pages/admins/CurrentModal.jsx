import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TabTitle } from "../../utils/Utils";

// Style
import { StyledCurrentModal } from "../companyPage/CurrentModal";

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { db } from "../../firebase";

// Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";

export default function CurrentModal({ admins, currentAdmin, isClose }) {
  TabTitle("Xaridor ma'lumoti | Magazin Baza");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // for edit current partner
  const [currEditedPartner, setCurrEditedPartner] = useState(currentAdmin);
  const [genre, setGenre] = useState(currentAdmin.genre);

  async function deleteCurrPartner() {
    // setDisbl(true);
    const oldDatas = admins.filter((i) => i.id !== currentAdmin.id);

    try {
      // await setDoc(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), {
      //   admins: oldDatas,
      // });

      signInWithEmailAndPassword(
        auth,
        currentAdmin.email,
        currentAdmin.password
      )
        .then((userCredential) => {
          console.log(userCredential.user);
          // userCredential.user
          //   .delete()
          //   .then(() => {
          //     console.log("User account deleted successfully");
          //   })
          //   .catch((error) => {
          //     console.error("Error deleting user account:", error);
          //   });
        })
        .catch(() => setError(true));

      // toast.success("Xaridor muvafaqqiyatli o'chirildi");
      // isClose(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  }

  async function editAccount() {
    // Delete edited accaunt
    await signInWithEmailAndPassword(
      auth,
      currentAdmin.email,
      currentAdmin.password
    )
      .then((userCredential) => {
        console.log(userCredential.user);
        userCredential.user
          .delete()
          .then(() => {
            console.log("User account deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting user account:", error);
          });
      })
      .catch(() => setError(true));

    // Register new accaunt
    await createUserWithEmailAndPassword(
      auth,
      currEditedPartner.email,
      currEditedPartner.password
    )
      .then((userCredential) => {
        currEditedPartner.accessToken = userCredential.user.uid;
      })
      .catch(() => setError(true));
  }

  async function saveEditedPartner() {
    setDisbl(true);
    const oldDatas = [];

    if (currentAdmin.email !== currEditedPartner.email) {
      await editAccount();
    }

    admins.forEach((i) =>
      i.id !== currentAdmin.id
        ? oldDatas.push(i)
        : oldDatas.push(currEditedPartner)
    );

    try {
      await setDoc(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), {
        admins: oldDatas,
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
    valueOnChanged("genre", genre);
  }, [genre]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledCurrentModal>
      <div className="container">
        <h1>Admin</h1>
        <form
          onSubmit={handleSubmit(saveEditedPartner)}
          className="info__wrapper"
        >
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Ism:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.firstName}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  placeholder="ism kiriting"
                  errors={errors}
                  error={{
                    error: errors?.firstName?.message ? true : false,
                    errName: errors?.firstName?.message,
                  }}
                  option={{
                    ...register("firstName", {
                      value: currEditedPartner.firstName,
                      required: "ism kiritilmadi !",
                      minLength: {
                        value: 3,
                        message: "bu darajada qisqa ism bo'lmaydi !",
                      },
                      onChange: (e) => {
                        valueOnChanged("firstName", e.target.value);
                      },
                    }),
                  }}
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
                  placeholder="familiya kiriting"
                  errors={errors}
                  error={{
                    error: errors?.lastName?.message ? true : false,
                    errName: errors?.lastName?.message,
                  }}
                  option={{
                    ...register("lastName", {
                      value: currEditedPartner.lastName,
                      required: "familiya kiritilmadi !",
                      minLength: {
                        value: 3,
                        message: "bu darajada qisqa familiya bo'lmaydi !",
                      },
                      onChange: (e) => {
                        valueOnChanged("lastName", e.target.value);
                      },
                    }),
                  }}
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
                <Select
                  list={["erkak", "ayol"]}
                  sortData={setGenre}
                  selected={genre}
                  isFormSelect
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
                {/* <Input
                  require
                  type="email"
                  value={currEditedPartner.email}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  onChange={(e) => {
                    valueOnChanged("email", e.target.value);
                    // e.target.setCustomValidity("");

                    // console.log(e.target.validity);

                    // if (!e.target.validity.valid) {
                    //   e.target.setCustomValidity("Elektron pochtada xatolik.");
                    // }
                    // if (e.target.validity.customError) {
                    //   e.target.setCustomValidity("Elektron pochta kiritilmadi.");
                    // }
                    // if (e.target.validity.typeMismatch) {
                    //   e.target.setCustomValidity(
                    //     "Elektron pochta noto'g'ri kiritilgan ! Misol: misol@gmail.uz"
                    //   );
                    // }
                  }}
                /> */}
                <Input
                  // type="email"
                  // value={currEditedPartner.email}
                  placeholder="email kiriting"
                  errors={errors}
                  error={{
                    error: errors?.email?.message ? true : false,
                    errName: errors?.email?.message,
                  }}
                  option={{
                    ...register("email", {
                      value: currEditedPartner.email,
                      required: "elektron pochta kiritilmadi !",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "elektron pochtada xatolik",
                      },
                      onChange: (e) => {
                        valueOnChanged("email", e.target.value);
                      },
                    }),
                  }}
                />
              </div>
            )}
          </div>
          <div className={"info" + (isEdited ? " edited" : "")}>
            <h5>Parol:</h5>
            {!isEdited ? (
              <p className={"information" + (isEdited ? " edited" : "")}>
                {currentAdmin.password}
              </p>
            ) : (
              <div className="input__wrapper">
                <Input
                  placeholder="parolni kiriting"
                  errors={errors}
                  error={{
                    error: errors?.password?.message ? true : false,
                    errName: errors?.password?.message,
                  }}
                  option={{
                    ...register("password", {
                      value: currEditedPartner.password,
                      required: "parol kiritilmadi !",
                      minLength: {
                        value: 6,
                        message: "minimal uzunlik 6ta belgi",
                      },
                      maxLength: {
                        value: 16,
                        message: "maxsimal uzunlik 16 ta belgi",
                      },
                      onChange: (e) => {
                        valueOnChanged("password", e.target.value);
                      },
                    }),
                  }}
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
              title={isEdited ? "Lavozimni o'zgartirish mumkin emas!" : null}
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

          <div className="actions__wrapper">
            <div className="button__wrapper">
              <Button
                type={isEdited ? "submit" : "button"}
                content={isEdited ? "Save" : "Close"}
                width="100%"
                disbl={disbl}
                onClick={() => (isEdited ? null : isClose(false))}
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
                  reset();
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
        </form>
      </div>
    </StyledCurrentModal>
  );
}
