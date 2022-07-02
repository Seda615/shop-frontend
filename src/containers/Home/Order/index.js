import React, {useEffect} from "react";
import {orderGetAsync} from "../../../features/orderedList/orderedListSlice";
import {useDispatch, useSelector} from "react-redux";
import "./style.css"

const Order = () => {

    const dispatch = useDispatch();
    const id = useSelector(state => state.user.user_id);
    const orders = useSelector(state => state.orders.orders);

    useEffect(() => {
        dispatch(orderGetAsync(id))
    }, [])

    return (
        <div className="container">
            {orders.map(order => (
                <div key={order._id} className={"orders"}>
                    <p>{order.user}</p>
                    <p>{order.createdAt}</p>
                    <p>{order.subTotal}</p>
                </div>
            ))}

        </div>
    )
}

export default Order