

import {Route,Routes} from "react-router-dom"
import List from "./List"
import Contact from "./Contact"
import { ChartAndMap } from "./ChartAndMap"
import { AllDetail } from "./AllDetail"

export const AllRoutes=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<List/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="charts-map" element={<ChartAndMap/>}/>
            <Route path="detail" element={<AllDetail/>}/>

        </Routes>
        </>
    )
}