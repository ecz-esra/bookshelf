const actionTypes={
  bookActions:{
     GET_BOOKS_START:"GET_BOOKS_START",
     GET_BOOKS_SUCCESS:"GET_BOOKS_SUCCESS",
     GET_BOOKS_FAIL:"GET_BOOKS_FAIL",
     DELETE_BOOK_START:"DELETE_BOOK_START",
     DELETE_BOOK_SUCCESS:"DELETE_BOOK_SUCCESS",
     DELETE_BOOK_FAIL:"DELETE_BOOK_FAIL",
     ADD_BOOK:"ADD_BOOK",
     EDIT_BOOK:"EDIT_BOOK",
     DELETE_BOOKS_AFTER_DELETE_CATEGORY:"DELETE_BOOKS_AFTER_DELETE_CATEGORY"
  },
  categoryActions:{
    GET_CATEGORY_START:"GET_CATEGORY_START",
    GET_CATEGORY_SUCCESS:"GET_CATEGORY_SUCCESS",
    GET_CATEGORY_FAIL:"GET_CATEGORY_FAIL",
    ADD_CATEGORY:"ADD_CATEGORY",
    DELETE_CATEGORY:" DELETE_CATEGORY",
    EDIT_CATEGORY:" EDIT_CATEGORY"
    
  }
}

export default actionTypes;