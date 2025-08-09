import { useState, useEffect, memo, useCallback } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Layouts
import PagesLayout from 'layout/PagesLayout'

// Pages
import { Home, Login, Kassa, AddAdmin, AdminsPage, AdminsList, AddCompany, SavdoForm, CompanyPage, TaminotForm, TaminotPage, StoragePage, CompaniesList, MarketingPage, AddProductList } from 'pages'

// Custom Hooks
import { getStoreHistory } from 'hooks'

// Firebase
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Router = memo(() => {
  const location = useLocation()?.pathname

  // redux
  const dispatch = useDispatch()

  let localNum: number = 0
  const isAuth = useSelector((s: any) => s?.isAuth)

  // Admins's rol state
  const [userPosit, setUserPosit] = useState<any>(null)
  const [currentuser, setCurrentUser] = useState<any>(null)
  const [admins, setAdmins] = useState<any>(null)

  useEffect(() => {
    if (location !== '/home') window?.scrollTo(0, 0)
  }, [location])

  // Watching and inspection pirats
  useEffect(() => {
    localNum += 1
    if (isAuth && localNum === 1) userPosition()

    if (JSON?.parse((localStorage?.getItem('ISAUTH') as any) || 'false') && !localStorage?.getItem('TOKEN')) {
      dispatch({ type: 'LOG_OUT' })
    }
  }, [isAuth])

  //
  const userPosition = useCallback(() => {
    onSnapshot(doc(db, 'users', 'hjJzOpbuR3XqjX817DGvJMG3Xr82'), (doc) => {
      setAdmins(doc?.data()?.admins)

      doc?.data()?.admins.map((currUser: any) => {
        if (localStorage?.getItem('TOKEN') === currUser?.accessToken) {
          getStoreHistory()
          setCurrentUser(currUser)
          setUserPosit(currUser?.rol)

          localStorage?.setItem('lastRol', currUser?.firstName + ' ' + currUser?.lastName)
        }
      })
    })
  }, [])

  if (isAuth) {
    return (
      <Routes>
        <Route element={<PagesLayout currentuser={currentuser} admins={admins} />}>
          <Route path='home' element={<Home />} />
          {currentuser?.accessToken === localStorage?.getItem('TOKEN') ? (
            <>
              {userPosit?.includes('Ombor kuzatuvchisi') ? <Route path='ombor' element={<StoragePage />} /> : null}

              {userPosit?.includes("Mahsulot sotish bo'limi ma'suli") ? (
                <>
                  <Route path='savdo' element={<MarketingPage />} />
                  <Route path='mahsulot-sotish' element={<SavdoForm />} />
                </>
              ) : null}

              {userPosit?.includes("Mahsulot sotib olish bo'limi ma'suli") ? (
                <>
                  <Route path='savdo' element={<MarketingPage />} />
                  <Route path='mahsulot-sotib-olish' element={<SavdoForm />} />
                </>
              ) : null}

              {userPosit?.includes("Korxona ta'minoti bo'limi ma'suli") ? (
                <>
                  <Route path='taminot' element={<TaminotPage />} />
                  <Route path='korxona-uchun-taminot' element={<TaminotForm />} />
                </>
              ) : null}

              {userPosit?.includes("Oziq-ovqat taminoti bo'limi ma'suli") ? (
                <>
                  <Route path='taminot' element={<TaminotPage />} />
                  <Route path='oziq-ovqat-uchun-chiqim' element={<TaminotForm />} />

                  <Route path='company-page' element={<CompanyPage />} />
                  <Route path='kompaniya-qoshish' element={<AddCompany />} />
                  <Route path='kompaniyalar-royxati' element={<CompaniesList />} />
                </>
              ) : null}

              {userPosit?.includes('Boss') || userPosit?.includes('Bosh menejer') ? (
                <>
                  <Route path='ombor' element={<StoragePage />} />

                  <Route path='savdo' element={<MarketingPage />} />
                  <Route path='mahsulot-sotish' element={<SavdoForm />} />
                  <Route path='mahsulot-sotib-olish' element={<SavdoForm />} />
                  <Route path='mahsulot-omborga-qoshish' element={<AddProductList />} />

                  <Route path='taminot' element={<TaminotPage />} />
                  <Route path='korxona-uchun-taminot' element={<TaminotForm />} />
                  <Route path='oziq-ovqat-uchun-chiqim' element={<TaminotForm />} />

                  <Route path='company-page' element={<CompanyPage />} />
                  <Route path='kompaniya-qoshish' element={<AddCompany />} />
                  <Route path='kompaniyalar-royxati' element={<CompaniesList />} />

                  <Route path='admins-page' element={<AdminsPage />} />
                  <Route path="admin-qo'shish" element={<AddAdmin />} />
                  <Route path='adminlar-royxati' element={<AdminsList />} />
                </>
              ) : null}

              <Route path='kassa' element={<Kassa />} />
              <Route path='*' element={<Navigate to='home' />} />
            </>
          ) : null}
        </Route>
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Routes>
    )
  }
})

export default Router
