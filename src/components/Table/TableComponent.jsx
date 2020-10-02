import React from "react";
import { useCovideContextValue } from "../../contexts/CovidContext";
import numeral from "numeral";

import "./TableComponent.css";
function TableComponent() {
  const { tableData, handleSortedData } = useCovideContextValue();

  if (tableData.length === 0) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="tableComponent">
      <table className="tableComponent__table">
        <thead className="tableComponent__head">
          <tr>
            <th onClick={() => handleSortedData("country")}>Country</th>
            <th onClick={() => handleSortedData("cases")}>Cases</th>
          </tr>
        </thead>
        <tbody className="tableComponent__body">
          {tableData.map((country, index) => (
            <tr key={index}>
              <td>{country.country}</td>
              <td>
                <strong>{numeral(country.cases).format()}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;
