import { useEffect, useState, useContext } from "react";
import Header from "../component/header";
import SidebarBox from "../component/sidebar";
import axios from "axios";

import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";

import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";
import useDebouncedValue from "../hooks/useSearching";
import { responsiveContext } from "../context/createContext";

const Report = () => {
  const token = JSON.parse(localStorage.getItem("adminaccestoken"));

  const [allReport, setAllReport] = useState(null);

  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);

  useEffect(() => {
    // axios.get('http://localhost:5000/getAllReports')

    axios
      .get("https://anonymous10.cloud/getAllReports", {
        headers: {
          // Define your headers here
          "Content-Type": "application/json", // Example content type
          authorization: `Bearer ${token}`, // Assuming token is stored and retrieved correctly
        },
      })
      .then((res) => {
        if (res.data.data) {
          console.log("all report ")
          console.log(res.data.data)
          setAllReport(res.data.data);
        }
      });
  }, []);

  const [value, setSearchReports] = useState("");

  const debouncedSearchTerm = useDebouncedValue(value, 500);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/searchReports?value=${value}`, {
        headers: {
          // Define your headers here
          "Content-Type": "application/json", // Example content type
          authorization: `Bearer ${token}`, // Assuming token is stored and retrieved correctly
        },
      })
      .then((response) => {
        setAllReport(response.data.data);
      });
  }, [debouncedSearchTerm]);

  const onChangeSearchReports = (e) => {
    let values = e.target.value;

    setSearchReports(values);
  };

  const [viewReason, setViewReason] = useState(false);
  const [showReason, setShowReason] = useState(null);

  const onChangeViewReason = (id, allReason) => {
    setShowReason(id);
    setViewReason(allReason);
  };

  const onCloseViewReason = () => {
    setViewReason(null);
    setShowReason(null);
  };

  const changeReadStatus = (reportId, sta) => {
    const status = !sta;

    axios.patch("https://anonymous10.cloud/changeReportStatus", {
      reportId,
      status,
    });
  };

  const handleResize = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
    // const screenHeight = window.innerHeight; // Use innerHeight for viewport height

    console.log("Width:", screenWidth, "Height:", screenHeight);
    if (screenWidth <= 786 && screenHeight <= 786) {
      console.log("Small screen");

      //   setOpen(false);
      setResponsiveMd(false);
    } else {
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
      <div>
        <SidebarBox />
        <Header />
        <div style={{ paddingTop: "20px" }}>
          <br></br>
          <div>
            <div className=" bg-white dark:bg-gray-800 h-screen ">
              <br></br>

              <div
                style={{
                  paddingLeft: responsiveMd ? "280px" : "0px",
                  paddingTop: "40px",
                  paddingRight: "10px",
                }}
              >
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  Report Magement
                </h1>
                <br />

                <div className="sm:flex ">
                  <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                    <form className="lg:pr-3" action="#" method="GET">
                      <label htmlFor="users-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative mt-1 lg:w-64 xl:w-96">
                        <input
                          type="text"
                          name="email"
                          id="users-search"
                          value={value}
                          onChange={onChangeSearchReports}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search for Reports"
                        />
                      </div>
                    </form>
                    <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0"></div>
                  </div>
                </div>
              </div>

              <br></br>

              {viewReason && (
                <div className="absolute inset-0 flex justify-center items-center">
                  <div
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                    style={{
                      width: responsiveMd ? "400px" : "300px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      marginLeft: responsiveMd ? "500px" : "0px",
                    }}
                  >
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Reasons for Report
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="small-modal"
                        onClick={onCloseViewReason}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>

                    {viewReason.map((a) => {
                      return (
                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {a}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div
                className="flex flex-col"
                style={{ paddingLeft: responsiveMd ? "280px" : "0px" }}
              >
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                      <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                          <tr>
                            <th scope="col" className="p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-all"
                                  aria-describedby="checkbox-1"
                                  type="checkbox"
                                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  htmlFor="checkbox-all"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              reporter
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              reporter email
                            </th>

                            <th
                              scope="col"
                              className="p-0 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              receipent
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              receipent email
                            </th>
                            <th
                              scope="col"
                              className="p-1 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              Reason
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {allReport &&
                            allReport.map((report, b) => {
                              return (
                                <tr
                                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                  key={b}
                                >
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        aria-describedby="checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                      />
                                      <label className="sr-only">
                                        checkbox
                                      </label>
                                    </div>
                                  </td>
                                  <td className="flex items-center p-4 mr-8 space-x-6 whitespace-nowrap dark:text-white">
                                    {report.reporter.nickName}
                                  </td>
                                  <td className="max-w-sm p-0 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                    {" "}
                                    {report.reporter.email}
                                  </td>
                                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {report.reportedUser.nickName}
                                  </td>
                                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {report.reportedUser.email}
                                  </td>

                                  <td className="p-1 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                    {showReason &&
                                      console.log(
                                        "44444444444444444444444444444444444444444444444444444444444444444444444444   all 111 2 33333333333334 444444444444444444444"
                                      )}
                                    {console.log(showReason)}
                                    {console.log(b)}
                                    {showReason && showReason == b + 1 ? (
                                      <VisibilitySharpIcon
                                        onClick={() => setShowReason(null)}
                                      />
                                    ) : (
                                      <VisibilityOffSharpIcon
                                        onClick={() =>
                                          onChangeViewReason(
                                            b + 1,
                                            report.reasons
                                          )
                                        }
                                      />
                                    )}
                                  </td>
                                  <td className="p-4 space-x-2 whitespace-nowrap">
                                    <div>
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          className="sr-only peer"
                                          onClick={() =>
                                            changeReadStatus(
                                              report._id,
                                              report.marked
                                            )
                                          }
                                          defaultChecked={report.marked}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                          Read
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
