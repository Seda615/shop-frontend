import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {productsAsync} from "../../../../features/products/productsSlice";
import {pagesSelector} from "../../../../features/selectors";
import {Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

const Pagination = ({searchByName, page, setPage, limit, setLimit, searchByPrice}) => {

    const pages = useSelector(pagesSelector);
    const dispatch = useDispatch();

    const pageClick = (i) => {
        setPage(i);
        dispatch(
            productsAsync({
                page: i,
                limit: 10,
                name: searchByName,
                from: searchByPrice.from,
                to:searchByPrice.to
            })
        );
    }

    const renderPages = () => {
        const totalPages = pages?.length;
        let endPage = pages?.length;
        const currentPage = page;
        let startPage = 0;
        const maxSize = 5;

        if (maxSize) {
            if (endPage > maxSize) {
                startPage = Math.max(currentPage + 1 - Math.floor(maxSize / 2), 1);
                endPage = startPage + maxSize - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - maxSize + 1;
                }
                startPage -= 1;
            }
        }

        const pageButtons = [];
        for (let i = startPage; i < endPage; i += 1) {
            const active = currentPage === i;
            // console.log(active)
            pageButtons.push(
                <Button onClick={() => pageClick(i + 1)} key={i}>{i + 1}</Button>
            );
        }
        return pageButtons;
    };


    return (
        <div className="pagination">
            <FormControl>
                <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={limit}
                    label="page size"
                    onChange={(e) => setLimit(e.target.value)}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={() => pageClick(page - 1)}>{"<"}</Button>
            {renderPages()}
            <Button onClick={() => pageClick(page + 1)}>{">"}</Button>
        </div>
    )
}

export default Pagination