import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {cartItemsSelector} from "../../../features/selectors";
import {Button} from "@mui/material";
import {removeFromCart, removeItemFromCart, increaseItemCount, decreaseItemCount} from "../../../features/cart/cartSlice";
import {orderPostAsync} from "../../../features/orderedList/orderedListSlice";
import "./style.css"

const Cart = () => {
    const cartItems = useSelector(cartItemsSelector);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const removeItem = (index, price, count) => {
        dispatch(removeItemFromCart({index, price, count}))
    }

    const increaseCount = (index, price) => {
        dispatch(increaseItemCount({index, price}))
    }

    const decreaseCount = (index, price, count) => {
        dispatch(decreaseItemCount({index, price, count}))
    }

    const buy = () => {
        const today = new Date().toLocaleString('en-GB');
        dispatch(orderPostAsync({totalPrice, token, createdAt: today}))
        dispatch(removeFromCart());
    }

    return (
        <div>
            Cart
            <div>
                {cartItems.map((cartItem, index) => (
                    <div className={"container cartItem"} key={cartItem._id}>
                        <img src={`http://localhost:3001/${cartItem.imageName}`} />
                        <p>{cartItem.name}</p>
                        <p>
                            <Button onClick={() => decreaseCount(index, cartItem.price, cartItem.count)}>-</Button>
                            <span>{cartItem.count}</span>
                            <Button onClick={() => increaseCount(index, cartItem.price)}>+</Button>
                        </p>
                        <p>{cartItem.price}</p>
                        <Button onClick={() => removeItem(index, cartItem.price, cartItem.count)}>Remove</Button>
                    </div>
                ))}
                {totalPrice &&
                    <div>
                        <p>{totalPrice + "$"}</p>
                        <Button onClick={() => buy()}>Buy</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart