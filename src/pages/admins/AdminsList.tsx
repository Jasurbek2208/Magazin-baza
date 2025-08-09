import { useEffect, useState, useRef, memo } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { TabTitle } from 'utils'
import { StyledStorage } from '../storagePage/StoragePage'

// Firebase
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

// Components
import { Button, Select, Input } from 'components'
import CurrentModal from './CurrentModal'

const AdminsList = memo(() => {
  TabTitle("Adminlar ro'yxati | Magazin Baza")

  // Admins's rol state
  const [userPosit, setUserPosit] = useState<string[]>([''])

  // For info Modal
  const [currentModalIsOpen, setCurrentModalIsOpen] = useState<boolean>(false)
  const [currentAdmin, setCurrentAdmin] = useState<any>()

  let tableNum: number = 1

  const [admins, setAdmins] = useState<any>()
  const [filteredData, setFilteredData] = useState<any>()
  const [sortedData, setSortedData] = useState<string>('')

  // table excel
  const tableRef = useRef(null)

  useEffect(() => {
    onSnapshot(doc(db, 'users', 'hjJzOpbuR3XqjX817DGvJMG3Xr82'), (doc) => {
      setAdmins(doc?.data()?.admins)
      setFilteredData(doc?.data()?.admins)

      doc?.data()?.admins?.map((currUser: any) => {
        if (localStorage?.getItem('TOKEN') === currUser?.accessToken) setUserPosit(currUser?.rol)
      })
    })
  }, [])

  // SORT admins
  function sortData(sort: string) {
    setSortedData(sort)

    sort?.includes('Ism')
      ? sort?.includes('(A-Z)')
        ? setFilteredData([...admins]?.sort((a, b) => a?.firstName?.localeCompare(b?.firstName)))
        : setFilteredData([...admins]?.sort((a, b) => b?.firstName?.localeCompare(a?.firstName)))
      : sort?.includes('(A-Z)')
      ? setFilteredData([...admins]?.sort((a, b) => a?.lastName?.localeCompare(b?.lastName)))
      : setFilteredData([...admins]?.sort((a, b) => b?.lastName?.localeCompare(a?.lastName)))
  }

  // SEARCH FUNCTION
  function searchadmins(search: any) {
    let curadmins = admins
    let curData = []

    if (search?.target?.value === '') {
      curData = []
      sortData(sortedData)
    } else {
      curData = curadmins?.filter((i: any) => (i?.firstName?.toLowerCase()?.includes(search?.target?.value?.toLowerCase()) ? true : false))
      setFilteredData(curData)
    }
  }

  // Checking admin position
  function positionCheck(i: any) {
    if (userPosit?.includes('Boss') || userPosit?.includes('Bosh menejeer')) {
      setCurrentAdmin(i)
      return true
    }

    return false
  }

  return (
    <StyledStorage>
      <nav className='customize_navbar'>
        <div className='container'>
          <ul>
            <li>
              <DownloadTableExcel filename='admins table' sheet='admins' currentTableRef={tableRef.current}>
                <Button content='Excel yuklash' width='100%' customize={true} isDownloadble={true} />
              </DownloadTableExcel>
            </li>
            <li>
              <Select content='Sort' sortData={sortData} list={['Ism (A-Z)', 'Ism (Z-A)', 'Familiya (A-Z)', 'Familiya (Z-A)']} />
            </li>
            <li>
              <Input placeholder="Qidiruv(ism bo'yicha)..." onChange={searchadmins} />
            </li>
          </ul>
        </div>
      </nav>
      <div className='container'>
        <main className={'table__wrapper ' + (currentModalIsOpen ? ' none' : '')}>
          {filteredData?.length === 0 ? <h1 className='no-found-message'>Topilmadi!</h1> : null}

          <table ref={tableRef}>
            <thead>
              <tr>
                <th scope='col'>N0_</th>
                <th scope='col'>Ism</th>
                <th scope='col'>Familiya</th>
                <th scope='col'>Jinsi</th>
                <th scope='col'>Telefon raqam</th>
                <th scope='col'>Email</th>
                <th scope='col' className='none'>
                  Lavozimi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((i: any, idx: number) =>
                !i?.rol?.includes('Boss') ? (
                  <tr key={`${i?.id}-${idx}`} onClick={() => (positionCheck(i) ? setCurrentModalIsOpen(true) : null)}>
                    <td scope='row'>{tableNum++}</td>
                    <td>{i?.firstName}</td>
                    <td>{i?.lastName}</td>
                    <td>{i?.genre}</td>
                    <td>{i?.phoneNumber.split('+').join('')}</td>
                    <td>{i?.email}</td>
                    <td className='none'>{i?.rol?.join(', ')}</td>
                  </tr>
                ) : null,
              )}
            </tbody>
          </table>
        </main>
      </div>

      {currentModalIsOpen && <CurrentModal admins={admins} currentAdmin={currentAdmin} isClose={setCurrentModalIsOpen} />}
    </StyledStorage>
  )
})

export default AdminsList