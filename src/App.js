import React,{useEffect} from "react";
import {BrowserRouter, Routes,Route} from "react-router-dom"
import Homepage from "./pages/HomePage";
import { useDispatch,useSelector } from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import api from "./api/api";
import urls from "./api/urls";
import BookDetail from "./components/BookDetail";
import AddBook from "./pages/AddBook";
import Error from "./pages/Error";
import EditBook from "./pages/EditBook";
import ListCategories from "./pages/ListCategories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

function App() {
  const dispatch=useDispatch()
  const {booksState,categoriesState}=useSelector(state=>state)
  useEffect(() => {
    /* fetch books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
          payload: res.data,
        });
      })
.catch((err)=>{
dispatch({type:actionTypes.bookActions.GET_BOOKS_FAIL,payload:"An error occured!"})
})
/*fetch categories*/
dispatch({type:actionTypes.categoryActions.GET_CATEGORY_START})
api.get(urls.categories)
.then(res=>{
dispatch({type:actionTypes.categoryActions.GET_CATEGORY_SUCCESS,payload:res.data})
})
.catch(err=>{
dispatch({type:actionTypes.categoryActions.GET_CATEGORY_FAIL,payload:"An error occured!"})
})

  },[])
  if(booksState.success === false || categoriesState.success === false)
  return null;
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Homepage/>}/>
   <Route path="/book-detail/:bookId" element={<BookDetail/>}/>
   <Route path="/add-book" element={<AddBook/>}/>
   <Route path="/edit-book/:bookId" element={<EditBook />} />
   <Route path="/list-categories" element={<ListCategories/>}/>
   <Route path="/add-category" element={<AddCategory/>}/>
   <Route path="/edit-category/:categoryId" element={<EditCategory/>}/>
   <Route path="*" element={<Error/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
