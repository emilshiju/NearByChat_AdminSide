import SidebarBox from "../component/sidebar";
import Header from "../component/header";
import React ,{useEffect, useState,useContext} from "react"


import { DataGrid} from '@mui/x-data-grid';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Avatar,
  } from '@mui/material';
  
  import DeleteIcon from '@mui/icons-material/Delete';
  import SearchBox from "../component/searchBox";
  import axios, { Axios } from "axios";
  import useDebouncedValue from "../hooks/useSearching";

  import Pagination from "../component/pagination";


  import io from "socket.io-client";


 const socket = io("http://localhost:5000");

 import Swal from 'sweetalert2';
import { responsiveContext } from "../context/createContext";



const users = [
  {
    id: 1,
    name: 'John Doe',
    status: 'Active',
    dob: '1990-01-01',
    gender: 'Male',
    email: 'john.doe@example.com'
  },
  {
    id: 2,
    name: 'Jane Smith',
    status: 'Inactive',
    dob: '1985-05-12',
    gender: 'Female',
    email: 'jane.smith@example.com'
  }
  // Add more user objects here
];


const Userslist = () => {

    const token = JSON.parse(localStorage.getItem('adminaccestoken'));
    
  const [user,setUser]=useState([])
  const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)

  const [currentPage,setCurrentPage]=useState(1)
  const [postPerPage,setPostperPage]=useState(4)

  const handlePagination=(pageNumber)=>{
  
    setCurrentPage(pageNumber)

  }

  const [updated,setUpdated]=useState(null)


     useEffect(()=>{
 
      axios.get('http://localhost:5000/getAllUsers',
        {
            headers: {
                // Define your headers here
                'Content-Type': 'application/json', // Example content type
                'Authorization': `Bearer ${token}` // Assuming token is stored and retrieved correctly
              }
            }
      )
      .then((response)=>{
        
        console.log("allllllllllllllllll useressssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        console.log(response.data.data)
          setUser(response.data.data)
      })
     },[updated])

  
     

     const [value, setValue] = useState('');

    const debouncedSearchTerm = useDebouncedValue(value, 500);
 

  useEffect(() => {
    // API call or other actions to be performed with debounced value
    
    
    axios.get(`http://localhost:5000/searchUsers?value=${value}`,{
        headers: {
            // Define your headers here
            'Content-Type': 'application/json', // Example content type
            'authorization': `Bearer ${token}` // Assuming token is stored and retrieved correctly
          }
    })
    .then((response)=>{
        console.log(response.data.data)
        // alert(response.data.data)
        setUser(response.data.data)
    })


  }, [debouncedSearchTerm]);
   
    
      
      
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  
    
    
      const handleDelete = (userId) => {
        console.log(`Delete user with ID: ${userId}`);
        // Implement delete functionality
      };
      
      const blockUser=(id,status)=>{
   


          
        //   if(status==true){
        //     socket.emit("blockuserlive",{id,status})
        //   }
        // axios.patch('http://localhost:5000/blockUser',{id,status},
        //     {
        //         headers: {
        //             // Define your headers here
        //             'Content-Type': 'application/json', // Example content type
        //             'authorization': `Bearer ${token}` // Assuming token is stored and retrieved correctly
        //           }
        //     }
        // )
        // .then((response)=>{
           
        //     setUpdated(!updated)
        // })
         
        if (status) {
            // Show confirmation dialog
            Swal.fire({
              title: 'Are you sure?',
              text: 'This action will block the user.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, block it!',
              cancelButtonText: 'Cancel'
            }).then((result) => {
              if (result.isConfirmed) {
                // Proceed with blocking user
                socket.emit("blockuserlive", { id, status });
                // socket.emit("blockuserlive",{id,status})
                
                axios.patch('http://localhost:5000/blockUser', { id, status }, {
                    headers: {
                      'Content-Type': 'application/json',
                      'authorization': `Bearer ${token}` // Assuming token is stored and retrieved correctly
                    }
                  })
                  .then((response) => {
                    // Update state or handle success
                    setUpdated(!updated);
                    Swal.fire(
                      'Blocked!',
                      'The user has been blocked.',
                      'success'
                    );
                  })
                  .catch((error) => {
                    // Handle error
                    console.error('There was an error blocking the user!', error);
                    Swal.fire(
                      'Error!',
                      'There was an issue blocking the user.',
                      'error'
                    );
                  });
              }
            });
          }else{


            axios.patch('http://localhost:5000/blockUser',{id,status},
                    {
                        headers: {
                            // Define your headers here
                            'Content-Type': 'application/json', // Example content type
                            'authorization': `Bearer ${token}` // Assuming token is stored and retrieved correctly
                          }
                    }
                )
                .then((response)=>{
                   
                    setUpdated(!updated)
                })


          }
        




      }


   
function formatDate(isoTimestamp) {
    // Create a Date object from the ISO 8601 timestamp
    const date = new Date(isoTimestamp);

  
    // Options for formatting the date
    const options = {
        year: 'numeric',  
        day: 'numeric',
         month: 'long',
       
      // "2024"
           // "July"
          // "11"
    };
  
    // Convert to a readable date string
    const readableDate = date.toLocaleDateString('en-US', options);
  

    console.log("reddddddddddddddddddddddddddddddd")
    console.log(readableDate)
    const s=readableDate.split(',')
    console.log(s)
    let r=s[0]
    console.log(r)
    const a=r.split(' ')
    a.reverse()
   let p= a.join(' ')
   const final= p+s[1]
   
    return final;
  }
  
  
 


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


<div >
<SidebarBox />
      <Header />



      <div  className=' ' style={{ paddingTop: '20px' }}>
      <br></br>
      


      <div  >


    <div className=" bg-white dark:bg-gray-800 h-screen"  > 
    <br></br>

  


 
 <div  style={{paddingLeft: responsiveMd ? " 280px": "0px",paddingTop:'40px',paddingRight:'10px'}} >
 
 <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white " >
            All users
        </h1>
        <br  />
        
        
 <div className="sm:flex   ">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                <form className="lg:pr-3" action="#" method="GET">
                    <label htmlFor="users-search" className="sr-only">Search</label>
                    <div className="relative mt-1 lg:w-64 xl:w-96">
                        <input
                            type="text"
                            name="email"
                            id="users-search"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search for users"
                        />
                    </div>
                </form>
                <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                   
                </div>
            </div>


        </div>
    </div>

<br></br>





    <div className="flex flex-col " style={{paddingLeft:responsiveMd ? "280px":'0px'}}>
            <div className="overflow-x-auto ">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <table className="min-w-full  divide-y divide-gray-200 table-fixed dark:divide-gray-600">
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
                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400" >
                                        Name
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Nick name
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        dob
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        gender
                                    </th>
                                    
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Status
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400 " >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {currentPosts &&currentPosts .map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-${user?.id}`}
                                                    aria-describedby="checkbox-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor={`checkbox-${user?.id}`} className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={`${user?.imageUrl}`}
                                                alt={`error`}
                                            />
                                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                
                                                <div className="text-base font-semibold text-gray-900 dark:text-white">{user?.userName}</div>
                                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{user?.email}</div>
                                            </div>
                                        </td>
                                        <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{user?.nickName?.trim().length!==0 ? user?.nickName: user?.userName}</td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatDate(user?.dob)}</td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{user?.gender}</td>
                                       
                                        <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full ${user?.status? 'bg-green-400' : 'bg-red-500'} mr-2`}></div>
                                                {user?.status?'Active':'Block'}
                                            </div>
                                        </td>
                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                            <button
                                                type="button"
                                                data-modal-target="edit-user-modal"
                                                data-modal-toggle="edit-user-modal"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                onClick={()=>blockUser(user?._id,user?.status)}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                </svg>
                                                {user?.status? 'Block User' :'UN Block User'}
                                            </button>
                                            
                                        </td>
                                    </tr>
                                ))}

                     </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    

    

    
        <Pagination
  length={user.length}
  postsPerPage={postPerPage}
  currentPage={currentPage}
  handlePagination={handlePagination}
/>
       



       



    </div>


    
    </div>




    </div>

















    </div>


  );
};

export default Userslist
