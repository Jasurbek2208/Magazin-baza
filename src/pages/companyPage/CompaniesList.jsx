import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { TabTitle } from "../../utils/Utils";
import { StyledStorage } from "../storagePage/StoragePage";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import Input from "../../components/input/Input";
import CurrentModal from "./CurrentModal";

export default function CompaniesList() {
  TabTitle("Xaridorlar ro'yxati | Magazin Baza");

  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);

  // For info Modal
  const [currentModalIsOpen, setCurrentModalIsOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState();

  let tableNum = 1;
  const [isCompany, setIsCompany] = useState(true);
  const [partners, setPartners] = useState();
  const [filteredData, setFilteredData] = useState();
  const [sortedData, setSortedData] = useState("");

  // table excel
  const tableRef = useRef(null);

  useEffect(() => {
    onSnapshot(doc(db, "storage2", "nDLTOuF4yuVFKBhwmCRC"), (doc) => {
      setPartners(doc?.data()?.companies);
      setFilteredData(doc?.data()?.companies);
    });

    onSnapshot(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), (doc) => {
      doc?.data()?.admins.map((currUser) => {
        if (localStorage.getItem("TOKEN") === currUser.accessToken) {
          setUserPosit(currUser.rol);
        }
      });
    });
  }, []);

  // SORT partners
  function sortData(sort) {
    setSortedData(sort);

    sort.includes("Nomi (A-Z)")
      ? setFilteredData(
          [...partners].sort((a, b) => a.name.localeCompare(b.name))
        )
      : setFilteredData(
          [...partners].sort((a, b) => b.name.localeCompare(a.name))
        );
  }

  // SEARCH FUNCTION
  function searchPartners(search) {
    let curPartners = partners;
    let curData = [];

    if (search.target.value === "") {
      curData = [];
      sortData(sortedData);
    } else {
      curData = curPartners?.filter((i) =>
        i.name?.toLowerCase().includes(search.target.value.toLowerCase())
          ? true
          : false
      );

      setFilteredData(curData);
    }
  }

  // Checking admin position
  function positionCheck(i) {
    if (userPosit.includes("Boss") || userPosit.includes("Bosh menejeer")) {
      setCurrentPartner(i);
      return true;
    }
    return false;
  }

  return (
    <StyledStorage>
      <nav className="customize_navbar">
        <div className="container">
          <ul>
            <li>
              <DownloadTableExcel
                filename={
                  isCompany
                    ? "partner companies table"
                    : "partner persons table"
                }
                sheet={isCompany ? "partner companies" : "partner persons"}
                currentTableRef={tableRef.current}
              >
                <Button content="Excel yuklash" width="100%" customize={true} />
              </DownloadTableExcel>
            </li>
            <li>
              <Select
                content="Sort"
                sortData={sortData}
                list={["Nomi (A-Z)", "Nomi (Z-A)"]}
              />
            </li>
            <li>
              <Button
                onClick={() => setIsCompany((p) => !p)}
                content={isCompany ? "Kompaniya" : "Shaxs"}
                customize
                width="130px"
              />
            </li>
            <li>
              <Input placeholder="Qidiruv..." onChange={searchPartners} />
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <main className="table__wrapper">
          {filteredData?.length === 0 ? (
            <h1 className="no-found-message">
              {console.log("Topilmadi tablelar !!")}Topilmadi!
            </h1>
          ) : null}
          {isCompany ? (
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>N0_</th>
                  <th>Kompaniya nomi</th>
                  <th>Direktor</th>
                  <th>Telefon raqam</th>
                  <th>Qo'shimcha Telefon raqam</th>
                  <th>Manzil</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((i, idx) =>
                  i.companyBoss ? (
                    <tr
                      key={i.name + idx}
                      onClick={() =>
                        positionCheck(i) ? setCurrentModalIsOpen(true) : null
                      }
                    >
                      <td>{tableNum++}</td>
                      <td>{i.name}</td>
                      <td>{i.companyBoss}</td>
                      <td>{i.phoneNumber}</td>
                      <td>{i.additionalPhoneNumber}</td>
                      <td>{i.address}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          ) : (
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th>N0_</th>
                  <th>Familiya, Ism (F.I.O.)</th>
                  <th>Telefon raqam</th>
                  <th>Tug'ilgan sana</th>
                  <th>Jinsi</th>
                  <th>Manzil</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((i, idx) =>
                  !i.companyBoss ? (
                    <tr
                      key={i.name + idx}
                      onClick={() =>
                        positionCheck(i) ? setCurrentModalIsOpen(true) : null
                      }
                    >
                      <td>{tableNum++}</td>
                      <td>{i.name}</td>
                      <td>{i.phoneNumber}</td>
                      <td>{i.birthday}</td>
                      <td>{i.genre}</td>
                      <td>{i.address}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          )}
        </main>
      </div>

      {currentModalIsOpen && <CurrentModal partners={partners} currentPartner={currentPartner} isClose={setCurrentModalIsOpen} />}
    </StyledStorage>
  );
}
