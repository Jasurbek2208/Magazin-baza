import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import styled from "styled-components";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import Input from "../../components/input/Input";

// Custom Hooks
import numSort from "../../customHooks/useNumberSortForMoney";

export default function StoragePage() {
  const [products, setProducts] = useState();
  const [filteredData, setFilteredData] = useState();
  const [sortedData, setSortedData] = useState("");

  // table excel
  const tableRef = useRef(null);

  useEffect(() => {
    onSnapshot(doc(db, "storage2", "RQVXHDw3ev7t7N37HU1M"), (doc) => {
      setProducts(doc?.data()?.products);
      setFilteredData(doc?.data()?.products);
    });
  }, []);

  // SORT PRODUCTS
  function sortData(sort) {
    setSortedData(sort);
    sort.includes("Nomi")
      ? sort.includes("(A-Z)")
        ? setFilteredData(
            [...products].sort((a, b) =>
              a.mahsulotNomi.localeCompare(b.mahsulotNomi)
            )
          )
        : setFilteredData(
            [...products].sort((a, b) =>
              b.mahsulotNomi.localeCompare(a.mahsulotNomi)
            )
          )
      : sort.includes("Soni")
      ? sort.includes("(0-100)")
        ? setFilteredData([...products].sort((a, b) => a.soni - b.soni))
        : setFilteredData([...products].sort((a, b) => b.soni - a.soni))
      : sort.includes("Narxi")
      ? sort.includes("(0-100)")
        ? setFilteredData([...products].sort((a, b) => a.narxi - b.narxi))
        : setFilteredData([...products].sort((a, b) => b.narxi - a.narxi))
      : sort.includes("(0-100)")
      ? setFilteredData([...products].sort((a, b) => a.jamiNarxi - b.jamiNarxi))
      : setFilteredData(
          [...products].sort((a, b) => b.jamiNarxi - a.jamiNarxi)
        );
  }

  // SEARCH FUNCTION
  function searchProducts(search) {
    let curProducts = products;
    let curData = [];
    if (search.target.value === "") {
      curData = [];
      sortData(sortedData);
    } else {
      curData = curProducts?.filter((i) =>
        i?.mahsulotNomi
          ?.toLowerCase()
          .includes(search.target.value.toLowerCase())
          ? true
          : false
      );
      setFilteredData(curData);
    }
  }

  return (
    <StyledStorage>
      <nav className="customize_navbar">
        <div className="container">
          <ul>
            <li>
              <DownloadTableExcel
                filename="products table"
                sheet="products"
                currentTableRef={tableRef.current}
              >
                <Button content="Export excel" customize={true} />
              </DownloadTableExcel>
            </li>
            <li>
              <Select
                content="Sort"
                sortData={sortData}
                list={[
                  "Nomi (A-Z)",
                  "Nomi (Z-A)",
                  "Soni (0-100)",
                  "Soni (100-0)",
                  "Narxi (0-100)",
                  "Narxi (100-0)",
                  "Jami Narxi (0-100)",
                  "Jami Narxi (100-0)",
                ]}
              />
            </li>
            <li>
              <Input placeholder="Search..." onChange={searchProducts} />
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <main className="table__wrapper">
          <table ref={tableRef}>
            <thead>
              <tr>
                <th>N0_</th>
                <th>Mahsulot nomi</th>
                <th>Soni</th>
                <th>Mahsulot narxi</th>
                <th>Jami narxi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((i, idx) => (
                <tr key={i?.mahsulotNomi + idx}>
                  <td>{idx + 1}</td>
                  <td>{i?.mahsulotNomi}</td>
                  <td>{numSort(i?.soni)}</td>
                  <td>{numSort(i?.narxi)} so'm</td>
                  <td>{numSort(i?.soni * i?.narxi)} so'm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </StyledStorage>
  );
}

const StyledStorage = styled.div`
  .customize_navbar {
    padding: 20px 0px;
    margin: 20px 0px;
    background-color: silver;

    .container {
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 32px;
        row-gap: 20px;
        flex-wrap: wrap;

        li:last-of-type {
          width: 300px;
        }
      }
    }
  }

  .container {
    .table__wrapper {
      margin: 0 auto;
      overflow-x: auto;
      max-width: max-content;
      min-height: 300px;
      border: 1px solid silver;

      table {
        th,
        td {
          padding: 12px 36px 12px 10px;
          text-align: left;
          min-width: max-content;
          border: 1px solid silver;

          &:first-of-type {
            padding: 10px;
            text-align: center;
            min-width: 60px;
          }
        }
      }
    }
  }
`;
