import React, { createContext, useContext, useEffect, useState } from "react";

import { apiUrl } from "../constants/apiUrl";

export const CovidContext = createContext();
function CovidContextProvider(props) {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState();
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("recovered");

  // get defalt worldwide value
  useEffect(() => {
    const getAllCases = async () => {
      try {
        const response = await fetch(apiUrl.getAllCases);
        const result = await response.json();
        setCountryInfo(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllCases();
  }, []);
  // get all countries
  useEffect(() => {
    const fetchCountries = async () => {
      await fetch(apiUrl.getCountries)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((item) => ({
            name: item.country,
            value: item.countryInfo.iso2,
          }));
          setCountries(countries);
          console.log("data", data);
          setMapCountries(data);
          setTableData(data);
        })
        .catch((error) => console.log(error.message));
    };
    fetchCountries();
  }, []);

  // fetchdata
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setCountryInfo(result);
      setMapCenter([result.countryInfo.lat, result.countryInfo.long]);
      setMapZoom(4);
    } catch (error) {
      console.log(error.message);
    }
  };
  // handle select
  const handleCountryChanges = (event) => {
    console.log("event.target.value", event.target.value);
    const countryCode = event.target.value;
    const url =
      countryCode === "worldwide"
        ? apiUrl.getAllCases
        : apiUrl.getCasesByCountry + countryCode;
    fetchData(url);
    setCountry(countryCode);
  };
  // sorted data
  const handleSortedData = (param) => {
    const sortedData = [...tableData];
    // const params=param;
    if (toggle) {
      sortedData.sort((a, b) => {
        if (a[param] > b[param]) {
          return -1;
        } else {
          return 1;
        }
      });
      setTableData(sortedData);
      setToggle(false);
    } else {
      sortedData.sort((a, b) => {
        if (a[param] > b[param]) {
          return 1;
        } else {
          return -1;
        }
      });
      setTableData(sortedData);
      setToggle(true);
    }
  };

  // handlecasetype
  const handleOnClickCasesType = (caseType) => {
    console.log("cases-type", caseType);
    setCasesType(caseType);
  };
  return (
    <CovidContext.Provider
      value={{
        countries,
        countryInfo,
        country,
        tableData,
        handleCountryChanges,
        handleSortedData,
        toggle,
        mapCountries,
        mapCenter,
        mapZoom,
        handleOnClickCasesType,
        casesType,
      }}
    >
      {props.children}
    </CovidContext.Provider>
  );
}
export const useCovideContextValue = () => useContext(CovidContext);
export const CovidContextConsumer = CovidContext.Consumer;
export default CovidContextProvider;
