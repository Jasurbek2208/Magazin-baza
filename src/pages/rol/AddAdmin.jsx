import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Style
import { StyledSavdoForm } from "../../assets/style/formStyles";

// Components
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";

export default function AddAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //
  const location = useLocation().pathname;
  const navigate = useNavigate();
  //
  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numValue, setNumValue] = useState("");

  // LIST
  const list = [
    "Savdo-sotiq bo'limi bosh ma'suli",
    "Mahsulot sotish bo'limi ma'suli",
    "Mahsulot sotib olish bo'limi ma'suli",
    "Taminot bo'limi bosh ma'suli",
    "Oziq-ovqat taminoti bo'limi ma'suli",
    "Korxona ta'minoti bo'limi ma'suli",
    "Ombor kuzatuvchisi",
    "Bosh menejer",
  ];

  // selectedLists
  const [selectedLists, setSelectedLists] = useState([]);

  async function addAdmin(data) {
    data = { ...data, rol: selectedLists };
    setDisbl(true);
    // data = { ...data, check: image, masulShaxs: "Shomaqsudov Jasurbek" };

    // try {
    //   data = null;
    //   setNumValue("");
    //   // reset({ email: "" });
    //   navigate("..");
    //   toast.success("Admin muvofaqiyatli qo'shildi !");
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setDisbl(false);
    // }
  }

  function addSelectList(currList) {
    console.log(currList);
    let newList = [];
    if (selectedLists.includes(currList)) {
      newList = selectedLists.filter((j) => (j === currList ? false : true));
      setSelectedLists(newList);
    } else {
      setSelectedLists((p) => [...p, currList]);
    }
  }

  return (
    <StyledSavdoForm>
      <div className="container">
        <h1>Add Admin</h1>
        <form onSubmit={handleSubmit(addAdmin)} className="form__wrapper">
          <div className="input__wrapper">
            <Input
              label="Ism"
              placeholder="ism kiriting"
              errors={errors}
              error={{
                error: errors?.ism?.message ? true : false,
                errName: errors?.ism?.message,
              }}
              option={{
                ...register("ism", {
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
                error: errors?.familiya?.message ? true : false,
                errName: errors?.familiya?.message,
              }}
              option={{
                ...register("familiya", {
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
            <ul className="select-lists">
              {list.map((i, idx) => (
                <li key={i + idx} className="list-wrapper">
                  <input
                    onChange={() => addSelectList(i)}
                    type="checkbox"
                    id={"checkbox" + idx}
                  />
                  <label htmlFor={"checkbox" + idx}>{i}</label>
                </li>
              ))}
            </ul>
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

// const StyledAddAdmin = styled.div`

// `
