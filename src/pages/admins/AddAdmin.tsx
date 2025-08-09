import { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { TabTitle } from 'utils'
import { v4 } from 'uuid'

// Firebase
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { db } from '../../firebase'

// Style
import { StyledSavdoForm } from '../../assets/style/formStyles'

// Components
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Select from '../../components/select/Select'

const AddAdmin = memo(() => {
  TabTitle("Admin qo'shish | Magazin Baza")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const navigate = useNavigate()

  const [disbl, setDisbl] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // LIST state
  const [list, setList] = useState([])

  // Admins list state
  const [adminsList, setAdminsList] = useState([])

  const [genre, setGenre] = useState('')
  const [errorSpan, setErrorSpan] = useState<string | boolean>('')
  const [phoneNumber, setPhoneNumber] = useState<string[] | string>([])

  // selectedLists
  const [selectedLists, setSelectedLists] = useState<string[]>([])

  // Get select List
  async function getSelectList() {
    try {
      onSnapshot(doc(db, 'storage2', 'qvPnVigdL7HPevjHAk5K'), (doc) => setList(doc?.data()?.rol))
      onSnapshot(doc(db, 'users', 'hjJzOpbuR3XqjX817DGvJMG3Xr82'), (doc) => setAdminsList(doc?.data()?.admins))
    } catch (error) {
      console.log(error)
    }
  }

  // Add ADMIN !
  async function addAdmin(data: any) {
    if (!genre) return setErrorSpan(true)

    if (selectedLists?.length < 1 || selectedLists?.length > 2) return setError(true)

    setDisbl(true)

    data = { ...data, rol: selectedLists }
    setDisbl(true)
    setIsLoading(true)

    try {
      const auth = getAuth()

      await createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
        const user = userCredential.user
        data = { ...data, phoneNumber, avatar: '', genre, id: v4(), accessToken: user?.uid }
      })

      if (data.accessToken) await setDoc(doc(db, 'users', 'hjJzOpbuR3XqjX817DGvJMG3Xr82'), { admins: [...adminsList, data] })

      data = null
      setPhoneNumber('')
      setGenre('')
      reset({ firstName: '', lastName: '', email: '', password: '', rol: [] })
      navigate('..')
      toast.success("Admin muvofaqiyatli qo'shildi !")
    } catch (error) {
      console.log(error)
      toast.error("Admin qo'shishda xatolik yuzaga keldi, qaytadan urinib ko'ring !")
    } finally {
      setDisbl(false)
      setIsLoading(false)
    }
  }

  // Add cheched list
  function addSelectList(currList: string) {
    let newList = []

    if (selectedLists?.includes(currList)) {
      newList = selectedLists?.filter((j) => (j === currList ? false : true))
      setSelectedLists(newList)
    } else {
      setSelectedLists((p: any) => [...p, currList])
    }
  }

  // Selected lists Error watcher !!!
  useEffect(() => {
    if (selectedLists?.includes('Bosh menejer') && selectedLists?.length > 1) {
      setError(false)
      let newList = []
      newList = selectedLists?.filter((i) => (i === 'Bosh menejer' ? true : false))
      setSelectedLists(newList)
      return
    }
    if (selectedLists?.length > 2) {
      setError(true)
    } else {
      setError(false)
    }
  }, [selectedLists])

  // Checkbox disabled ?
  function disablWatcher(i: any) {
    let boolen = null
    selectedLists?.includes('Bosh menejer') ? (i !== 'Bosh menejer' ? (boolen = true) : (boolen = false)) : (boolen = false)
    return boolen
  }

  // watching genre select changing
  useEffect(() => {
    setErrorSpan(false)
  }, [genre])

  // get Select List
  useEffect(() => {
    getSelectList()
  }, [])

  return (
    <StyledSavdoForm>
      <div className='container'>
        <h1>Admin qo'shish</h1>
        <form onSubmit={handleSubmit(addAdmin)} className='form__wrapper'>
          <div className='input__wrapper'>
            <Input
              label='Ism'
              placeholder='ism kiriting'
              errors={errors}
              error={{
                error: errors?.firstName?.message ? true : false,
                errName: errors?.firstName?.message,
              }}
              option={{
                ...register('firstName', {
                  required: 'ism kiritilmadi !',
                  minLength: {
                    value: 3,
                    message: "bu darajada qisqa ism bo'lmaydi !",
                  },
                }),
              }}
            />
          </div>
          <div className='input__wrapper'>
            <Input
              label='Familiya'
              placeholder='familiya kiriting'
              errors={errors}
              error={{
                error: errors?.lastName?.message ? true : false,
                errName: errors?.lastName?.message,
              }}
              option={{
                ...register('lastName', {
                  required: 'familiya kiritilmadi !',
                  minLength: {
                    value: 3,
                    message: "bu darajada qisqa familiya bo'lmaydi !",
                  },
                }),
              }}
            />
          </div>
          <div className='input__wrapper'>
            <Input
              require
              type='number-3'
              value={phoneNumber}
              pattern='[+]{1}[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}'
              onChange={(e: any) => {
                e?.target?.setCustomValidity('')
                setPhoneNumber(e?.target?.value)
                if (!e?.target?.validity?.valid) e?.target?.setCustomValidity("Raqam noto'g'ri kiritilgan ! Misol: +998-97-105-05-05")
              }}
              placeholder='+998-97-105-05-05'
              label='Telefon raqam'
            />
          </div>
          <div className='input__wrapper'>
            <Select label='Jinsi' list={['erkak', 'ayol']} sortData={setGenre} outlineStyle isFormSelect />
            {errorSpan && !genre ? <span className='errrorName genre-error-message'>Jinsingizni tanlamadingiz !</span> : null}
          </div>
          <div className='input__wrapper'>
            <Input
              label='Elektron pochta'
              placeholder='elektron pochta kiriting'
              errors={errors}
              error={{
                error: errors?.email?.message ? true : false,
                errName: errors?.email?.message,
              }}
              option={{
                ...register('email', {
                  required: 'elektron pochta kiritilmadi !',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'elektron pochtada xatolik',
                  },
                }),
              }}
            />
          </div>
          <div className='input__wrapper'>
            <Input
              label='Parol'
              placeholder='hoxlagan yangi parolingiz...'
              errors={errors}
              error={{
                error: errors?.password?.message ? true : false,
                errName: errors?.password?.message,
              }}
              option={{
                ...register('password', {
                  required: 'parol kiritilmadi !',
                  minLength: { value: 6, message: 'minimal uzunlik 6ta belgi' },
                  maxLength: {
                    value: 16,
                    message: 'maxsimal uzunlik 16 ta belgi',
                  },
                }),
              }}
            />
          </div>
          <div className='input__wrapper'>
            <span className='select-lists-title'>Qaysi ma'suliyatlarni bermoqchisiz ?</span>
            <ul className={(error ? 'error ' : '') + 'select-lists'}>
              {list.map((i, idx) => (
                <li key={i + idx} className={(selectedLists?.includes('Bosh menejer') ? (i !== 'Bosh menejer' ? 'not-select ' : '') : '') + ' list-wrapper'}>
                  <input onChange={() => addSelectList(i)} type='checkbox' disabled={disablWatcher(i)} checked={selectedLists?.includes(i) ? true : false} id={'checkbox' + idx} />
                  <label htmlFor={'checkbox' + idx}>{i}</label>
                </li>
              ))}
            </ul>
            {error && <label className='errrorName'>Maximal 2tagacha belgilash mumkin !</label>}
          </div>
          <div className='input__wrapper'>
            <Button disbl={disbl} isLoading={isLoading} width='100%' type='submit' content='Tasdiqlash' />
          </div>
        </form>
      </div>
    </StyledSavdoForm>
  )
})

export default AddAdmin