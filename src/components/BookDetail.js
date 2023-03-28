import React,{useEffect,useState} from "react";
import Header from "./Header";
import { Link, useParams } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
 
const BookDetail=()=>{
const params=useParams()
const [myBook,setMyBook]=useState(null)
const [bookCategory,setBookCategory]=useState(null)
useEffect(()=>{
    api.get(`${urls.books}/${params.bookId}`)
    .then(resBook=>{
setMyBook(resBook.data)
api.get(`${urls.categories}/${resBook.data.categoryId}`)
.then((resCategory)=>{

    console.log(resCategory.data)
    setBookCategory(resCategory.data)
})

    })
    .catch(err=>{})
    
},[])
if(myBook === null || bookCategory === null)return null
    return(
        <div>
            <Header/>
            <div className="container my-5">
            <h3>Book Name:{myBook.name}</h3>
            <h3>Author:{myBook.author}</h3>
            <h3>Price:{myBook.price}</h3>
            <h3>Publisher:{myBook.publisher}</h3>
            <h3>ISBN:{myBook.isbn}</h3>
            <h3>Category:{bookCategory.name}</h3>
            <Link to={"/"}>Back</Link>
            </div>
        </div>
    )
}

export default BookDetail;