import React,{useState} from "react";
import Header from "../components/Header";
import {useSelector,useDispatch} from "react-redux"

import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from '../redux/actions/actionTypes';

const ListCategories=()=>{
    const dispatch=useDispatch()
    const {categoriesState, booksState}=useSelector(state=>state)
    const [openDeleteModal,setOpenDeleteModal]=useState(false)
    const [willDeleteCategory,setWIllDeleteCategory]=useState("")
    const deleteCategory=(id)=>{
       
        api
        .delete(`${urls.categories}/${id}`)
        .then((resCat) => {
          dispatch({
            type: actionTypes.categoryActions.DELETE_CATEGORY,
            payload: id,
          });
          dispatch({
            type: actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,
            payload: id,
          });
        })
        .catch((err) => {});
      setOpenDeleteModal(false);
    };
    return(
        <div>
            <Header/>
            <div className="container my-5">
                <div className="d-flex justify-content-end">
                    <Link className="btn btn-primary" to={"/add-category"}>Add Category</Link>
                </div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">Number</th>
      <th scope="col">Category Name</th>
      <th scope="col">Registered Book Number</th>
      <th scope="col">Process</th>
    </tr>
  </thead>
  <tbody>
    {
        categoriesState.categories.length === 0 && (
            <tr>
                <td colSpan={4}>Not yet registered category</td>
            </tr>
        )
    }
    {
      categoriesState.categories.length>0 &&(
        <>
        {categoriesState.categories.map((category,index)=>{
            const books= booksState.books.filter(item=>item.categoryId=== category.id)
            return(
                <tr key={category.id}>
                <th scope="row">{index+1}</th>
                <td>{category.name}</td>
                <td>{books.length}</td>
                <td>
                    <button onClick={()=>{
                        setOpenDeleteModal(true);
                        setWIllDeleteCategory(category.id)
                    }} className="btn btn-sm btn-danger">Delete</button>
                    <Link className="btn btn-sm btn-secondary" to={`/edit-category/${category.id}`}>Update</Link>
                </td>
               </tr>
                       )
        })}
        </>
      )
    }
   
    
  </tbody>
</table>
</div>
   {
    openDeleteModal === true && (<CustomModal title="Delete Category" message="All books related to the category will be deleted as well.Are you sure you want to do this operation?"
    onCancel={()=>setOpenDeleteModal(false)} onConfirm={()=>deleteCategory(willDeleteCategory)}/>)
   }
        </div>
    )
}
  export default ListCategories;
