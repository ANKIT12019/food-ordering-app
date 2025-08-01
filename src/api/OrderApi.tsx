import { Orders} from "@/types";
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery} from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

type checkoutSessionRequest={
    cartItems:{
        menuItemId:string,
        name:string,
        quantity:string
    }[];
    deliverydetails:{
        email:string,
        name:string,
        addressLine:string,
        city:string
    };
    restaurantId:string

}

export const useGetMyOrders=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const getMyOrderRestaurant=async():Promise<Orders[]>=>{
        // For development, return mock data if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Using mock order data for development.");
            return [];
        }
        
        const accessToken=await getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/order`,{
            headers:{
                Authorization:`Bearer ${accessToken}`,
            },
        })
        if(!response.ok){
            throw new Error("unable to create checkout session");
        }
        return response.json(); 
    }
    const {data:orders,isLoading}=useQuery("fetchMyOrders",getMyOrderRestaurant,{refetchInterval:5000});
    return {orders,isLoading}
    

}

export const useCreateCheckoutSession=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const createCheckoutSessionRequest=async(checkoutSessionRequest:checkoutSessionRequest)=>{
        // For development, simulate success if API is not available
        if (!import.meta.env.VITE_API_BASE_URL) {
            console.warn("API_BASE_URL not configured. Simulating checkout session creation for development.");
            return { url: "https://mock-checkout.example.com" };
        }
        
        const accessToken=await getAccessTokenSilently(); 
        const response=await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(checkoutSessionRequest)
        })
        if(!response.ok){
            throw new Error("unable to create checkout session");
        }
        return response.json();
    }
    const {mutateAsync:createCheckoutSession,isLoading,error,reset}=useMutation(createCheckoutSessionRequest,);
    if(error){
        toast.error(error.toString());
        reset();
    }
    
    return {createCheckoutSession,isLoading};

}