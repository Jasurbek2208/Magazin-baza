import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 } from "uuid";

// Style
import styled from "styled-components";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Components
import Input from "../input/Input";
import Button from "../button/Button";
import Select from "../select/Select";
import Loading from "../loading/Loading";

export default function Navbar({ currentuser, admins, isProfileOpen, setIsProfileOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // redux
  const dispatch = useDispatch();

  //
  const [isClosingTime, setIsClosingTime] = useState(false);
  const [avatarView, setAvatarView] = useState(false);

  //
  const [disbl, setDisbl] = useState(false);
  const [errorSpan, setErrorSpan] = useState("");
  const [editProfile, isEditProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function closingModal() {
    setTimeout(() => {
      setIsProfileOpen(false);
      setIsClosingTime(false);
    }, 500);
  }

  useEffect(() => {
    if (isClosingTime) {
      closingModal();
    }
  }, [isClosingTime]);

  // Save Edited user profile
  async function saveEditingProfile(data) {
    if (!genre) {
      setErrorSpan(true);
      return;
    }

    if (
      currentuser.firstName === data.firstName &&
      currentuser.lastName === data.lastName &&
      currentuser.email === data.email &&
      currentuser.password === data.password &&
      currentuser.phoneNumber === phoneNumber &&
      currentuser.genre === genre &&
      currentuser.avatar === image
    ) {
      isEditProfile(false);
      return;
    }

    setDisbl(true);
    setIsLoading(true);

    const oldDatas = [];
    data = { ...currentuser, ...data, genre, phoneNumber, avatar: image };

    try {
      if (
        currentuser.email !== data.email ||
        currentuser.password !== data.password
      ) {
        await editAccount(currentuser, data);
      }

      admins.forEach((i) =>
        i.id !== currentuser.id ? oldDatas.push(i) : oldDatas.push(data)
      );

      await setDoc(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), {
        admins: oldDatas,
      });

      toast.success("Profil muvaffaqiyatli o'zgartirildi!");
      resetForm();
    } catch {
      toast.success(
        "Profil o'zgartirishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring!"
      );
    } finally {
      setDisbl(false);
      setIsLoading(false);
    }
  }

  // Storagega rasm yuklash
  function uploadImage(e) {
    const storage = getStorage();
    const urlName =
      "adminsAvatar/" +
      currentuser?.firstName +
      "_" +
      currentuser?.lastName +
      "_avatar-" +
      v4();
    const storageRef = ref(storage, urlName);
    const file = e.target.files[0];
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          setIsLoading(false);
        });
      }
    );
  }

  // form number & genre first validation
  function currentValidation() {
    if (!genre) {
      setGenre(currentuser?.genre);
    }
    if (!phoneNumber) {
      setPhoneNumber(currentuser?.phoneNumber);
    }
    if (!image) {
      setImage(currentuser?.avatar);
    }
    isEditProfile((p) => !p);
  }

  // LogOut
  async function logOut() {
    dispatch({ type: "LOG_OUT" });
    resetForm(true);
  }

  // Reset Form
  function resetForm(isCencel) {
    isEditProfile(false);

    if(!isCencel) setIsClosingTime(true);

    setPhoneNumber("");
    setGenre("");
    setImage("");
    reset();
  }

  // Edit email
  async function editAccount(currentAdmin, currEdited) {
    // Delete edited account
    await signInWithEmailAndPassword(
      auth,
      currentAdmin.email,
      currentAdmin.password
    ).then((userCredential) => {
      userCredential.user.delete();
    });

    // Register new account
    await createUserWithEmailAndPassword(
      auth,
      currEdited.email,
      currEdited.password
    ).then((userCredential) => {
      currEdited.accessToken = userCredential.user.uid;
      localStorage.setItem("TOKEN", userCredential.user.uid);
    });
  }

  return (
    <StyledNavbar image={image} avatar={currentuser?.avatar}>
      <div className="container">
        <div
          className="user_profile"
          onClick={() => setIsProfileOpen((p) => !p)}
        >
          <i className="icon fa-solid fa-user"></i>
        </div>
        <Button content="Chiqish" onClick={logOut} />
      </div>

      {isProfileOpen && (
        <div
          className={"user-profile-modal" + (isClosingTime ? " closing" : "")}
        >
          <div className={"modal-close-btn" + (editProfile ? " off" : "")}>
            <i
              className="icon fa-solid fa-close"
              onClick={() => avatarView ? setAvatarView(false) : setIsClosingTime(true)}
            ></i>
          </div>
          {!editProfile ? (
            <div className={"user-info__wrapper" + (avatarView ? " On" : "")}>
              <div className="user_profile" onClick={() => !avatarView && currentuser.avatar ? setAvatarView(true) : null}>
                <i className="icon fa-solid fa-user"></i>
              </div>
              <h2 className="user-fullname">
                {currentuser?.firstName + " " + currentuser?.lastName}
              </h2>
              <h5>Shaxsiy ma'lumotlar:</h5>
              <ul>
                <li>
                  <p>
                    Jinsi: <span>{currentuser?.genre}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Telefon raqam: <span>{currentuser?.phoneNumber}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Elektron pochta: <span>{currentuser?.email}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Lavozimi: <span>{currentuser?.rol.join(", ")}</span>
                  </p>
                </li>
              </ul>
              <div className="button__wrapper">
                <Button
                  content="Edit profile"
                  width="100%"
                  onClick={currentValidation}
                />
              </div>
            </div>
          ) : (
            <div className="info-edit user-info__wrapper">
              <div className="user_profile">
                <input
                  title="Rasm yuklash"
                  type="file"
                  name="admin-avatar"
                  id="admin-avatar"
                  onChange={uploadImage}
                />
                <i className="icon fa-solid fa-user"></i>
              </div>
              <form
                onSubmit={handleSubmit(saveEditingProfile)}
                className="user-edit-form"
              >
                <div className="input__wrapper">
                  <Input
                    label="Ism:"
                    placeholder="Ismingizni kiriting"
                    errors={errors}
                    error={{
                      error: errors?.firstName?.message ? true : false,
                      errName: errors?.firstName?.message,
                    }}
                    option={{
                      ...register("firstName", {
                        required: "ism kiritilmadi !",
                        value: currentuser?.firstName,
                        minLength: {
                          value: 3,
                          message: "bu darajada qisqa ism bo'lmaydi !",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="input__wrapper">
                  <Input
                    label="Familiya:"
                    placeholder="Familiyangizni kiriting"
                    errors={errors}
                    error={{
                      error: errors?.lastName?.message ? true : false,
                      errName: errors?.lastName?.message,
                    }}
                    option={{
                      ...register("lastName", {
                        required: "familiya kiritilmadi !",
                        value: currentuser?.lastName,
                        minLength: {
                          value: 3,
                          message: "bu darajada qisqa familiya bo'lmaydi !",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="input__wrapper">
                  <Select
                    label="Jinsi:"
                    list={["erkak", "ayol"]}
                    sortData={setGenre}
                    selected={genre}
                    isFormSelect
                  />
                  {errorSpan && !genre ? (
                    <span className="errrorName genre-error-message">
                      Jinsingizni tanlamadingiz !
                    </span>
                  ) : null}
                </div>
                <div className="input__wrapper">
                  <Input
                    require
                    type="number-3"
                    label="Telefon raqam:"
                    placeholder="+998-97-105-05-05"
                    value={phoneNumber}
                    pattern="[+]{1}[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    onChange={(e) => {
                      e.target.setCustomValidity("");
                      setPhoneNumber(e.target.value);
                      if (!e.target.validity.valid) {
                        e.target.setCustomValidity(
                          "Raqam noto'g'ri kiritilgan ! Misol: +998-97-105-05-05"
                        );
                      }
                    }}
                  />
                </div>
                <div className="input__wrapper">
                  <Input
                    label="Elektron pochta:"
                    placeholder="elektron pochta kiriting"
                    errors={errors}
                    error={{
                      error: errors?.email?.message ? true : false,
                      errName: errors?.email?.message,
                    }}
                    option={{
                      ...register("email", {
                        required: "elektron pochta kiritilmadi !",
                        value: currentuser?.email,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "elektron pochtada xatolik",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="input__wrapper">
                  <Input
                    label="Parol:"
                    placeholder="parolni kiriting"
                    errors={errors}
                    error={{
                      error: errors?.password?.message ? true : false,
                      errName: errors?.password?.message,
                    }}
                    option={{
                      ...register("password", {
                        value: currentuser.password,
                        required: "parol kiritilmadi !",
                        minLength: {
                          value: 6,
                          message: "minimal uzunlik 6ta belgi",
                        },
                        maxLength: {
                          value: 16,
                          message: "maxsimal uzunlik 16 ta belgi",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="button__wrapper">
                  <Button
                    type="submit"
                    content="Save"
                    width="100%"
                    disbl={disbl}
                  />
                </div>
                <div className="button__wrapper">
                  <Button
                    type="button"
                    content="Cencel"
                    width="100%"
                    disbl={disbl}
                    onClick={() => resetForm(true)}
                  />
                </div>
              </form>
            </div>
          )}

          <div className="close-modal" onClick={() => avatarView ? setAvatarView(false) : resetForm(false)}></div>
        </div>
      )}

      {/* Profil save Loading */}
      {isLoading && (
        <div className="loading__wrapper">
          <Loading />
        </div>
      )}
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  padding: 13px 0px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 1px 8px 0px #ccc;
  z-index: 20;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user_profile {
    cursor: pointer;
    display: grid;
    place-items: center;

    width: 56px;
    height: 56px;
    border-radius: 100%;
    border: 1px solid #1e90ff;
    background: url(${({ avatar }) => avatar}) no-repeat center center / cover;
    overflow: hidden;

    & > .icon {
      margin-top: 10px;
      color: #ccc;
      font-size: 50px;
      opacity: ${({ avatar }) => (avatar ? "0" : "1")};
    }
  }

  .user-profile-modal {
    padding: 18px 12px 40px;
    position: fixed;
    top: 0;
    left: 0;

    width: 400px;
    height: 100vh;

    background-color: #fff;
    border-right: 1px solid #1e90ff;
    box-shadow: rgba(56, 56, 56, 0.2) 0px 2px 8px 0px;

    z-index: 100;
    animation-name: modalOpening;
    animation-duration: 500ms;
    transition: 300ms ease-in-out;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background: #1e90ff;
    }

    &.closing {
      animation-name: modalClosing;
      animation-duration: 500ms;
      animation-fill-mode: both;
    }

    .modal-close-btn {
      padding: 0px 20px;
      display: flex;
      justify-content: flex-end;

      &.off {
        display: none;
      }

      & > .icon {
        width: max-content;
        cursor: pointer;
        color: #ccc;
        font-size: 36px;
        min-width: max-content;
        min-height: max-content;
        z-index: 2000;
      }
    }

    .user-info__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;

      .user_profile {
        cursor: default;
        width: 106px;
        height: 106px;

        & > .icon {
          font-size: 95px;
        }

        &.On {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          max-width: 380px;
          height: 380px;
          width: 100%;
          border-radius: 0px;
          background-size: contain;
          z-index: 1000;

          &::before {
            position: fixed;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            /* background-color: red; */
            z-index: 900;
          }
        }
      }

      &.On {
        &::before {
          position: fixed;
          content: "";
          top: 0;
          left: 0;
          max-width: 399px;
          width: 100%;
          height: 100vh;
          z-index: 900;
          background-color: #000;
        }

        .user_profile {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          max-width: 380px;
          height: 380px;
          width: 100%;
          border-radius: 0px;
          background-size: contain;
          z-index: 1000;

          &::before {
            position: fixed;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            /* background-color: red; */
            z-index: 900;
          }
        }
      }

      h5 {
        margin: 16px 0;
      }

      ul {
        padding: 0px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 22px;

        li {
          width: 270px;
          max-width: 270px;

          p {
            margin: 0px;
            font-weight: 700;
          }

          span {
            margin-left: 8px;
            font-weight: 400;
          }
        }
      }

      .button__wrapper {
        width: 260px;
      }

      &.info-edit {
        .user_profile {
          cursor: pointer;
          position: relative;
          background: url(${({ image }) => image}) no-repeat center center /
            cover;

          & > .icon {
            opacity: ${({ image }) => (image ? "0" : "1")} !important;

            &::after {
              pointer-events: none !important;
            }
          }

          & > input#admin-avatar {
            cursor: pointer;
            position: absolute;
            top: -35px;
            left: 0;

            width: 100%;
            min-height: 142px;
            z-index: 10;
          }

          &::after {
            content: "+";
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 100%;
            background-color: #00000036;

            color: #0080ff;
            font-size: 120px;
            font-weight: 400;

            transition: 300ms ease-in-out;
            opacity: 0;
          }

          &:hover {
            &::after,
            &::before {
              opacity: 1;
            }
          }
        }

        .user-edit-form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 20px;
          animation-name: modalOpeningStaticPosition;
          animation-duration: 500ms;
          transition: 300ms ease-in-out;

          .input__wrapper {
            width: 260px;
            max-width: 260px;

            label {
              /* margin-bottom: -8px; */
              font-weight: 600;
            }
          }
        }
      }
    }

    .close-modal {
      position: fixed;
      top: 0;
      left: 400px;
      width: 100%;
      height: 100vh;
      background-color: transparent;
    }
  }

  /* loading */
  .loading__wrapper {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    backdrop-filter: blur(0.7px);
    z-index: 100;
  }

  @media (max-width: 460px) {
    .user-profile-modal {
      width: 100%;

      .close-modal {
        display: none;
      }
    }
  }
`;
