import { Children, createContext,useContext,useEffect,useState,userContext } from "react";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { DiscoutPrice } from "../utils/DiscountPrice";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=> useContext(GlobalContext)

const GlobalProvider = ({children})=>{

    const dispatch = useDispatch()

    const CartItem = useSelector(state => state?.cartItem?.cart)
   const [totalPrice,setTotalPrice] = useState(0)
   const [totalQty, setTotalQty] = useState(0)


    const fetchCartItem = async()=>{
        try {
          const response =  await Axios({
            ...SummaryApi.getCartItem,
      
          })
      
          const { data : responseData} = response
      
      
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log("cartItem",responseData)
          }
      
        } catch (error) {
          console.log(error)
        }
      }

      const updateCartItem = async(id,qty)=>{
        try {
          const response = await Axios({
              ...SummaryApi.updateCartItem,
              data : {
                _id : id,
                qty : qty
              }
          })

          const { data : responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }

        } catch (error) {
          AxiosToastError(error)
        }
      }

      const deleteCartItem = async(cartId)=>{
        try {
          const response = await Axios({
            ...SummaryApi.deleteCartItem,
            data : {
              _id : cartId
            }
          })

          const { data : responseData} = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }

          console.log(responseData)

        } catch (error) {
          AxiosToastError(error)
        }
      }

      useEffect(()=>{
        const qty = CartItem.reduce((preve,curr)=>{
          return preve + curr.quantity
        },0)
        setTotalQty(qty)
        //console.log(qty)
        const tPrice = CartItem.reduce((preve,curr)=>{
         
          //return preve + (DiscoutPrice( curr.productId.price,curr.productId.discout) * curr.quantity)
          const discountPrice = DiscoutPrice(curr?.productId?.price, curr?.productId?.discout)
          return preve + (discountPrice * curr?.quantity)
        
        
        },0)
        //console.log("price",tPrice)
        setTotalPrice(tPrice)
      },[CartItem])
      
      
    return(
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            totalPrice,
            totalQty
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider