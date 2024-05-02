import React from 'react'


import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import moment from "moment/moment";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


export const Informations = ({ data }) => {


  const isMobile = useMediaQuery("(max-width:600px)");

  // const [selectedDate, time, couverts] = data;
  const [selectedDate, couverts , selectedTime] = data;

  // rest of your component code

  return (

    <div
    style={{
      display: "flex",
      width: isMobile ? "100%" : "60%",
      justifyContent: "space-between",
    }}
  >
    {/*Commande*/}
    <div
      style={{
        display: "flex",
        margin: "10px",
        alignItems: "center",
        width: "13%",
        justifyContent: "space-between",
      }}
    >
      <RestaurantIcon
        sx={{
          fontSize: isMobile ? "22px" : "22px",
          // marginTop: isMobile ? "6px" : "2px",
        }}
      />
      <Typography
        sx={{
          fontSize: isMobile ? "22px" : "20px",
          // marginLeft: "5px",
        }}
      >
        {/* 2 */}
        {couverts}
      </Typography>
    </div>



    {/*Date*/}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        width: "42%",
        justifyContent: "space-between",
      }}
    >
      <EventIcon
        sx={{
          fontSize: isMobile ? "22px" : "20px",
          // marginTop: isMobile ? "9px" : "2px",
        }}
      />
      <Typography
        sx={{
          fontSize: isMobile ? "22px" : "20px",
          // marginLeft: "5px",
        }}
      >
        {/* jeu., 02 mai */}
        {selectedDate
          ? moment(selectedDate).format("DD/MM/YYYY")
          : ""}
      </Typography>
    </div>

    {/*Heure*/}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "10px",
        width: "24%",
        justifyContent: "space-between",
      }}
    >
      <AccessTimeIcon
        sx={{
          fontSize: isMobile ? "22px" : "20px",
          // marginTop: isMobile ? "9px" : "2px",
        }}
      />
      <Typography
        sx={{
          fontSize: isMobile ? "22px" : "20px",
          // marginLeft: "5px",
        }}
      >
        {/* 12:30 */}
        {selectedTime}
      </Typography>
    </div>
  </div>
  

)

}



