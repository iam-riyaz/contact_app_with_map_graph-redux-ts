import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { contactEdit, formSubmit } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export default function Contact() {

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
  });
  const editIndex = localStorage.getItem("editIndex");
  
  
  useEffect(()=>{
     if(editIndex)
     {
      const data=store.getState().formData.list[Number(editIndex)]
      setFormData(data)
     }
  },[])
 


  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("your contact has been saved successfully");
    if(!editIndex)
    {

      dispatch(formSubmit(formData));
    }
    else{
      const index= Number(editIndex);

      console.log(".......",{formData})
      dispatch(contactEdit(index,formData))
    }
    navigate("/");

    // console.log({formData})
    const data = store.getState();
    console.log(data);

    

  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData)

  const navigate = useNavigate();



  // if (editIndex) {
  //   const editData = store.getState().formData.list[Number(editIndex)];

  //   setFormData(editData);
  // }

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
      <div className="m-0 flex min-h flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto  sm:max-w-sm ">
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {editIndex ? "Edit Contact" : "Create Contact"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
              
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                style={{fontSize:"18px", padding:"6px"}}
                 placeholder="First Name"
                defaultValue={formData.firstName }
                  onChange={handleChange}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                style={{fontSize:"18px", padding:"6px"}}
                placeholder="Last Name"
                defaultValue={formData.lastName}
                  onChange={handleChange}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                style={{fontSize:"18px", padding:"6px"}}
                placeholder="Email"
                defaultValue={formData.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                status:
              </label>
              <div className="mt-2">
                <select
                style={{fontSize:"18px", padding:"6px"}}
                placeholder="Select"
                defaultValue={formData.status}
                  onChange={handleChange}
                  id="status"
                  name="status"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option>Choose</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>
            </div>

            <div>
              <button
                // type="submit"
                className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </>
  );
}
