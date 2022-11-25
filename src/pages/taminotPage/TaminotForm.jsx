import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidV4 } from "uuid";

// Firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Style
import { StyledSavdoForm } from "../../assets/style/formStyles";

// Components
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { addStoreHistory } from "../../customHooks/useAddStoreHistory";

export default function TaminotForm() {
  const location = useLocation().pathname;

  //
  const [image, setImage] = useState("");
  const [disbl, setDisbl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numValue, setNumValue] = useState("");

  //
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // navigate
  const navigate = useNavigate();

  // Historyga Check qo'shish
  async function addSupply(data) {
    if (!image) return;
    setDisbl(true);
    data = { ...data, check: image, masulShaxs: "Shomaqsudov Jasurbek" };

    try {
      addStoreHistory(data, null, location);
      data = null;
      setNumValue("");
      reset({ soni: "" });
      navigate("..");
      toast.success("Check muvofaqiyatli qo'shildi !");
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  }

  // Storagega rasm yuklash
  function uploadImage(e) {
    setIsLoading(true);
    const storage = getStorage();
    const urlName =
      (location === "/oziq-ovqat-uchun-chiqim"
        ? "oziqOvqatCheck/"
        : "korxonaTaminotCheck/") + `check-${uuidV4()}`;
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
          checkWatcher(true);
        });
      }
    );
  }

  // img watcher
  function checkWatcher(isTrue = false) {
    image || isTrue === true ? setError(false) : setError(true);
  }

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
                checkWatcher();
              }}
              type="number"
              value={numValue}
              errors={errors}
              error={{
                error: errors?.soni?.message ? true : false,
                errName: errors?.soni?.message,
              }}
              placeholder="Sarflangan chiqimni kiriting"
              label="Sarflangan budjet (so'mda) *"
              option={{
                ...register("soni", {
                  required: "sarflangan chiqim kiritmadi !",
                  minLength: {
                    value: 4,
                    message:
                      location === "/oziq-ovqat-uchun-chiqim"
                        ? "Minimal narx 1000 so'm !"
                        : "Minimal narx 1000 so'm !",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Input
              onChange={(e) => {
                uploadImage(e);
                checkWatcher();
              }}
              error={{ error, errName: "check yuklanmagan !" }}
              image={image}
              isLoading={isLoading}
              label="Checkni yuborish *"
              type="file"
            />
          </div>
          <div className="input__wrapper">
            <Button
              disbl={disbl}
              onClick={checkWatcher}
              isLoading={isLoading}
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
