import React, { useState, useEffect } from "react";
import SidebarBox from "../../component/sidebar";
import Header from "../../component/header";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

import { useParams } from "react-router-dom";
import { string } from "prop-types";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSubscription = () => {
  const { userId } = useParams();

  const [prevImage, setPrevImage] = useState(null);
  const [id, setId] = useState(null);

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("image", file);
    const imageUrl = URL.createObjectURL(file); // Create a URL for the file
    setPrevImage(imageUrl);

    // const file = e.target.files[0]; // Get the first selected file
    // console.log("imageeeeeeeeeee")
    // console.log(file)
    // if (file) {
    //     const imageUrl = URL.createObjectURL(file); // Create a URL for the file
    //     setPrevImage(imageUrl); // Update the state with the image URL
    // }
  };

  const onDeleteImage = () => {
    setPrevImage(null);
    formik.setFieldValue("image", null);
  };

  const [name, setName] = useState("");
  const [countOfSearch, setCountOfSearch] = useState("");
  const [price, setPrice] = useState("");
  const [day, setDay] = useState("");
  const [description, setDescription] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeCountOfSearch = (e) => {
    setCountOfSearch(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onChangeDay = (e) => {
    setDay(e.target.value);
  };

  const onChangeDiscription = (e) => {
    setDescription(e.target.value);
  };

  const onClearAll = () => {
    console.log(formik.description);

    formik.resetForm();

    setPrevImage(null);
    formik.setFieldValue("image", null);
  };

  const showToastMessage = () => {
    toast.success("Success registered !", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      countOfSearch: Number,
      price: Number,
      day: Number,
      description: "",
      image: null,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(6, "name must be above 3 character")
        .required("required"),
      countOfSearch: Yup.number()
        .typeError("Count of Search must be a number")
        //   .min(0, 'Count of Search must be at least 0')
        .required("required"),
      price: Yup.number()
        .typeError("Count of Search must be a number")
        //   .min(0, 'enter a proper price')
        .required("required"),
      day: Yup.number()
        .typeError("Count of Search must be a number")
        //    .min(0, 'enter a proper day ')
        .required("required"),
      description: Yup.string()
        .min(10, " description must be above 10")
        .required("required"),
      image: Yup.mixed()
        .test("fileSize", "File size is too large", (value) => {
          if (typeof value === "string") {
            // If the value is a string (URL), assume it's valid
            return true;
          }
          return value && value.size <= 10000000; // 10MB limit
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (typeof value === "string") {
            // If the value is a string (URL), assume it's valid
            return true;
          }
          return value && ["image/jpeg", "image/png"].includes(value.type);
        })
        .required("A file is required"),

      //    . required('A file is required')
      //    .test('fileSize', 'File size is too large', value => value && value.size <= 10000000) // 2MB limit
      //    .test('fileType', 'Unsupported file format', value => value && ['image/jpeg', 'image/png'].includes(value.type)),
    }),
    onSubmit: (values, { resetForm }) => {
     

      if (typeof formik.values.image === "string") {
        axios
          .put("http://localhost:5000/updateSearchSubscription", {
            data: {
              name: values.name,
              maxCount: values.countOfSearch,
              price: values.price,
              timePeriod: values.day,
              description: values.description,
              imageUrl: values.image,
            },
            id: id,
          })
          .then((res) => {
            // onClearAll()
            // resetForm();
            // getUserDetails()
            showToastMessage();

            console.log("suces");
          });
      } else {
        axios.put("http://localhost:5000/updateSearchSubscription");

        const storageRef = ref(storage, values.image.name);
        uploadBytes(storageRef, values.image).then((snapshot) => {
          console.log("Uploaded a blob or file!");

          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(
              "downnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnloaddddddddddddddurllllllllllllllllllllll"
            );
            console.log(downloadURL);
            //  alert(values.price)
            axios
              .post("/updateSearchSubscription", {
                data: {
                  name: values.name,
                  maxCount: values.countOfSearch,
                  price: values.price,
                  timePeriod: values.day,
                  description: values.description,
                  imageUrl: downloadURL,
                },
                id: id,
              })
              .then((res) => {
                if (res.data.status) {
                  // getUserDetails()
                  showToastMessage();
                }
                // onClearAll()
                // resetForm();

                console.log("suces");
              });
          });
        });
      }
    },
  });
  {
    console.log("formik errorrrrrrrrrrrrrrrrrrrr");
  }
  {
    console.log(formik.errors);
  }

  function getUserDetails() {
    axios
      .get(`http://localhost:5000/getCurrentSearchSubscription/${userId}`)
      .then((res) => {
        if (res.data.data) {
          formik.setFieldValue("name", res.data.data.name);
          formik.setFieldValue("countOfSearch", res.data.data.maxCount);
          formik.setFieldValue("price", res.data.data.price);
          formik.setFieldValue("day", res.data.data.timePeriod);
          formik.setFieldValue("description", res.data.data.description);

          let url = res.data.data.imageUrl;
          formik.setFieldValue("image", url);
          // setName(res.data.data.name)
          // setCountOfSearch(res.data.data.maxCount)
          // setPrice(res.data.data.price)
          // setDay(res.data.data.timePeriod)
          // setDescription(res.data.data.description)
          setPrevImage(res.data.data.imageUrl);
          setId(res.data.data._id);
        }
      });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className=" top-0 left-0 w-full h-full overflow-y-auto overflow-x-hidden dark:bg-gray-800  ">
      <SidebarBox />
      <Header />
      <ToastContainer />

      <form onSubmit={formik.handleSubmit}>
        <div className="ml-0 md:ml-64  md:pt-36 w-full h-full dark:bg-gray-800 overflow-y-auto overflow-x-hidden ">
          <h1 className="text-xl pl-[120px] pt-1  font-bold text-gray-900 sm:text-2xl dark:text-white">
            Edit Subscription
          </h1>
          <br></br>

          <div className=" flex justify-start pl-[100px] items-center w-full h-full  ">
            <div className=" p-4 w-full max-w-2xl h-full md:h-auto">
              <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    edit Subscription
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>

                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <form action="#"> */}
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} // Ensure this is set
                      defaultValue="iPad Air Gen 5th Wi-Fi"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex : name"
                    />
                    {console.log("nameeeeeeeeeeee errorrrrrrrrrrrrrrr")}
                    {console.log(formik.touched.name)}

                    {formik.touched.name && formik.errors.name ? (
                      <span className="text-red-500 text-sm font-medium">
                        {formik.errors.name}
                      </span>
                    ) : //  <div className="text-red-500">{formik.errors.name}</div>
                    null}
                  </div>
                  <div>
                    <label
                      htmlFor="brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      How Many Search
                    </label>
                    <input
                      type="number"
                      name="countOfSearch"
                      id="brand"
                      value={formik.values.countOfSearch}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      //   onChange={onChangeCountOfSearch}
                      defaultValue="Google"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="how many search"
                    />
                    {formik.touched.countOfSearch &&
                    formik.errors.countOfSearch ? (
                      <div className="text-red-500 text-sm font-medium">
                        {formik.errors.countOfSearch}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      //   onChange={onChangePrice}
                      onBlur={formik.handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className="text-red-500 text-sm font-medium">
                        {formik.errors.price}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Time Period
                    </label>
                    <input
                      type="number"
                      name="day"
                      id="price"
                      value={formik.values.day}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      //   onChange={onChangeDay}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="day"
                    />
                    {formik.touched.day && formik.errors.day ? (
                      <div className="text-red-500 text-sm font-medium">
                        {formik.errors.day}
                      </div>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="5"
                      name="description"
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      //   onChange={onChangeDiscription}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description..."
                    />
                  </div>
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-500 text-sm font-medium">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>

                {/* <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add product
                  </button>
                  <button
                    type="button"
                    className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <svg
                      className="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div> */}

                {/* </form> */}
              </div>
            </div>
          </div>

          {!prevImage && (
            <div className="w-[550px]   justify-start ml-[150px] mt-16  relative border-2 border-gray-600 border-dashed rounded-lg p-6 bg-gray-800">
              <input
                type="file"
                name="image"
                className="absolute inset-0 w-full h-full opacity-0 z-50"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
              />
              <div className="text-center">
                <img
                  className="mx-auto h-12 w-12"
                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                  alt="Upload Icon"
                />

                <h3 className="mt-2 text-sm font-medium text-gray-100">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer"
                  >
                    <span>Drag and drop</span>
                    <span className="text-indigo-400"> or browse</span>
                    <span> to upload</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
          {formik.touched.image && formik.errors.image ? (
            <div className="text-red-500 text-sm font-medium ml-40">
              {formik.errors.image}
            </div>
          ) : null}

          {/* {prevImage&&<img  className=" ml-[200px] w-[150px] h-[150px] " id="preview" alt="Preview" src={prevImage} />} */}

          {prevImage && (
            <div className="relative inline-block">
              <img
                className="ml-[200px] w-[150px] h-[150px] rounded-lg"
                id="preview"
                alt="Preview"
                src={prevImage}
              />

              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
                aria-label="Delete"
                onClick={onDeleteImage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <br></br>
          <br></br>

          <div
            className="fixed bottom-4 right-4 flex items-center w-[500px] p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-black"
            role="alert"
          >
            <div className="text-sm font-normal"></div>
            <a
              className="text-sm font-medium text-red-500 p-1.5 hover:bg-blue-100 rounded-lg dark:text-red-500 dark:hover:bg-gray-700"
              onClick={onClearAll}
            >
              Discard
            </a>
            <div className="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </div>

          <br></br>
        </div>
      </form>
    </div>
  );
};
export default EditSubscription;
