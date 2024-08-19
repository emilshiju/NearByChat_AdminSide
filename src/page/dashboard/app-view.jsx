// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import AppWidgetSummary from "./app-widget-summary"
// import AppWebsiteVisits  from "./app-website-visits"
// import AppCurrentVisits from "./app-current-visits"

// const AppView=()=>{

//     return (
//         <div>

//             <h1>ihsiohdiofhsdiof</h1>

//             <Grid container spacing={3}>

//             <Grid xs={12} sm={6} md={3}>
//           <AppWidgetSummary
//             title="Weekly Sales"
//             total={714000}
//             color="success"
//             icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AppWidgetSummary
//             title="New Users"
//             total={1352831}
//             color="info"
//             icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AppWidgetSummary
//             title="Item Orders"
//             total={1723315}
//             color="warning"
//             icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
//           />
//         </Grid>

//         <Grid xs={12} sm={6} md={3}>
//           <AppWidgetSummary
//             title="Bug Reports"
//             total={234}
//             color="error"
//             icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={8}>
//           <AppWebsiteVisits
//             title="Website Visits"
//             subheader="(+43%) than last year"
//             chart={{
//               labels: [
//                 '01/01/2003',
//                 '02/01/2003',
//                 '03/01/2003',
//                 '04/01/2003',
//                 '05/01/2003',
//                 '06/01/2003',
//                 '07/01/2003',
//                 '08/01/2003',
//                 '09/01/2003',
//                 '10/01/2003',
//                 '11/01/2003',
//               ],
//               series: [
//                 {
//                   name: 'Team A',
//                   type: 'column',
//                   fill: 'solid',
//                   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
//                 },
//                 {
//                   name: 'Team B',
//                   type: 'area',
//                   fill: 'gradient',
//                   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
//                 },
//                 {
//                   name: 'Team C',
//                   type: 'line',
//                   fill: 'solid',
//                   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
//                 },
//               ],
//             }}
//           />
//         </Grid>

//         <Grid xs={12} md={6} lg={4}>
//           <AppCurrentVisits
//             title="Current Visits"
//             chart={{
//               series: [
//                 { label: 'America', value: 4344 },
//                 { label: 'Asia', value: 5435 },
//                 { label: 'Europe', value: 1443 },
//                 { label: 'Africa', value: 4443 },
//               ],
//             }}
//           />
//         </Grid>

//             </Grid>
//         </div>
//     )
// }

// export default AppView

import React, { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import AppWidgetSummary from "./app-widget-summary";
import AppWebsiteVisits from "./app-website-visits";
import AppCurrentVisits from "./app-current-visits";
import darkTheme from "./theme"; // Import the dark theme
import SidebarBox from "../../component/sidebar";
import Header from "../../component/header";
import axios from "axios";
import { responsiveContext } from "../../context/createContext";

const AppView = () => {
  const [dailySales, setDailySales] = useState(0);
  const [countOfAllUser, setCountOfAllUser] = useState(0);
  const [countPayment, setCountOfPayment] = useState(0);
  const [countReports, setCountReports] = useState(0);
  const [weeklyUsers, setWeeklyUsers] = useState([]);
  const [weeklyOrers, setWeeklyOrders] = useState([]);
  const [weeks, setWeeks] = useState([]);

  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  useEffect(() => {
    axios.get("https://anonymous10.cloud/getDashboard").then((a) => {
      if (a.data.data) {
        setDailySales(a.data.data.totalAmountDaily[0]?.totalSum | 0);
        setCountOfAllUser(a.data.data.countAlluser);
        setCountOfPayment(a.data.data.countPayment);
        setCountReports(a.data.data.countReport);
        setWeeklyUsers(a.data.weeklyUsers);
        setWeeklyOrders(a.data.weeklyOrderes);
        setWeeks(a.data.week);
      }
    });
  }, []);

  const handleResize = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
    // const screenHeight = window.innerHeight; // Use innerHeight for viewport height

    console.log("Viewport Size Changed");
    console.log("Width:", screenWidth, "Height:", screenHeight);

    if (screenWidth <= 375 && screenHeight <= 667) {
      console.log("Small screen");

      //   setOpen(false);
      setResponsiveMd(false);
    } else if (screenWidth > 400 && screenHeight > 700) {
      console.log("Large screen");

      //   setOpen(true);
      setResponsiveMd(true);
    }
  };

  useEffect(() => {
    // Call handleResize once to set the initial state
    handleResize();

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <SidebarBox />
      <Header />

      <div
        style={{
          paddingTop: "130px",
          paddingLeft: responsiveMd ? "270px" : "0px",
        }}
        className=" dark:bg-gray-800"
      >
        <ThemeProvider theme={darkTheme}>
          <Container>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Daily Sales"
                  total={dailySales}
                  color="success"
                  icon={
                    <img
                      alt="icon"
                      src="/assets/icons/glass/ic_glass_bag.png"
                    />
                  }
                />
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="New Users"
                  total={countOfAllUser}
                  color="info"
                  icon={
                    <img
                      alt="icon"
                      src="/assets/icons/glass/ic_glass_users.png"
                    />
                  }
                />
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Item Orders"
                  total={countPayment}
                  color="warning"
                  icon={
                    <img
                      alt="icon"
                      src="/assets/icons/glass/ic_glass_buy.png"
                    />
                  }
                />
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Bug Reports"
                  total={countReports}
                  color="error"
                  icon={
                    <img
                      alt="icon"
                      src="/assets/icons/glass/ic_glass_message.png"
                    />
                  }
                />
              </Grid>

              <Grid xs={12} md={6} lg={8}>
                <AppWebsiteVisits
                  title="Website Visits"
                  subheader="(+43%) than last year"
                  chart={{
                    // labels: [
                    //   '01/01/2003',
                    //   '02/01/2003',
                    //   '03/01/2003',
                    //   '04/01/2003',
                    //   '05/01/2003',
                    //   '06/01/2003',
                    //   '07/01/2003',
                    //   '08/01/2003',
                    //   '09/01/2003',
                    //   '10/01/2003',
                    //   '11/01/2003',
                    // ],
                    labels: weeks,
                    series: [
                      {
                        name: "user",
                        type: "column",
                        fill: "solid",
                        // data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                        data: weeklyUsers,
                      },
                      {
                        name: "orders",
                        type: "area",
                        fill: "gradient",
                        // data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                        data: weeklyOrers,
                      },
                      // {
                      //   name: 'Team C',
                      //   type: 'line',
                      //   fill: 'solid',
                      //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                      // },
                    ],
                  }}
                />
              </Grid>

              <Grid xs={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Current Visits"
                  chart={{
                    series: [
                      { label: "America", value: 0 },
                      { label: "Asia", value: 9435 },
                      { label: "Europe", value: 0 },
                      { label: "Africa", value: 0 },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default AppView;
