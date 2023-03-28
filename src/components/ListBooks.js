import React,{useState, } from "react";
import { useSelector,useDispatch } from "react-redux";
import "../assets/styles/buttons.css"
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import CustomModal from "./CustomModal";
import { Link } from "react-router-dom";

const ListBooks=()=>{
    const dispatch=useDispatch()
    const {booksState,categoriesState}=useSelector(state=>state)
    const [showDeleteModal,setShowDeleteModal]=useState(false)
    const [willDeleteBook,setWIllDeleteBook]=useState("")
 
   const deleteBook=(id)=>{
   
        dispatch({type:actionTypes.bookActions.DELETE_BOOK_START})
        api.delete(`${urls.books}/${id}`)
        .then((res)=>{
          dispatch({type:actionTypes.bookActions.DELETE_BOOK_SUCCESS,payload:id})
        })
        .catch((err)=>{
         dispatch({type:actionTypes.bookActions.DELETE_BOOK_FAIL,payload:"An error occured while delete"})
        });
    
   }

    return(
        <div className=" container my-5">
    <div className="d-flex justify-content-end">

        {categoriesState.categories.length === 0 ?
          (<Link to={"/add-category"} >Category must be added first!</Link>):
          (<Link to={"/add-book"} className="btn btn-primary">Add Book</Link>)
        }
      </div>
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Number</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Category</th>
      <th scope="col">Transactions</th>
    </tr>
  </thead>
  <tbody>
    {
        booksState.books.map((book,index)=>{
           /* let myCategory=null
           for(let i=0,i<categoriesState.categories.length; i++){
            if(categoriesState.categories[i].id === book.categoryId){
                myCategory = categoriesState.categories[i]
            }
           }*/
           const myCategory=categoriesState.categories.find(item=>item.id === book.categoryId)

            return(
                <tr key={book.id}>
                <th scope="row">{index+1}</th>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{myCategory.name}</td>
                <td>
                    <button onClick={()=>
                    {setShowDeleteModal(true)
                        setWIllDeleteBook(book.id)
                    }} className="generalBtn deleteBtn">Delete</button>
                    <Link
                    to={`/edit-book/${book.id}`}
                    className="generalBtn editBtn">
                    Edit
                  </Link>
                    <Link to={`/book-detail/${book.id}`}className="generalBtn ">Detail</Link>
                </td>
              </tr>
            )
        })
    }
    
    
  </tbody>
</table>
{
    showDeleteModal=== true &&(
<CustomModal title="Delete" message="Are you sure you want to delete?"
onCancel={()=>setShowDeleteModal(false)}
onConfirm={()=>{deleteBook(willDeleteBook)
setShowDeleteModal(false)}}/>
    )
}

</div>
    )
}


export default ListBooks;