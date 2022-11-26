import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Style
import { StyledSavdoForm } from "../../assets/style/formStyles";

// Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useEffect } from "react";

export default function AddAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // LIST state
  const [list, setList] = useState([]);
  // selectedLists
  const [selectedLists, setSelectedLists] = useState([]);

  // Get select List
  async function getSelectList() {
    try {
      onSnapshot(doc(db, "storage2", "qvPnVigdL7HPevjHAk5K"), (doc) => {
        setList(doc?.data()?.rol);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // Add ADMIN !
  async function addAdmin(data) {
    if (selectedLists.length < 1 || selectedLists.length > 2) {
      setError(true);
      return;
    }
    data = { ...data, rol: selectedLists };
    console.log(data);
    setDisbl(true);
    setIsLoading(true);

    try {
      // addStoreHistory(data, narxi, location);
      // await setDoc(doc(db, "users", "RQVXHDw3ev7t7N37HU1M"), {
      //   products: newData,
      // });
      data = null;
      reset({ firstName: "", lastName: "", email: "", password: "", rol: [] });
      navigate("..");
      toast.success("Admin muvofaqiyatli qo'shildi !");
    } catch (error) {
      console.log(error);
      toast.error(
        "Admin qo'shishda xatolik yuzaga keldi, qaytadan urinib ko'ring !"
      );
    } finally {
      setDisbl(false);
      setIsLoading(false);
    }
  }

  // Add cheched list
  function addSelectList(currList) {
    let newList = [];
    if (selectedLists.includes(currList)) {
      newList = selectedLists.filter((j) => (j === currList ? false : true));
      setSelectedLists(newList);
    } else {
      setSelectedLists((p) => [...p, currList]);
    }
  }

  // Selected lists Error watcher !!!
  useEffect(() => {
    if (selectedLists.includes("Bosh menejer") && selectedLists.length > 1) {
      setError(false);
      let newList = [];
      newList = selectedLists.filter((i) =>
        i === "Bosh menejer" ? true : false
      );
      setSelectedLists(newList);
      return;
    }
    if (selectedLists.length > 2) {
      setError(true);
    } else {
      setError(false);
    }
  }, [selectedLists]);

  // Checkbox disabled ?
  function disablWatcher(i) {
    let boolen = null;
    selectedLists.includes("Bosh menejer")
      ? i !== "Bosh menejer"
        ? (boolen = true)
        : (boolen = false)
      : (boolen = false);
    return boolen;
  }

  // get Select List
  useEffect(() => {
    getSelectList();
  }, []);

  return (
    <StyledSavdoForm>
      <div className="container">
        <h1>Admin qo'shish</h1>
        <form onSubmit={handleSubmit(addAdmin)} className="form__wrapper">
          <div className="input__wrapper">
            <Input
              label="Ism"
              placeholder="ism kiriting"
              errors={errors}
              error={{
                error: errors?.firstName?.message ? true : false,
                errName: errors?.firstName?.message,
              }}
              option={{
                ...register("firstName", {
                  required: "ism kiritilmadi !",
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
              label="Familiya"
              placeholder="familiya kiriting"
              errors={errors}
              error={{
                error: errors?.lastName?.message ? true : false,
                errName: errors?.lastName?.message,
              }}
              option={{
                ...register("lastName", {
                  required: "familiya kiritilmadi !",
                  minLength: {
                    value: 3,
                    message: "bu darajada qisqa familiya bo'lmaydi !",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Input
              label="Email"
              placeholder="email kiriting"
              errors={errors}
              error={{
                error: errors?.email?.message ? true : false,
                errName: errors?.email?.message,
              }}
              option={{
                ...register("email", {
                  required: "email kiritilmadi !",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <Input
              label="Parol"
              placeholder="hoxlagan yangi parolingiz..."
              errors={errors}
              error={{
                error: errors?.password?.message ? true : false,
                errName: errors?.password?.message,
              }}
              option={{
                ...register("password", {
                  required: "parol kiritilmadi !",
                  minLength: { value: 6, message: "minimal uzunlik 6ta belgi" },
                  maxLength: {
                    value: 16,
                    message: "maxsimal uzunlik 16 ta belgi",
                  },
                }),
              }}
            />
          </div>
          <div className="input__wrapper">
            <span className="select-lists-title">
              Qaysi ma'suliyatlarni bermoqchisiz ?
            </span>
            <ul className={(error ? "error " : "") + "select-lists"}>
              {list.map((i, idx) => (
                <li
                  key={i + idx}
                  className={
                    (selectedLists.includes("Bosh menejer")
                      ? i !== "Bosh menejer"
                        ? "not-select "
                        : ""
                      : "") + " list-wrapper"
                  }
                >
                  <input
                    onChange={() => addSelectList(i)}
                    type="checkbox"
                    disabled={disablWatcher(i)}
                    checked={selectedLists.includes(i) ? true : false}
                    id={"checkbox" + idx}
                  />
                  <label htmlFor={"checkbox" + idx}>{i}</label>
                </li>
              ))}
            </ul>
            {error && (
              <label className="errrorName">
                Maximal 2tagacha belgilash mumkin !
              </label>
            )}
          </div>
          <div className="input__wrapper">
            <Button
              disbl={disbl}
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
