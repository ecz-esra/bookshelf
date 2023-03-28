import React from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import { useSelector } from "react-redux";

const Homepage=()=>{
    const {booksState,categoriesState}=useSelector(state=>state)
    console.log("books",booksState);
    console.log("cats",categoriesState);
    return(
       <div>
         <Header/>
        <ListBooks/>
       </div>
    )
}

export default Homepage;