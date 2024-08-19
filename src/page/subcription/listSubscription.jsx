import { useEffect, useState ,useContext } from "react"
import Header from "../../component/header"
import SidebarBox from "../../component/sidebar"
import axios from "axios"
import { useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';
import { responsiveContext } from "../../context/createContext"

const ListSubscription=()=>{


  const navigate=useNavigate()


    const [allSearchSubscription,setAllSearchSubscription]=useState()

    const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)



    function getAllSub(){


        axios.get('http://localhost:5000/getAllSearchSubscription')
        .then((res)=>{
            if(res.data.data){
                console.log("gettttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
                console.log(res.data.data)
                setAllSearchSubscription(res.data.data)
            }
        })


    }

    useEffect(()=>{
    
        getAllSub()
    },[])


    const redirectToEditSubscription=(id)=>{

          navigate(`/editSubscription/${id}`)
    }



    const ondeleteSubscription=(id)=>{

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this subscription?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
             
              axios.delete(`http://localhost:5000/deleteSearchSubscription/${id}`)
              .then((res)=>{
                if(res.data.status){
                    getAllSub()
                }
              })
              // Example: Call a function to delete the subscription
          
            } else {
              console.log('Deletion canceled');
            }
          });


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
          } else  {
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
            <SidebarBox  />
            <Header  />
            



            <div style={{ paddingTop: '20px' }}>
      <br></br>
      <div  >
    <div className=" bg-white dark:bg-gray-800 h-screen"  > 
    <br></br>
  
 
 
 <div style={{paddingLeft:responsiveMd ? "280px" : "0px",paddingTop:'40px',paddingRight:'10px'}}>
 
 <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white" >
            list subscription
        </h1>
        <br  />
        
        
 <div className="sm:flex ">
            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                <form className="lg:pr-3" action="#" method="GET">
                    <label htmlFor="users-search" className="sr-only">Search</label>
                    <div className=" mt-1 lg:w-64 xl:w-96">
                        <input
                            type="text"
                            name="email"
                            id="users-search"
                           
                            
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search Subscription"
                        />
                    </div>
                </form>
                <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                    
                </div>
            </div>


        </div>
    </div>

<br></br>

    <div className="flex flex-col" style={{paddingLeft:responsiveMd ?'280px' :"0px"}}>
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
                                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400" >
                                        Name
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Max Count
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Price
                                    </th>
                                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        timePeriod
                                    </th>
                                    
                                    {/* <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                                        Status
                                    </th> */}
                                    <th scope="col" className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400 " >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                        {console.log(allSearchSubscription)}
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {allSearchSubscription&&allSearchSubscription.map((a,b)=>{
                                    return (
                                          
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                               
                                                    aria-describedby="checkbox-1"
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                            <img
                                                className="w-20 h-20 rounded-full"
                                               src={a.imageUrl}
                                                alt={`error`}
                                            />
                                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                
                                                {/* <div className="text-base font-semibold text-gray-900 dark:text-white">{a.name}</div> */}
                                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">{a.name}</div>
                                            </div>
                                        </td>
                                        <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">{a.maxCount}</td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.price}</td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.timePeriod}</td>
                                        {/* <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">{a.timePeroid}</td> */}
                                        {/* <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                              
                                            </div>
                                        </td> */}
                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                            <button
                                                type="button"
                                                data-modal-target="edit-user-modal"
                                                data-modal-toggle="edit-user-modal"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                onClick={()=>redirectToEditSubscription(a._id)}
                                                
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                                </svg>
                                                {'Edit '}
                                            </button>
                                            <button
                                                type="button"
                                                data-modal-target="delete-user-modal"
                                                data-modal-toggle="delete-user-modal"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                                onClick={()=>ondeleteSubscription(a._id)}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                                Delete 
                                            </button>
                                        </td>
                                    </tr>
                                  )})}
                             

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
    )
}


export default ListSubscription