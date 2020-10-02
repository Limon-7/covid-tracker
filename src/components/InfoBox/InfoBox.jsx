import { Card, Typography } from "@material-ui/core";
import React from "react";

import "./InfoBox.css";
function InfoBox({ title, cases, total, active, isRed, ...otherprops }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"}  ${
        isRed && "infoBox--red"
      }`}
      onClick={otherprops.onClick}
    >
      <Typography color="textSecondary" className="infoBox__title">
        {title}
      </Typography>
      <h2 className="infoBox__cases">{cases}</h2>
      <Typography color="textSecondary" className="infoBox__total">
        {total} total
      </Typography>
    </Card>
  );
}

export default InfoBox;
