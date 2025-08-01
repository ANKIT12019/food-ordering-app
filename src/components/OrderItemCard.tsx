import { Orders, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useState } from "react";

type Props = {
  order:Orders
}

const OrderItemCard = ({order}: Props) => {
    const {updateRestaurantStatus,isLoading}=useUpdateMyRestaurantOrder();
    const [status,setStatus]=useState<OrderStatus>(order.status);
    const handleStatusChange=async(newStatus:OrderStatus)=>{
        await updateRestaurantStatus({orderId:order._id as string,status:newStatus});
        setStatus(newStatus);
    }
    const getTime=()=>{
       const orderDateTime=new Date(order.createdAt);
       const hours=orderDateTime.getHours();
       const minutes=orderDateTime.getMinutes();
       const paddedMinutes=minutes<10?`0${minutes}`:minutes;
       return `${hours}:${paddedMinutes}`;
    }
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 justify-between mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Customer:</span>
                    <span className="font-normal text-sm sm:text-base">{order.user.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Address:</span>
                    <span className="font-normal text-sm sm:text-base truncate">{order.deliveryDetails.addressLine}, {order.deliveryDetails.city}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Time:</span>
                    <span className="font-normal text-sm sm:text-base">{getTime()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Total:</span>
                    <span className="font-normal text-sm sm:text-base text-orange-600 font-semibold">₹{order.totalAmount}</span>
                </div>
            </CardTitle>
            <Separator></Separator>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="space-y-2">
                    {order.cartItems.map((cartItem, index)=>(
                        <span key={index} className="flex items-center gap-2 text-sm sm:text-base">
                            <Badge variant="outline" className="text-xs sm:text-sm px-2 py-1">{cartItem.quantity}</Badge>
                            <span className="truncate">{cartItem.name}</span>
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-3">
                    <Label htmlFor="status" className="text-sm sm:text-base font-semibold">Order Status</Label>
                    <Select onValueChange={(value)=>handleStatusChange(value as OrderStatus)} disabled={isLoading} value={status}>
                        <SelectTrigger id="status" className="text-sm sm:text-base">
                            <SelectValue placeholder="Select status"></SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status, index)=>(<SelectItem key={index} value={status.value}>{status.label}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default OrderItemCard;