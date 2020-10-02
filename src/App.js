import { Card, CardContent } from "@material-ui/core";
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LineGraph from "./components/LineGraph/LineGraph";
import TableComponent from "./components/Table/TableComponent";
import "leaflet/dist/leaflet.css";
function App() {
  return (
    <div className="app">
      <div className="app__left">
        <Header />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <TableComponent />
          <LineGraph className="app__graph" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
