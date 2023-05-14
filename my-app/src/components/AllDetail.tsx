import { useSelector } from "react-redux"
import { store } from "../redux/store"
import {useNavigate} from "react-router-dom"

export const AllDetail=()=>{

    let id= localStorage.getItem("editIndex")
    const myData= useSelector(()=>
        store.getState().formData.list[Number(id)]
    )

const navigate= useNavigate()
    return (
        <>
        <button
        type="button"
        onClick={() => {
          localStorage.removeItem("editIndex");
          navigate("/");
        }}
        style={{ backgroundColor: "#2266d4" }}
        className=" ml-10 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        Back
      </button>
        <div
      className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
        <h1>Contact Details</h1>
        <div>
                    
                    <p className="text-base leading-4 mt-7 text-gray-600">First Name: {myData.firstName} </p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Last Name: {myData.lastName}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Email: {myData.email}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">Status: {myData.status}</p>
               
                </div>
        </div>
        </>
    )
}