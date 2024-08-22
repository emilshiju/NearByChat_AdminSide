import SidebarBox from "../component/sidebar";
import Header from "../component/header";

import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";
import { useEffect, useState ,useContext } from "react";
import axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { responsiveContext } from "../context/createContext";


const SubscriptionList = () => {
  const [allSubscriptionDetails, setAllPaymentSubscriptionDetails] = useState(
    []
  );

  const { responsiveMd, setResponsiveMd } = useContext(responsiveContext);


  useEffect(() => {
    axios.get("https://anonymous10.cloud/allSubscriptionDetails").then((res) => {
      console.log(res.data);
      if (res.data.data) {
        setAllPaymentSubscriptionDetails(res.data.data);
      }
    });
  }, []);

  const [showOrderSummary, setOrderSummary] = useState(false);
  const [oneOrderSummary, setOneOrderSummary] = useState(false);

  const onChangeOrderSummary = (id) => {
    setOrderSummary(true);

    axios
      .get(`http://localhost:5000/getOneSubscriptionSummary/${id}`)
      .then((res) => {
        if (res.data.data) {
          setOneOrderSummary(res.data.data);
        }
      });
  };

  const [showSummaryIcon, setSummaryIcon] = useState(false);

  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const toggleBillingModal = () => {
    setBillingModalOpen(!billingModalOpen);
  };

  const handleCompanyToggle = () => {
    setIsCompany(!isCompany);
  };

  function formatDate(isoTimestamp) {
    // Create a Date object from the ISO 8601 timestamp
    const date = new Date(isoTimestamp);

    // Options for formatting the date
    const options = {
      year: "numeric", // "2024"
      month: "long", // "July"
      day: "numeric", // "11"
    };

    // Convert to a readable date string
    const readableDate = date.toLocaleDateString("en-US", options);

    return readableDate;
  }





  const handleResize = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
    // const screenHeight = window.innerHeight; // Use innerHeight for viewport height

    console.log("Viewport Size Changed");
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
      <SidebarBox />
      <Header />

      {!showOrderSummary && (
        <div style={{ paddingTop: "20px" }}>
          <br></br>
          <div>
            <div className=" bg-white dark:bg-gray-800 h-screen">
              <br></br>

              <div
                style={{
                  paddingLeft: "280px",
                  paddingTop: "40px",
                  paddingRight: "10px",
                }}
              >
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  order Summary
                </h1>
                <br />

                <div className="sm:flex ">
                  <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-800">
                    <form className="lg:pr-3" action="#" method="GET">
                      <label htmlFor="users-search" className="sr-only">
                        Search
                      </label>
                      <div className=" mt-1 lg:w-64 xl:w-96">
                        <input
                          type="text"
                          name="email"
                          id="users-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search Order"
                        />
                      </div>
                    </form>
                    <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0"></div>
                  </div>
                </div>
              </div>

              <br></br>

              <div className="flex flex-col" style={{  paddingLeft: responsiveMd ? "280px":"0px" }}>
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
                                  className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-900 dark:ring-offset-gray-800 dark:bg-gray-900 dark:border-gray-900"
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
                              Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              user Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              Max search
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="p-0 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                            >
                              timePeriod
                            </th>

                            {/* <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Status
                                    </th> */}
                            <th
                              scope="col"
                              className="p-0 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400 "
                            >
                              View
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                          {allSubscriptionDetails &&
                            allSubscriptionDetails.map((a, b) => {
                              return (
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <td className="w-4 p-4">
                                    <div className="flex items-center">
                                      <input
                                        aria-describedby="checkbox-1"
                                        type="checkbox"
                                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-900 dark:bg-gray-900 dark:border-gray-900"
                                      />
                                      <label className="sr-only">
                                        checkbox
                                      </label>
                                    </div>
                                  </td>
                                  <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                    <img
                                      className="w-20 h-20 rounded-full"
                                      src={a?.searchSubUrl}
                                      alt={`error`}
                                    />
                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                      {/* <div className="text-base font-semibold text-gray-900 dark:text-white">{a.name}</div> */}
                                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {a?.subscriptionName}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                    {a?.userName}
                                  </td>
                                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {a?.maxCount}
                                  </td>
                                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {a?.price}
                                  </td>
                                  <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {a.timePeriod}
                                  </td>
                                  {/* <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                              
                                            </div>
                                        </td> */}
                                  <td className="p-4 space-x-2 whitespace-nowrap">
                                    <VisibilityOffSharpIcon
                                      sx={{ color: "white" }}
                                      onClick={() =>
                                        onChangeOrderSummary(a?._id)
                                      }
                                    />
                                    :
                                    {/* <VisibilitySharpIcon sx={{ color: "white" }}  onClick={()=>setOrderSummary(true)} /> */}
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
      )}

      {showOrderSummary && (
        <div
          className=" bg-white dark:bg-gray-800"
          style={{ paddingLeft: "80px", paddingTop: "70px" }}
        >
          <div className="width-[300px] ">
            <section className="bg-white  antialiased dark:bg-gray-800 md:py-16">
              <form
                action="#"
                className="mx-auto  max-w-screen-xl px-4 2xl:px-0"
              >
                <div className="mx-auto max-w-3xl">
                  <ArrowBackIcon
                    style={{ color: "white" }}
                    onClick={() => setOrderSummary(null)}
                  />
                  <br></br>
                  <h2 className="text-xl pt-5 font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Order summary
                  </h2>

                  <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      user Details
                    </h4>

                    <dl>
                      <dt className="text-base font-medium text-gray-900 dark:text-white">
                        {oneOrderSummary?.userName}
                      </dt>

                      <dt className="text-base font-medium text-gray-900 dark:text-white">
                        {oneOrderSummary?.email}
                      </dt>
                      <dt className="text-base font-medium text-gray-900 dark:text-white">
                        {oneOrderSummary?.gender}
                      </dt>

                      <dt className="text-base font-medium text-gray-900 dark:text-white">
                        {formatDate(oneOrderSummary?.dob)}
                      </dt>
                      {/* <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                Bonnie Green - +1 234 567 890, San Francisco, California, United
                States, 3454, Scott Street
              </dd> */}
                    </dl>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                      <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                          <tr>
                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                              <div className="flex items-center gap-4">
                                <a
                                  href="#"
                                  className="flex items-center aspect-square w-10 h-10 shrink-0"
                                >
                                  <img
                                    className="h-auto w-full max-h-full "
                                    src={oneOrderSummary?.searchSubUrl}
                                    alt="imac image"
                                  />
                                  {/* <img
                            className="hidden h-auto w-full max-h-full dark:block"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                            alt="imac image"
                          /> */}
                                </a>
                                <a href="#" className="hover:underline">
                                  {oneOrderSummary.subscriptionName}
                                </a>
                              </div>
                            </td>

                            <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                              x1
                            </td>

                            <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                              {oneOrderSummary.price}
                            </td>
                          </tr>
                          {/* 
                  <tr>
                    <td className="whitespace-nowrap py-4 md:w-[384px]">
                      <div className="flex items-center gap-4">
                        <a
                          href="#"
                          className="flex items-center aspect-square w-10 h-10 shrink-0"
                        >
                          <img
                            className="h-auto w-full max-h-full dark:hidden"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
                            alt="iphone image"
                          />
                          <img
                            className="hidden h-auto w-full max-h-full dark:block"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg"
                            alt="iphone image"
                          />
                        </a>
                        <a href="#" className="hover:underline">
                          Apple iPhone 14
                        </a>
                      </div>
                    </td>

                    <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                      x2
                    </td>

                    <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                      $1,998
                    </td>
                  </tr> */}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-6">
                      {/* <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </h4> */}

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              Original price
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {oneOrderSummary?.price}
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              max count
                            </dt>
                            <dd className="text-base font-medium text-green-500">
                              {oneOrderSummary?.maxCount}
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              Time Period
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {oneOrderSummary?.timePeriod}
                            </dd>
                          </dl>

                          {/* <dl className="flex items-center justify-between gap-4">
                    <dt className="text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      $799
                    </dd>
                  </dl> */}
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                          <dt className="text-lg font-bold text-gray-900 dark:text-white">
                            Total
                          </dt>
                          <dd className="text-lg font-bold text-gray-900 dark:text-white">
                            {oneOrderSummary?.price}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;
