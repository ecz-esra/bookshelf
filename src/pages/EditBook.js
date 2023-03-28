import React,{useState} from "react";
import Header from "../components/Header";
import {useParams,useNavigate} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import api from "../api/api";
import urls from "../api/urls";

import actionTypes from "../redux/actions/actionTypes";

const EditBook=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const params=useParams();
    const {booksState,categoriesState}=useSelector((state)=>state);
    const myBook = booksState.books.find((item)=>item.id=== params.bookId);

    const [form,setForm]=useState(myBook);
    const handleSubmit=(event)=>{
        event.preventDefault();
        /*  validation */
        if (form.name === "" || form.author === "" || form.categoryId === "") {
            alert("Kitap adı, Yazar alanı ve kategori alanı zorunludur");
            return;
          }
          api.put(`${urls.books}/${params.bookId}`,form)
          .then((res)=>{
            dispatch({type:actionTypes.bookActions.EDIT_BOOK, payload:form});
            navigate("/");
        })
           .catch((err)=>{});
    };
return(
    <div>
        <Header/>
       <div className="container my-5">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
<label htmlFor="name" className="form-label">Book Name</label>
<input value={form.name}
onChange={(event)=>setForm({...form,name:event.target.value})} type="text" className="form-control" id="name" placeholder="Yalniziz"/>
</div>
<div className="mb-3">
<label htmlFor="author" className="form-label">Author</label>
<input value={form.author} 
onChange={(event)=>setForm({...form,author:event.target.value})}type="text" className="form-control" id="author" placeholder="Peyami Safa"/>
</div>
<div className="mb-3">
<label htmlFor="publisher" className="form-label">Book Name</label>
<input value={form.publisher} 
onChange={(event)=>setForm({...form,publisher:event.target.value})}type="text" className="form-control" id="publisher" placeholder="Otuken"/>
</div>
<div className="mb-3">
<label htmlFor="price" className="form-label">Price</label>
<input value={form.price} 
onChange={(event)=>setForm({...form,price:Number(event.target.value)})}type="number" className="form-control" id="price" placeholder="69.70"/>
</div>
<div className="mb-3">
<label htmlFor="isbn" className="form-label">ISBN</label>
<input value={form.isbn} 
onChange={(event)=>setForm({...form,isbn:event.target.value})} type="number" className="form-control" id="isbn" placeholder="3245678989"/>
</div>
<select 
defaultValue={categoriesState.categories[0].id}value={form.categoryId} 
onChange={(event)=>setForm({...form,categoryId:event.target.value})} className="form-select">
{
   categoriesState.categories.map(item=>(
    <option key={item.id} value={item.id}>{item.name}</option>
   )) 
}
</select>

<div className="d-flex justify-content-center my-3">
<button className="btn btn-primary w -50" type="submit">Update</button>
</div>

        </form>
       </div>
    </div>
)
}

export default EditBook;