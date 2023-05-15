// import React from "react";

import { AllRoutes } from "./AllRoute";
import {Link} from "react-router-dom"
import Contact from "./Contact";
import List from "./List";


export default function Sidebar() {
    return (
        <div className="flex">
            <div style={{
                background: "linear-gradient(to right bottom, #4a8deb, #815eb7, #cb53b1, #f771a2, #ff8c8c)"
            }} className="flex flex-col min-h-screen p-3 bg-white shadow w-60">
                <div className="">
                    <div style={{position:"fixed"}} className="flex items-center">
                        <h2 className="text-xl font-bold">Dashboard</h2>
                    </div>
                    <div style={{position:"fixed", marginTop:"30px"}} className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <Link to={"/"}
                                    
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <span className="font-bold">Contact</span>
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link to={"/charts-map"}
                                    
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        />
                                    </svg>
                                    <span className="font-bold">Charts & Map</span>
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ margin:"0px", paddingTop:"20px", background: " linear-gradient(to left top, #dce8f9, #e7e5f6, #efe4f0, #f2e3e9, #f2e4e4)"}} className="container mx-auto mt-12">
            {/* every this apart form the sidebar will appear here and change based on clicks, and navigation */}
                    <AllRoutes/>
                
                
            </div>
        </div>
    );
}