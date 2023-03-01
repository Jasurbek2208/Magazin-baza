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

export default function AdminsList() {
  TabTitle("Adminlar ro'yxati | Magazin Baza");

  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);

  // For info Modal
  const [currentModalIsOpen, setCurrentModalIsOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState();

  let tableNum = 1;
  const [admins, setAdmins] = useState();
  const [filteredData, setFilteredData] = useState();
  const [sortedData, setSortedData] = useState("");

  // table excel
  const tableRef = useRef(null);

  useEffect(() => {
    onSnapshot(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), (doc) => {
      setAdmins(doc?.data()?.admins);
      setFilteredData(doc?.data()?.admins);

      doc?.data()?.admins.map((currUser) => {
        if (localStorage.getItem("TOKEN") === currUser.accessToken) {
          setUserPosit(currUser.rol);
        }
      });
    });
  }, []);

  // SORT admins
  function sortData(sort) {
    setSortedData(sort);

    sort.includes("Ism")
      ? sort.includes("(A-Z)")
        ? setFilteredData(
            [...admins].sort((a, b) => a.firstName.localeCompare(b.firstName))
          )
        : setFilteredData(
            [...admins].sort((a, b) => b.firstName.localeCompare(a.firstName))
          )
      : sort.includes("(A-Z)")
      ? setFilteredData(
          [...admins].sort((a, b) => a.lastName.localeCompare(b.lastName))
        )
      : setFilteredData(
          [...admins].sort((a, b) => b.lastName.localeCompare(a.lastName))
        );
  }

  // SEARCH FUNCTION
  function searchadmins(search) {
    let curadmins = admins;
    let curData = [];

    if (search.target.value === "") {
      curData = [];
      sortData(sortedData);
    } else {
      curData = curadmins?.filter((i) =>
        i.firstName?.toLowerCase().includes(search.target.value.toLowerCase())
          ? true
          : false
      );

      setFilteredData(curData);
    }
  }

  // Checking admin position
  function positionCheck(i) {
    if (userPosit.includes("Boss") || userPosit.includes("Bosh menejeer")) {
      setCurrentAdmin(i);
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
                filename="admins table"
                sheet="admins"
                currentTableRef={tableRef.current}
              >
                <Button content="Excel yuklash" width="100%" customize={true} />
              </DownloadTableExcel>
            </li>
            <li>
              <Select
                content="Sort"
                sortData={sortData}
                list={[
                  "Ism (A-Z)",
                  "Ism (Z-A)",
                  "Familiya (A-Z)",
                  "Familiya (Z-A)",
                ]}
              />
            </li>
            <li>
              <Input
                placeholder="Qidiruv(ism bo'yicha)..."
                onChange={searchadmins}
              />
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <main
          className={"table__wrapper" + (currentModalIsOpen ? " none" : "")}
        >
          {filteredData?.length === 0 ? (
            <h1 className="no-found-message">Topilmadi!</h1>
          ) : null}

          <table ref={tableRef}>
            <thead>
              <tr>
                <th>N0_</th>
                <th>Ism</th>
                <th>Familiya</th>
                <th>Jinsi</th>
                <th>Telefon raqam</th>
                <th>Email</th>
                <th className="none">Lavozimi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((i, idx) => (
                <tr
                  key={i.id}
                  onClick={() =>
                    positionCheck(i) ? setCurrentModalIsOpen(true) : null
                  }
                >
                  <td>{tableNum++}</td>
                  <td>{i.firstName}</td>
                  <td>{i.lastName}</td>
                  <td>{i.genre}</td>
                  <td>{i.phoneNumber.split("+").join("")}</td>
                  <td>{i.email}</td>
                  <td className="none">{i.rol.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      {currentModalIsOpen && (
        <CurrentModal
          admins={admins}
          currentAdmin={currentAdmin}
          isClose={setCurrentModalIsOpen}
        />
      )}
    </StyledStorage>
  );
}
