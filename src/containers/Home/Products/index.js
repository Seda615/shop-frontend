import {productsAsync} from "../../../features/products/productsSlice";
import {useSelector, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import "./style.css"

const Products = () => {
    //when logged in add button add to cart
    //add pagination
    const dispatch = useDispatch();
    const status = useSelector(state => state.products.status);
    const products = useSelector(state => state.products.products);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(productsAsync())
        }
    }, [dispatch, status]);

    return (
        <div className="products container">
            {products.map(product => (
                <div key={product.id}>
                    <img src={product.url} />
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default Products