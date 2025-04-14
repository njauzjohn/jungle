import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import SearchPage from "../component/SearchPage";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Otpverification from "../pages/Otpverification";
import Resetpassword from "../pages/Resetpassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Adress from "../pages/Adress";
import CategoryPage from "../pages/CategoryPage";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPemission from "../layout/AdminPemission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import RegisterUser from "../component/RegisterUser";
import ItemCart from "../component/ItemCart";
import HomeDisplay from "../component/HomeDisplay";
import HomeCardDisplay from "../component/HomeCardDisplay";
import HomeCategoy from "../component/HomeCategoy";
import HomeProduct from "../component/HomeProduct";
import MenuHome from "../component/MenuHome";
import MenuHomeCard from "../component/MenuHomeCard";
import MenuProduct from "../component/MenuProduct";
import CheckoutPage from "../component/CheckoutPage";
import CashoutPage from "../component/CashoutPage";




const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "register",
                element : <RegisterUser/>
            },
            {
                path : 'forgot-password',
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <Otpverification/>
            },
            {
                path : "reset-password",
                element : <Resetpassword/>
            },
            {
                path : "User",
                element : <UserMenuMobile/>
            },

            {
                path : 'MenuHome',
                element : <MenuHome/>
            },
            {
                path : 'MenuCard',
                element : <MenuHomeCard/>
            },
            {
                path : 'MenuProduct',
                element : <MenuProduct/>
            },
            {
                path : "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myOrder",
                        element : <MyOrder/>
                    },
                    {
                        path : "address",
                        element : <Adress/>
                    },
                    {
                        path : 'category',
                        element : <AdminPemission><CategoryPage/></AdminPemission> 
                       //element : <CategoryPage/>
                    },
                    {
                        path : 'subcategory',
                        element : <AdminPemission><SubCategory/></AdminPemission>
                        //element : <SubCategory/>
                    },
                    {
                        path : 'upload-product',
                        //element :  <AdminPemission><UploadProduct/></AdminPemission> 
                        element : <UploadProduct/>
                    },
                    {
                        path : 'product',
                        //element : <AdminPemission><ProductAdmin/></AdminPemission>
                        element : <ProductAdmin/>
                    },
                    {
                        path : 'HomeProduct',
                        element : <HomeProduct/>
                    },
                    {
                        path : 'HomeCartegory',
                        element : <HomeCategoy/>
                    }
                    ,
                    {
                        path : 'HomeDisplay',
                        element : <HomeDisplay/>
                    },
                   
                    

                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subcategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : "Cart",
                element : <ItemCart/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "cashout",
                element : <CashoutPage/>
            }
        ]
    }
]
)

export default router