import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TabTitle } from 'utils'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

// Style
import { StyledSavdoForm } from '../../assets/style/formStyles'

// Firebase
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

// Components
import { Input, Button } from 'components'

// Custom Hooks
import { addStoreHistory, getStoreHistory, numSort } from 'hooks'

const SavdoForm = memo(() => {
  const location = useLocation().pathname
  // Title
  location === '/mahsulot-sotish' ? TabTitle('Mahsulot-Sotish | Magazin Baza') : TabTitle('Mahsulot-Sotib-Olish | Magazin Baza')
  //
  const [disbl, setDisbl] = useState<any>(false)
  const [error, setError] = useState<any>({
    nomi: false,
    soni: false,
    korxonaNomi: false,
  })

  const [products, setProducts] = useState<any>()
  const [companies, setCompanies] = useState<any>()

  const [filteredData, setFilteredData] = useState<any>([])
  const [filteredCompaniesData, setFilteredCompaniesData] = useState<any>([])

  const [isSelect, setIsSelect] = useState<any>('')
  const [isCompanySelect, setIsCompanySelect] = useState<any>('')

  const [isOpen, setIsOpen] = useState<any>(false)
  const [isCompaniesOpen, setIsCompaniesOpen] = useState<any>(false)

  const [numValue, setNumValue] = useState<any>('')
  const [mahsulotName, setMahsulotName] = useState<any>({
    mahsulotNomi: '',
    soni: '',
    narxi: '',
    qaysiKorxonagaSotildi: '',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // navigate
  const navigate = useNavigate()

  // POST PRODUCTS
  async function addProducts(data: any) {
    setDisbl(true)
    setMahsulotName((p: any) => ({ ...p, mahsulotNomi: data?.mahsulotNomi }))

    let g = data?.soni
      ?.split('')
      ?.filter(
        (i: number) =>
          String(i) === '0' ||
          String(i) === '1' ||
          String(i) === '2' ||
          String(i) === '3' ||
          String(i) === '4' ||
          String(i) === '5' ||
          String(i) === '6' ||
          String(i) === '7' ||
          String(i) === '8' ||
          String(i) === '9',
      )
    data.soni = g.join('')

    let newData: any = products
    let isNomiError = true
    let isKorxonaNomiError = true
    let isSoniError = false
    let narxi = '0'

    data.mahsulotNomi = isSelect
    data.qaysiKorxonagaSotildi = isCompanySelect
    data.qaysiKorxonadanSotibOlindi = isCompanySelect
    data.id = v4()

    newData?.map((i: any) => {
      if (i?.mahsulotNomi === isSelect) {
        narxi = i?.narxi
        isNomiError = false
        if (location === '/mahsulot-sotish') {
          if (Number(i?.soni) > Number(numValue)) {
            i.soni = Number(i?.soni - numValue)
          } else {
            isSoniError = true
            setMahsulotName((p: any) => ({ ...p, soni: numSort(i?.soni) }))
          }
        } else {
          i.soni = Number(i?.soni + Number(numValue))
          data.soni = numValue
        }
      }
    })

    companies?.map((i: any) => {
      if (i?.name === isCompanySelect) {
        isKorxonaNomiError = false
      }
    })

    if (isNomiError) setError((p: any) => ({ ...p, nomi: true }))
    if (isSoniError) setError((p: any) => ({ ...p, soni: true }))
    if (isKorxonaNomiError) setError((p: any) => ({ ...p, korxonaNomi: true }))

    if (!isNomiError && !isSoniError && !isKorxonaNomiError) {
      try {
        addStoreHistory(data, narxi, location)
        await setDoc(doc(db, 'storage2', 'RQVXHDw3ev7t7N37HU1M'), {
          products: newData,
        })
        getDatas()
        setIsSelect('')
        setIsCompanySelect('')
        setNumValue('')
        data = {
          mahsulotNomi: '',
          soni: '',
          qaysiKorxonagaSotildi: '',
          qaysiKorxonadanSotibOlindi: '',
        }
        reset({
          mahsulotNomi: '',
          soni: '',
          qaysiKorxonagaSotildi: '',
          qaysiKorxonadanSotibOlindi: '',
        })
        setMahsulotName({
          mahsulotNomi: '',
          soni: '',
          narxi: '',
        })
        navigate('..')
        location === '/mahsulot-sotish' ? toast.success('Mahsulot muvofaqiyatli sotildi !') : toast.success('Mahsulot muvofaqiyatli sotib olindi !')
      } catch (err) {
        console.log(err)
        location === '/mahsulot-sotish' ? toast.success("Mahsulot sotishda xatolik yoki internet o'chiq !") : toast.success("Mahsulot sotib olishda xatolik yoki internet o'chiq !")
      } finally {
        localStorage.removeItem('storeHistory')
        getStoreHistory()
        setDisbl(false)
      }
    }
  }
  //////////////////////////////////

  // SEARCH FUNCTION===============================
  // products search
  function searchProducts(search: any) {
    setIsSelect(search?.target?.value)

    setIsOpen(true)
    let curProducts = products
    let curData = []

    if (search?.target?.value === '') {
      curData = []
    } else {
      curData = curProducts?.filter((i: any) => (i?.mahsulotNomi?.toLowerCase().includes(search?.target?.value.toLowerCase()) ? true : false))
    }
    setFilteredData(curData)
  }

  // companies search
  function searchCompanies(search: any) {
    setIsCompanySelect(search?.target?.value)

    setIsCompaniesOpen(true)
    let curProducts = companies
    let curData = []

    if (search?.target?.value === '') {
      curData = []
    } else {
      curData = curProducts?.filter((i: any) => (i?.name?.toLowerCase().includes(search?.target?.value.toLowerCase()) ? true : false))
    }
    setFilteredCompaniesData(curData)
  }
  // ================================================

  // GetDatas
  function getDatas() {
    try {
      onSnapshot(doc(db, 'storage2', 'RQVXHDw3ev7t7N37HU1M'), (doc: any) => {
        setProducts(doc?.data()?.products)
      })
      onSnapshot(doc(db, 'storage2', 'nDLTOuF4yuVFKBhwmCRC'), (doc: any) => {
        setCompanies(doc?.data()?.companies)
      })
    } catch (err) {
      console.log(err)
    }
  }

  //
  useEffect(() => {
    getDatas()
  }, [])

  return (
    <StyledSavdoForm>
      <div className='container'>
        {location === '/mahsulot-sotish' ? <h1>Mahsulot sotish</h1> : <h1>Mahsulot sotib olish</h1>}
        <form onSubmit={handleSubmit(addProducts)} className='form__wrapper'>
          <div className='input__wrapper'>
            <Input
              value={isSelect}
              errors={errors}
              errName='mahsulotNomi'
              error={{
                error: error?.nomi,
                errName: `Omborda bunday mahsulot yo'q !`,
              }}
              placeholder='Mahsulot nomini kiriting'
              label='Mahsulot nomi *'
              option={{
                ...register('mahsulotNomi', {
                  required: 'Mahsulot nomi kiritilmadi !',
                  onChange: (e): any => {
                    searchProducts(e)
                    setError(false)
                  },
                }),
              }}
            />
            {filteredData?.length > 0 && isOpen ? (
              <div className='currProduct'>
                <ul>
                  {filteredData?.map((i: any, idx: number) => (
                    <li key={`${i?.mahsulotNomi?.replaceAll(' ', '')}-${idx}`}>
                      <button
                        type='button'
                        onClick={() => {
                          setIsSelect(i?.mahsulotNomi)
                          setIsOpen(false)
                        }}>
                        {i?.mahsulotNomi}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className='input__wrapper'>
            <Input
              onChange={(e: any) => {
                setNumValue(e)
                setError(false)
              }}
              type='number'
              value={numValue}
              errors={errors}
              error={{
                error: error?.soni,
                errName: `Omborda ${mahsulotName.mahsulotNomi} ${mahsulotName.soni} ta bor. Bundan ko'p mahsulot sotaolmaysiz !`,
              }}
              errName='soni'
              placeholder='Mahsulotdan qancha sotishingizni kiriting'
              label='Soni *'
              option={{
                ...register('soni', {
                  required: location === '/mahsulot-sotish' ? 'Mahsulot qancha sotilishi kiritilmadi !' : 'Mahsulot qancha sotib olinishi kiritilmadi !',
                  minLength: {
                    value: 3,
                    message: location === '/mahsulot-sotish' ? 'Minimal 100 ta sotish mumkin !' : 'Minimal 100 ta sotib olish mumkin !',
                  },
                }),
              }}
            />
          </div>
          <div className='input__wrapper'>
            {location === '/mahsulot-sotish' ? (
              <Input
                value={isCompanySelect}
                errors={errors}
                error={{
                  error: error?.korxonaNomi,
                  errName: `Omborda bunday korxona yoki shaxs ro'yxatdan o'tilmagan !`,
                }}
                errName='qaysiKorxonagaSotildi'
                placeholder='Qaysi korxonaga sotishingizni kiriting'
                label='Qaysi korxonaga sotmoqchsiz ? *'
                option={{
                  ...register('qaysiKorxonagaSotildi', {
                    required: 'Qaysi korxonaga sotishingizni kiriting !',
                    onChange: (e): any => {
                      searchCompanies(e)
                      setError(false)
                    },
                  }),
                }}
              />
            ) : (
              <Input
                value={isCompanySelect}
                errors={errors}
                errName='qaysiKorxonadanSotibOlindi'
                error={{
                  error: error?.korxonaNomi,
                  errName: `Omborda bunday korxona yoki shaxs ro'yxatdan o'tilmagan !`,
                }}
                placeholder='Qaysi korxonadan olishingizni kiriting'
                label='Qaysi korxonadan sotib olmoqchsiz ? *'
                option={{
                  ...register('qaysiKorxonadanSotibOlindi', {
                    required: 'Qaysi korxonadan sotib olishingizni kiriting !',
                    onChange: (e): any => {
                      searchCompanies(e)
                      setError(false)
                    },
                  }),
                }}
              />
            )}
            {filteredCompaniesData?.length > 0 && isCompaniesOpen ? (
              <div className='currProduct'>
                <ul>
                  {filteredCompaniesData?.map((i: any, idx: number) => (
                    <li key={`${i?.name}-${idx}`}>
                      <button
                        type='button'
                        onClick={() => {
                          setIsCompanySelect(i?.name)
                          setIsCompaniesOpen(false)
                        }}>
                        {i?.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className='input__wrapper'>
            {location === '/mahsulot-sotish' ? (
              <Button disbl={disbl} width='100%' type='submit' content='Mahsulotni sotish' />
            ) : (
              <Button disbl={disbl} width='100%' type='submit' content='Mahsulotni sotib olish' />
            )}
          </div>
        </form>
      </div>
    </StyledSavdoForm>
  )
})

export default SavdoForm