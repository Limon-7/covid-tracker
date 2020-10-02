import { FormControl, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useCovideContextValue } from "../../contexts/CovidContext";
import { prettyPrintStat } from "../../utils/utils";
import InfoBox from "../InfoBox/InfoBox";
import MapComponent from "../Map/MapComponent";

import "./Header.css";
function Header() {
  const {
    countries,
    country,
    countryInfo,
    handleCountryChanges,
    handleOnClickCasesType,
    casesType,
  } = useCovideContextValue();
  return (
    <div className="header">
      <div className="header_menu">
        <h3>Covid-19 tracker</h3>
        <FormControl>
          <Select
            variant="outlined"
            value={country}
            onChange={handleCountryChanges}
          >
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="header__info">
        <div className="header__infoBox">
          <InfoBox
            active={casesType === "cases"}
            isRed
            onClick={() => handleOnClickCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo?.todayCases)}
            total={prettyPrintStat(countryInfo?.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={() => handleOnClickCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo?.todayRecovered)}
            total={prettyPrintStat(countryInfo?.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={() => handleOnClickCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo?.todayDeaths)}
            total={prettyPrintStat(countryInfo?.deaths)}
          />
        </div>
        <>
          <MapComponent />
        </>
      </div>
    </div>
  );
}

export default Header;
