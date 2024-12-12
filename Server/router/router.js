import express from 'express'
const router = express.Router()
import Driving_controller from "../controller/Drivingcontroller.js"
import Service_controller from "../controller/ServiceCentercontroller.js"
import RC_DL_controller from "../controller/Rc_informationcontroller.js"
import FuelController from "../controller/FuelController.js"
import Tags from "../controller/Tags_controller.js"
import News from "../controller/News_Controller.js"
import VehicleInfoController from '../controller/VehicleInfo.js'
import user from '../controller/user.js'
import Authentication from '../Authentication/Authentication.js'

// *************************************************** user *************************************************************
router.post("/user_register" , user.user_register)
router.post("/user_Update" , user.User_update)
router.post("/user_login" , user.login)
router.post("/get_user" , user.GetUser)
router.post("/user_logout" ,Authentication.Authentication, user.logout)
router.post("/protect_route" ,Authentication.Authentication, user.Protect_route)

// ************************************************** Driving ***************************************************************//

// Driving State API
router.post("/create_state", Authentication.Authentication,Driving_controller.create_state)
router.post("/get_state", Authentication.Authentication,Driving_controller.Get_state)
router.post("/get_state_ID/:id", Authentication.Authentication,Driving_controller.Get_state_ID)
router.post("/Update_state/:id", Authentication.Authentication,Driving_controller.Update_state)
router.post("/delete_state", Authentication.Authentication,Driving_controller.Delete_state)
router.post("/state_search", Authentication.Authentication,Driving_controller.state_search)

// Driving City API
router.post("/create_city", Authentication.Authentication,Driving_controller.create_city)
router.post("/get_city", Authentication.Authentication,Driving_controller.Get_city)
router.post("/get_city_ID/:id",Authentication.Authentication, Driving_controller.Get_city_ID)
router.post("/Update_city/:id",Authentication.Authentication, Driving_controller.Update_city)
router.post("/delete_city", Authentication.Authentication,Driving_controller.Delete_city)
router.post("/city_search", Authentication.Authentication,Driving_controller.city_search)

// Driving Area API
router.post("/create_area", Authentication.Authentication,Driving_controller.create_area)
router.post("/get_area", Authentication.Authentication,Driving_controller.Get_area)
router.post("/get_area_ID/:id",Authentication.Authentication, Driving_controller.Get_area_ID)
router.post("/Update_area/:id", Authentication.Authentication,Driving_controller.Update_area)
router.post("/delete_area", Authentication.Authentication,Driving_controller.Delete_area)
router.post("/area_search",Authentication.Authentication, Driving_controller.area_search)

// Driving Details API
router.post("/create_details",Authentication.Authentication, Driving_controller.create_details)
router.post("/get_details", Authentication.Authentication,Driving_controller.Get_details)
router.post("/Get_details_ID/:id",Authentication.Authentication, Driving_controller.Get_details_ID)
router.post("/Update_details/:id",Authentication.Authentication, Driving_controller.Update_details)
router.post("/delete_details",Authentication.Authentication, Driving_controller.Delete_details)
router.post("/details_search", Authentication.Authentication,Driving_controller.details_search)
router.post("/toggle_deatails",Authentication.Authentication, Driving_controller.toggleDetails)

// ************************************************* Service Center **************************************************************//

// Service Center State API //
router.post("/srevice_create_state", Authentication.Authentication,Service_controller.create_state)
router.post("/srevice_get_state", Authentication.Authentication,Service_controller.Get_state)
router.post("/srevice_get_state_ID/:id",Authentication.Authentication, Service_controller.Get_state_ID)
router.post("/srevice_update_state/:id",Authentication.Authentication, Service_controller.Update_state)
router.post("/srevice_delete_state", Authentication.Authentication,Service_controller.Delete_state)
router.post("/srevice_toggle", Authentication.Authentication,Service_controller.toggle_service_satate)


// Service Center City API //
router.post("/srevice_create_city", Authentication.Authentication,Service_controller.create_city)
router.post("/srevice_get_city",Authentication.Authentication, Service_controller.Get_city)
router.post("/srevice_get_city_ID/:id",Authentication.Authentication, Service_controller.Get_city_ID)
router.post("/srevice_update_city/:id",Authentication.Authentication, Service_controller.Update_city)
router.post("/srevice_delete_city",Authentication.Authentication, Service_controller.Delete_city)
router.post("/searchin_city", Authentication.Authentication,Service_controller.Searching_city)
router.post("/toggle_city",Authentication.Authentication, Service_controller.Toggle_city)

// Service Center Brand API //
router.post("/srevice_create_brand", Authentication.Authentication,Service_controller.create_brand)
router.post("/srevice_get_brand", Authentication.Authentication,Service_controller.Get_brand)
router.post("/srevice_get_brand_ID/:id",Authentication.Authentication, Service_controller.Get_brand_ID)
router.post("/srevice_update_brand/:id", Authentication.Authentication,Service_controller.Update_brand)
router.post("/srevice_delete_brand", Authentication.Authentication,Service_controller.Delete_brand)
router.post("/searching_brand", Authentication.Authentication,Service_controller.Searching_Brand)
router.post("/toggle_brand", Authentication.Authentication,Service_controller.toggle_Brand)


// Service Center Data API //
router.post("/srevice_create_data",Authentication.Authentication, Service_controller.create_Data)
router.post("/srevice_center_get_data", Authentication.Authentication,Service_controller.Get_Data)
router.post("/srevice_center_get_data_ID/:id", Authentication.Authentication,Service_controller.Get_Data_ID)
router.post("/srevice_update_data/:id", Authentication.Authentication,Service_controller.Update_Data)
router.post("/srevice_delete_brand_ID", Authentication.Authentication,Service_controller.Delete_brand)
router.post("/srevice_delete_data",Authentication.Authentication, Service_controller.Delete_Data)
router.post("/searching_data",Authentication.Authentication, Service_controller.Searching_Data)
router.post("/toggle_data", Authentication.Authentication,Service_controller.toggle_service_data)

router.post("/Brand_dropdown_Data", Authentication.Authentication,Service_controller.Brand_dropdown_Data)
router.post("/Brand_Get_Data", Authentication.Authentication,Service_controller.Brand_Get_Data)

// Service Center dealer API //
router.post("/srevice_create_dealer", Authentication.Authentication,Service_controller.create_Dealer)
router.post("/srevice_center_get_dealer",Authentication.Authentication, Service_controller.Get_Dealer)
router.post("/srevice_center_get_dealer_ID/:id", Authentication.Authentication,Service_controller.Get_dealer_ID)
router.post("/srevice_update_dealer/:id",Authentication.Authentication, Service_controller.Update_dealer)
router.post("/srevice_delete_dealer",Authentication.Authentication, Service_controller.Delete_Dealer)
router.post("/searching_dealer",Authentication.Authentication, Service_controller.Searching_Dealer)
router.post("/toggle_service_dealer",Authentication.Authentication, Service_controller.toggle_service_dealer)


// ************************************************ RC information *******************************************************************//
router.post("/Create_RC_DL_information",Authentication.Authentication, RC_DL_controller.create_Rc_DL_infromation)
router.post("/Get_RC_DL_information",Authentication.Authentication, RC_DL_controller.Get_RC_DL_information)
router.post("/Get_RC_DL_information_ID/:id",Authentication.Authentication, RC_DL_controller.Get_RC_DL_information_ID)
router.post("/Update_RC_DL_information/:id",Authentication.Authentication, RC_DL_controller.Update_RC_DL_information)
router.post("/Delete_RC_DL_information",Authentication.Authentication, RC_DL_controller.Delete_RC_DL_information)
router.post("/searching_RC_DL_information",Authentication.Authentication, RC_DL_controller.Searching_RD_DL)
router.post("/toggle_RC_DL_information",Authentication.Authentication, RC_DL_controller.toggle_RD_DL)

// ************************************************ Traffic State *******************************************************************//
router.post("/create_Traffic_state",Authentication.Authentication, RC_DL_controller.create_Traffic_state)
router.post("/get_Traffic_state",Authentication.Authentication, RC_DL_controller.Get_Traffic_state)
router.post("/get_Traffic_state_ID/:id",Authentication.Authentication, RC_DL_controller.Get_Traffic_state_ID)
router.post("/update_Traffic_state/:id",Authentication.Authentication, RC_DL_controller.Update_Traffic_state)
router.post("/delete_Traffic_state",Authentication.Authentication, RC_DL_controller.Delete_Traffic_state)

// ************************************************ Traffic Rule *******************************************************************//
router.post("/create_Traffic_rule",Authentication.Authentication, RC_DL_controller.create_traffic_rule)
router.post("/get_Traffic_rule", Authentication.Authentication,RC_DL_controller.Get_traffic_rule)
router.post("/get_Traffic_rule_ID/:id", Authentication.Authentication,RC_DL_controller.Get_traffic_rule_ID)
router.post("/update_Traffic_rule/:id", Authentication.Authentication,RC_DL_controller.update_traffic_rule)
router.post("/Delete_Traffic_rule", Authentication.Authentication,RC_DL_controller.Delete_traffic_rule)
router.post("/searching_Traffic_rule", Authentication.Authentication,RC_DL_controller.searching_traffic_rule)

router.post("/create_language", Authentication.Authentication,RC_DL_controller.create_Language)
router.post("/get_language", Authentication.Authentication,RC_DL_controller.Get_Language)

// ************************************************ Fuel *******************************************************************//
router.post("/create_Fuel_state",Authentication.Authentication,FuelController.Create_fuel_state)
router.post("/create_Fuel_city",Authentication.Authentication,FuelController.Create_fuel_city)
router.post("/get_Fuel_state",Authentication.Authentication,FuelController.Get_fuel_state)
router.post("/get_Fuel_city",Authentication.Authentication,FuelController.Get_fuel_city)


router.post("/create_Fuel_price",Authentication.Authentication ,FuelController.create_Fuel_Price)
router.post("/get_Fuel_price", Authentication.Authentication ,FuelController.Get_Fuel_Price)
router.post("/get_Fuel_price_ID/:id",Authentication.Authentication ,FuelController.Get_Fuel_Price_ID)
router.post("/update_Fuel_price/:id",Authentication.Authentication ,FuelController.Update_Fuel_Price)
router.post("/searching_Fuel_price",Authentication.Authentication ,FuelController.Searching_Fuel_price)
router.post("/Copy_Fuel_price",Authentication.Authentication ,FuelController.Copy_Fuel_price)

// **************************************************** Tags API *********************************************************************
router.post("/create_tags", Authentication.Authentication,Tags.create_tags)
router.post("/get_tags", Authentication.Authentication,Tags.Get_tags)
router.post("/get_tags_ID/:id", Authentication.Authentication,Tags.Get_tags_ID)
router.post("/update_tags/:id", Authentication.Authentication,Tags.Update_tags)
router.post("/delete_tags",Authentication.Authentication, Tags.Delete_tags)

// **************************************************** News Category API *********************************************************************
router.post("/create_News_category", Authentication.Authentication,News.create_News_category)
router.post("/get_News_category", Authentication.Authentication,News.Get_News_category)
router.post("/get_News_category_ID/:id", Authentication.Authentication,News.Get_News_category_ID)
router.post("/update_News_category",Authentication.Authentication, News.Update_News_category)
router.post("/Multiple_delete_News_category",Authentication.Authentication, News.Multiple_Delete_News_category)
router.post("/delete_News_category",Authentication.Authentication, News.Delete_News_category)
router.post("/Drad_Drop",Authentication.Authentication, News.NEWS_Drag_and_Drop)
router.post("/Drad_Drop",Authentication.Authentication, News.NEWSHeadline_Drag_and_Drop)
router.post("/toggle_News_category",Authentication.Authentication, News.toggle_News_category)


// **************************************************** News Headline API *********************************************************************
router.post("/create_news_headline", Authentication.Authentication,News.create_news_headline)
router.post("/get_news_headline", Authentication.Authentication,News.Get_news_headline)
router.post("/get_news_headline_ID/:id", Authentication.Authentication,News.Get_news_headline_ID)
router.post("/update_news_headline/:id", Authentication.Authentication,News.Update_news_headline)
router.post("/delete_news_headline", Authentication.Authentication,News.Delete_news_headline)

// **************************************************** News API *********************************************************************
 router.post("/create_news" ,Authentication.Authentication, News.Create_news)
 router.post("/get_news" ,Authentication.Authentication, News.Get_news)
 router.post("/get_news_ID/:id" ,Authentication.Authentication, News.Get_news_ID)
 router.post("/update_news/:id" ,Authentication.Authentication, News.Update_news)
 router.post("/delete_news" ,Authentication.Authentication, News.Delete_news)

//  ************************************************* Vehicale Information Category**************************************************

router.post("/get/vehicle/category",Authentication.Authentication,VehicleInfoController.GetAllCategory)
router.post("/add/vehicle/category",Authentication.Authentication,VehicleInfoController.AddVehicleCategory)
router.post("/vehicle/category/:id",Authentication.Authentication,VehicleInfoController.VehicleCategoryById)
router.post("/update/vehicle/category/:id",Authentication.Authentication,VehicleInfoController.UpdateVehicleCategory)
router.post("/delete/vehicle/category",Authentication.Authentication,VehicleInfoController.DeleteVehicleCategory)
router.post("/toggle_vehicale_category",Authentication.Authentication,VehicleInfoController.ToggleVehicaleinfo)

//  ************************************************* Vehicale Information Brand **************************************************
router.post("/get/vehicle/brand",Authentication.Authentication,VehicleInfoController.GetAllBrand)
router.post("/get/vehicle/brandID",Authentication.Authentication,VehicleInfoController.IDGetAllBrand)
router.post("/add/vehicle/brand",Authentication.Authentication,VehicleInfoController.BrandAdd)
router.post("/vehicle/brand/:id",Authentication.Authentication,VehicleInfoController.BrandById)
router.post("/update/brand/:id",Authentication.Authentication,VehicleInfoController.BrandUpdate)
router.post("/delete/brand",Authentication.Authentication,VehicleInfoController.DeleteBrand)
router.post("/toggle/brand",Authentication.Authentication,VehicleInfoController.ToggleBrand)
router.post("/searching/brand",Authentication.Authentication,VehicleInfoController.SearchingBrand)

//  ************************************************* Vehicale Information Body**************************************************
router.post("/get/vehicle/bodytype",Authentication.Authentication,VehicleInfoController.GetBodyTypes)
router.post("/add/vehicle/bodytype",Authentication.Authentication,VehicleInfoController.AddBodyTypes)
router.post("/vehicle/bodytype/:id",Authentication.Authentication,VehicleInfoController.BodyTypeById)
router.post("/update/vehicle/bodytype/:id",Authentication.Authentication,VehicleInfoController.UpdateBodyType)
router.post("/delete/vehicle/bodytype",Authentication.Authentication,VehicleInfoController.DeleteBodyType)
router.post("/toggle/body_type",Authentication.Authentication,VehicleInfoController.ToggleBody_type)
router.post("/searching/body_type",Authentication.Authentication,VehicleInfoController.SearchingBody_type)

//  ************************************************* Vehicale Information **************************************************
router.post("/add/vehicleinformation",VehicleInfoController.AddVehicleInformation)
router.post("/get/vehicleinformation",VehicleInfoController.GetVehicleInformation)
router.post("/View/vehicleinformation/:id",VehicleInfoController.ViewVehicleInformation)
router.post("/update/vehicleinformation/:id",VehicleInfoController.UpdateVehicleInformation)
router.post("/Serching/vehicleinformation",VehicleInfoController.SerachingVehicleInformation)
router.post("/Toggle/vehicleinformation",VehicleInfoController.tooglevehicle)
router.post("/delete/vehicleinfo",VehicleInfoController.Delete_vehicle_info)
router.post("/delete/ColorModal",VehicleInfoController.Delete_colorModal)
router.post("/delete/PriceVariant",VehicleInfoController.Delete_PriceVariant)
router.post("/delete/Image",VehicleInfoController.Delete_Image)
router.post("/Get/Brand",VehicleInfoController.GetBrandDataWithType)
router.post("/Get/Body_Type",VehicleInfoController.GetBody_TypeDataWithType)

//  ************************************************* Vehicale Information KeySpecification**************************************************
router.post("/get/Key_specification",VehicleInfoController.Get_Key_specification)
router.post("/add/Key_specification",VehicleInfoController.Add_Key_specification)
router.post("/Key_specification/:id",VehicleInfoController.Key_specification)
router.post("/update/Key_specification/:id",VehicleInfoController.update_Key_specification)
router.post("/delete/Key_specification",VehicleInfoController.delete_Key_specification)

//  ************************************************* Vehicale Information Specification**************************************************
router.post("/get/specification",VehicleInfoController.Specification_get)

//  ************************************************* Vehicale Information Variant Specification**************************************************
router.post("/get/vehicle_name_get",VehicleInfoController.vehicle_name_get)
router.post("/get/Variant_name_get",VehicleInfoController.Variant_name)

router.post("/add/Specification_Variant",VehicleInfoController.AddSpecification_Variant)
router.post("/GET/Specification_Variant",VehicleInfoController.Specification_Variant)
router.post("/ViewData/Specification_Variant/:id",VehicleInfoController.Specification_Variant_View)
router.post("/Delete/Specification_Variant",VehicleInfoController.Specification_Variant_Delete)
router.post("/Delete/Specification_Table_data",VehicleInfoController.Specification_Table_data_delete)
router.post("/Searching/Specification_Variant",VehicleInfoController.Specification_Variant_Searching)

router.post("/ID_Wise_Data_get/Specification_Variant",VehicleInfoController.ID_Wise_Data_get)



export default router