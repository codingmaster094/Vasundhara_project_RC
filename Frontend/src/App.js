import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.css';
import './App.css';
import './utilities.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import PrivetRoutes from './Component/PrivetRoutes';
import Protected from './Component/Protected'
import axios from 'axios';
import { env } from './env'
import { createContext, useState } from 'react';

import RC_DL_Info from './pages/DL_RC_info/RC_DL_Info';
import Add_RC_DL from './pages/DL_RC_info/Add_RC_DL';
import View_RC_DL_info from './pages/DL_RC_info/View_RC_DL_info';
import Edit_RC_DL_info from './pages/DL_RC_info/Edit_RC_DL_info';

import Traffic_state from './pages/Traffic_State/Traffic_state';
import Add_Traffic_state from './pages/Traffic_State/Add_Traffic_state';
import View_traffic_state from './pages/Traffic_State/View_traffic_state';
import Edit_traffic_state from './pages/Traffic_State/Edit_traffic_state';

import Traffic_rule from './pages/Traffic_Rule/Traffic_rule';
import Add_Traffic_rule from './pages/Traffic_Rule/Add_Traffic_rule';
import View_traffic_rule from './pages/Traffic_Rule/View_traffic_rule';
import Edit_traffic_rule from './pages/Traffic_Rule/Edit_traffic_rule';
import Traffic_language from './pages/Traffic_Rule/Traffic_language';
import News_category from './pages/News_category/News_category';
import Add_News_category from './pages/News_category/Add_News_category';
import View_News_category from './pages/News_category/View_News_category';
import Edit_News_category from './pages/News_category/Edit_News_category';

import News_headline from './pages/News_headline/News_headline';
import Add_News_headline from './pages/News_headline/Add_News_headline';
import View_News_headline from './pages/News_headline/View_News_headline';
import Edit_News_headline from './pages/News_headline/Edit_News_headline';

import News from './pages/News/News';
import Add_News from './pages/News/Add_News';
import View_News from './pages/News/View_News';
import Edit_News from './pages/News/Edit_News';

import Add_tag from './pages/Tags/Add_tag';
import View_tag from './pages/Tags/View_tag';
import Edit_tag from './pages/Tags/Edit_tag';
import Tag from './pages/Tags/Tag';

import Driving_School_state from './pages/Driving School State/Driving_School_state';
import Add_Driving_school_state from './pages/Driving School State/Add_Driving_school_state';
import View_Driving_school_state from './pages/Driving School State/View_Driving_school_state';
import Edit_Driving_school_state from './pages/Driving School State/Edit_Driving_school_state';

import Driving_School_city from './pages/Driving_school_city/Driving_school_city';
import Add_Driving_school_city from './pages/Driving_school_city/Add_Driving_school_city'
import View_Driving_school_city from './pages/Driving_school_city/View_Driving_School_city';
import Edit_Driving_school_city from './pages/Driving_school_city/Edit_Driving_school_city';

import Driving_school_Area from './pages/Driving_school_Area/Driving_school_Area';
import Add_Driving_school_Area from './pages/Driving_school_Area/Add_Driving_school_Area';
import View_Driving_school_Area from './pages/Driving_school_Area/View_Driving_school_Area';
import Edit_Driving_school_Area from './pages/Driving_school_Area/Edit_Driving_school_Area';
import Driving_school_Detail from './pages/Driving_school_Details/Driving_school_Detail';
import Add_Driving_scholl_Detail from './pages/Driving_school_Details/Add_Driving_scholl_Detail';
import View_Driving_school_Detail from './pages/Driving_school_Details/View_Driving_school_Detail';
import Edit_Driving_school_Detail from './pages/Driving_school_Details/Edit_Driving_school_Detail';
import Service_state from './pages/Service Center State/Service_state';
import Add_service_state from './pages/Service Center State/Add_service_state';
import View_service_state from './pages/Service Center State/View_service_state';
import Edit_service_state from './pages/Service Center State/Edit_service_state';
import Service_center_city from './pages/Service Center city/Service_center_city';
import Add_Service_ceneter_city from './pages/Service Center city/Add_Service_ceneter_city';
import View_Service_center_city from './pages/Service Center city/View_Service_center_city';
import Edit_service_center_city from './pages/Service Center city/Edit_service_center_city';
import Service_center_brand from './pages/Service Center Brand/Service_center_brand';
import Add_servic_center_brand from './pages/Service Center Brand/Add_servic_center_brand';
import View_service_center_brand from './pages/Service Center Brand/View_service_center_brand';
import Edit_service_center_brand from './pages/Service Center Brand/Edit_service_center_brand';
import Service_center from './pages/Service Center/Service_center';
import Add_service_center from './pages/Service Center/Add_service_center';
import View_service_center from './pages/Service Center/View_service_center';
import Edit_service_center from './pages/Service Center/Edit_service_center';

import Service_Dealer from './pages/Service Dealer/Service_Dealer';
import Add_service_Dealer from './pages/Service Dealer/Add_Service_Dealer';
import View_service_Dealer from './pages/Service Dealer/View_Service_Dealer';
import Edit_service_Dealer from './pages/Service Dealer/Edit_Service_Dealer';
import Fuel_price from './pages/Fuel Price/Fuel_price';
import Add_Fuel_Price from './pages/Fuel Price/Add_Fuel_Price';
import View_Fuel_Price from './pages/Fuel Price/View_Fuel_Price';
import Edit_Fuel_Price from './pages/Fuel Price/Edit_Fuel_Price';
import Vehicale_Categoty from './pages/Vehical_category/Vehicale_Categoty';
import ADD_Vehicale_Categoty from './pages/Vehical_category/ADD_Vehicale_Categoty';
import View_Vehicale_Categoty from './pages/Vehical_category/View_Vehicale_Categoty';
import Edit_Vehicale_Categoty from './pages/Vehical_category/Edit_Vehicale_Categoty';
import Vehicale_Brand from './pages/vehicale brand/Vehicale_Brand';
import Add_Vehicale_Brand from './pages/vehicale brand/Add_Vehicale_Brand';
import View_Vehicale_Brand from './pages/vehicale brand/View_Vehicale_Brand';
import Edit_Vehicale_Brand from './pages/vehicale brand/Edit_Vehicale_Brand';
import Vehicale_body_type from './pages/Vehicale Body Type/Vehicale_body_type';
import Add_Vehicale_body_type from './pages/Vehicale Body Type/Add_Vehicale_body_type';
import View_Vehicale_body_type from './pages/Vehicale Body Type/View_Vehicale_body_type';
import Edit_Vehicale_body_type from './pages/Vehicale Body Type/Edit_Vehicale_body_type';
import Key_Specification from './pages/Vehical Key specification/Key_Specification';
import Add_Key_Specification from './pages/Vehical Key specification/Add_Key_Specification';
import View_Key_Specification from './pages/Vehical Key specification/View_Key_Specification';
import Edit_Key_Specification from './pages/Vehical Key specification/Edit_Key_Specification';
import Vehicale_information from './pages/Vehicale Information/Vehicale_information';
import Add_Vehicale_information from './pages/Vehicale Information/Add_Vehicale_information';
import View_Vehicale_information from './pages/Vehicale Information/View_Vehicale_information';
import Edit_vehicke_information from './pages/Vehicale Information/Edit_vehicke_information';
import Variant_specification from './pages/Variant_specification/Variant_specification';
import Variant_specification_add from './pages/Variant_specification/Variant_specification_add';
import Variant_specification_edit from './pages/Variant_specification/Variant_specification_edit';
import Variant_specification_view from './pages/Variant_specification/Variant_specification_view';

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

export const AuthContext = createContext()

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Protected />}>
                        <Route path="/" element={<Login />} />
                    </Route>
                    <Route element={<PrivetRoutes />}>
                        <Route path="/Home" element={<Home />} />
                        <Route path="*" element={<PageNotFound />} />
                        
                        <Route path="/DL_RC_info" element={<RC_DL_Info/>}/>
                        <Route path="/Add/DL_RC_info" element={<Add_RC_DL/>}/>
                        <Route path="/view/DL_RC_info/:id" element={<View_RC_DL_info/>}/>
                        <Route path="/Edit/DL_RC_info/:id" element={<Edit_RC_DL_info/>}/>
                        
                        <Route path="/Traffic_state" element={<Traffic_state/>}/>
                        <Route path="/Add/Traffic_state" element={<Add_Traffic_state/>}/>
                        <Route path="/view/Traffic_state/:id" element={<View_traffic_state/>}/>
                        <Route path="/Edit/Traffic_state/:id" element={<Edit_traffic_state/>}/>

                        <Route path="/Traffic_rule" element={<Traffic_rule/>}/>
                        <Route path="/Add/Traffic_rule" element={<Add_Traffic_rule/>}/>
                        <Route path="/view/Traffic_rule/:id" element={<View_traffic_rule/>}/>
                        <Route path="/Edit/Traffic_rule/:id" element={<Edit_traffic_rule/>}/>
                        <Route path="/Traffic_language" element={<Traffic_language/>}/>

                        <Route path="/news_category" element={<News_category/>}/>
                        <Route path="/Add/news_category" element={<Add_News_category/>}/>
                        <Route path="/view/news_category/:id" element={<View_News_category/>}/>
                        <Route path="/Edit/news_category" element={<Edit_News_category/>}/>

                        <Route path="/news_Headline" element={<News_headline/>}/>
                        <Route path="/Add/news_Headline" element={<Add_News_headline/>}/>
                        <Route path="/view/news_Headline/:id" element={<View_News_headline/>}/>
                        <Route path="/Edit/news_Headline/:id" element={<Edit_News_headline/>}/>

                        <Route path="/news" element={<News/>}/>
                        <Route path="/Add/news" element={<Add_News/>}/>
                        <Route path="/view/news/:id" element={<View_News/>}/>
                        <Route path="/Edit/news/:id" element={<Edit_News/>}/>

                        <Route path="/tag" element={<Tag/>}/>
                        <Route path="/Add/tag" element={<Add_tag/>}/>
                        <Route path="/view/tag/:id" element={<View_tag/>}/>
                        <Route path="/Edit/tag/:id" element={<Edit_tag/>}/>

                        <Route path="/driving" element={<Driving_School_state/>}/>
                        <Route path="/Add/driving" element={<Add_Driving_school_state/>}/>
                        <Route path="/view/driving/:id" element={<View_Driving_school_state/>}/>
                        <Route path="/Edit/driving/:id" element={<Edit_Driving_school_state/>}/>

                        <Route path="/driving_city" element={<Driving_School_city/>}/>
                        <Route path="/Add/driving_city" element={<Add_Driving_school_city/>}/>
                        <Route path="/view/driving_city/:id" element={<View_Driving_school_city/>}/>
                        <Route path="/Edit/driving_city/:id" element={<Edit_Driving_school_city/>}/>

                        <Route path="/driving_Area" element={<Driving_school_Area/>}/>
                        <Route path="/Add/driving_Area" element={<Add_Driving_school_Area/>}/>
                        <Route path="/view/driving_Area/:id" element={<View_Driving_school_Area/>}/>
                        <Route path="/Edit/driving_Area/:id" element={<Edit_Driving_school_Area/>}/>

                        <Route path="/driving_Detail" element={<Driving_school_Detail/>}/>
                        <Route path="/Add/driving_Detail" element={<Add_Driving_scholl_Detail/>}/>
                        <Route path="/view/driving_Detail/:id" element={<View_Driving_school_Detail/>}/>
                        <Route path="/Edit/driving_Detail/:id" element={<Edit_Driving_school_Detail/>}/>

                        <Route path="/service_state" element={<Service_state/>}/>
                        <Route path="/Add/service_state" element={<Add_service_state/>}/>
                        <Route path="/view/service_state/:id" element={<View_service_state/>}/>
                        <Route path="/Edit/service_state/:id" element={<Edit_service_state/>}/>

                        <Route path="/service_city" element={<Service_center_city/>}/>
                        <Route path="/Add/service_city" element={<Add_Service_ceneter_city/>}/>
                        <Route path="/view/service_city/:id" element={<View_Service_center_city/>}/>
                        <Route path="/Edit/service_city/:id" element={<Edit_service_center_city/>}/>

                        <Route path="/service_brand" element={<Service_center_brand/>}/>
                        <Route path="/Add/service_brand" element={<Add_servic_center_brand/>}/>
                        <Route path="/view/service_brand/:id" element={<View_service_center_brand/>}/>
                        <Route path="/Edit/service_brand/:id" element={<Edit_service_center_brand/>}/>

                        <Route path="/service_center" element={<Service_center/>}/>
                        <Route path="/Add/service_center" element={<Add_service_center/>}/>
                        <Route path="/view/service_center/:id" element={<View_service_center/>}/>
                        <Route path="/Edit/service_center/:id" element={<Edit_service_center/>}/>
                        
                        <Route path="/service_Dealer" element={<Service_Dealer/>}/>
                        <Route path="/Add/service_Dealer" element={<Add_service_Dealer/>}/>
                        <Route path="/view/service_Dealer/:id" element={<View_service_Dealer/>}/>
                        <Route path="/Edit/service_Dealer/:id" element={<Edit_service_Dealer/>}/>

                        <Route path="/Vehicale_Categoty" element={<Vehicale_Categoty/>}/>
                        <Route path="/Add/Vehicale_Categoty" element={<ADD_Vehicale_Categoty/>}/>
                        <Route path="/view/Vehicale_Categoty/:id" element={<View_Vehicale_Categoty/>}/>
                        <Route path="/Edit/Vehicale_Categoty/:id" element={<Edit_Vehicale_Categoty/>}/>

                        <Route path="/Vehicale_Brand" element={<Vehicale_Brand/>}/>
                        <Route path="/Add/Vehicale_Brand" element={<Add_Vehicale_Brand/>}/>
                        <Route path="/view/Vehicale_Brand/:id" element={<View_Vehicale_Brand/>}/>
                        <Route path="/Edit/Vehicale_Brand/:id" element={<Edit_Vehicale_Brand/>}/>

                        <Route path="/Vehicale_body_type" element={<Vehicale_body_type/>}/>
                        <Route path="/Add/Vehicale_body_type" element={<Add_Vehicale_body_type/>}/>
                        <Route path="/view/Vehicale_body_type/:id" element={<View_Vehicale_body_type/>}/>
                        <Route path="/Edit/Vehicale_body_type/:id" element={<Edit_Vehicale_body_type/>}/>

                        <Route path="/Key_Specification" element={<Key_Specification/>}/>
                        <Route path="/Add/Key_Specification" element={<Add_Key_Specification/>}/>
                        <Route path="/view/Key_Specification/:id" element={<View_Key_Specification/>}/>
                        <Route path="/Edit/Key_Specification/:id" element={<Edit_Key_Specification/>}/>

                        <Route path="/Vehicale_information" element={<Vehicale_information/>}/>
                        <Route path="/add/Vehicale_information" element={<Add_Vehicale_information/>}/>
                        <Route path="/view/Vehicale_information/:id" element={<View_Vehicale_information/>}/>
                        <Route path="/Edit/Vehicale_information/:id" element={<Edit_vehicke_information/>}/>

                        <Route path="/Variant_specification" element={<Variant_specification/>}/>
                        <Route path="/Add/Variant_specification" element={<Variant_specification_add/>}/>
                        <Route path="/view/Variant_specification/:id" element={<Variant_specification_view/>}/>
                        <Route path="/Edit/Variant_specification/:id" element={<Variant_specification_edit/>}/>

                        <Route path="/fuel/price" element={<Fuel_price/>}/>
                        <Route path="/Add/fuel/price" element={<Add_Fuel_Price/>}/>
                        <Route path="/view/fuel/price/:id" element={<View_Fuel_Price/>}/>
                        <Route path="/Edit/fuel/price/:id" element={<Edit_Fuel_Price/>}/>

                    </Route>

                </Routes>
            </BrowserRouter>
            <ToastContainer position='bottom-right' autoClose={500} />
        </>
    )
}

export default App;
