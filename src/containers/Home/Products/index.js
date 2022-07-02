import {productsAsync} from "../../../features/products/productsSlice";
import {useSelector, useDispatch} from "react-redux";
import Pagination from "./Pagination";
import React, {useEffect, useState} from "react";
import "./style.css"
import {Button, TextField} from "@mui/material";
import {isLoggedInSelector} from "../../../features/selectors";
import {addToCart} from "../../../features/cart/cartSlice";

const Products = () => {
    const isLoggedIn = useSelector(isLoggedInSelector)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchByName, setSearchByName] = useState("")
    const [searchByPrice, setSearchByPrice] = useState({from: "", to: ""})
    const dispatch = useDispatch();
    const status = useSelector(state => state.products.status);
    const products = useSelector(state => state.products.products);



    useEffect(() => {
        if (status === 'idle') {
            dispatch(
                productsAsync({
                    page: page,
                    limit: limit,
                    name: searchByName,
                    from: searchByPrice.from,
                    to: searchByPrice.to
                })
            )
        }
    }, [status]);

    useEffect(() => {
        dispatch(
            productsAsync({
                page: page,
                limit: limit,
                name: searchByName,
                from: searchByPrice.from,
                to: searchByPrice.to
            })
        )
    }, [limit]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(
                productsAsync({
                    page: page,
                    limit: limit,
                    name: searchByName,
                    from: searchByPrice.from,
                    to: searchByPrice.to
                })
            )
        }, 500)
    }, [searchByName, searchByPrice.from, searchByPrice.to]);

    const addCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <div className="container">
            <TextField
                variant="standard"
                label="search by name"
                className={"search"}
                value={searchByName}
                onChange={(e) => setSearchByName(e.target.value)}
            />
            <TextField
                variant="standard"
                label="search by price from"
                className={"search"}
                value={searchByPrice.from}
                onChange={(e) => setSearchByPrice({...searchByPrice,from: e.target.value})}
            />
            <TextField
                variant="standard"
                label="search by price to"
                className={"search"}
                value={searchByPrice.to}
                onChange={(e) => setSearchByPrice({...searchByPrice, to: e.target.value})}
            />
            <div className="products">
                {products.map((product, i) => (
                    <div key={i} className="product">
                        <img src={`http://localhost:3001/${product.imageName}`}/>
                        <p>{product.name} {products.length}</p>
                        <p>{product.price}</p>
                        {isLoggedIn && <Button onClick={() => addCart(product)}>Add to Cart</Button>}
                    </div>
                ))}
            </div>
            <Pagination
                searchByName={searchByName}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                searchByPrice={searchByPrice}
            />
        </div>
    )
}

export default Products