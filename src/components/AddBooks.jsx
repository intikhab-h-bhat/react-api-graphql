import React, {useEffect, useState} from 'react'

import { useMutation,gql } from '@apollo/client'
import GetBooks from './GetBooks';


const ADD_BOOK = gql`
      mutation AddBook($title: String!, $author: String!) {
        addBook(title: $title, author: $author) {
          id
          title
          author
        }
      }
    `;
    


export default function AddBooks(){

    const [addBook] = useMutation(ADD_BOOK)
    const [title, setTitle]=useState("")
    const [author,setAuthor]=useState("")


  

    const addBookEvent = async (e) => {
        e.preventDefault()
    try{
    
    
       const response= await addBook({ variables: { title, author } });
        setTitle("");
        setAuthor("");
        //refetch(); // Refresh the book list

        console.log(response)
        if(response.data!=null){
            alert("data saved")
        }
        else{
            alert("Data not Saved")
        }
    }catch(error){
        console.log(error)


    }
       
      };
    
      useEffect(()=>{
        <GetBooks/>
      })


return(
    <>
    <h2>Add a Book</h2>
    <form onSubmit={addBookEvent}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Title" />
      <input value={author}  onChange={(e)=> setAuthor(e.target.value)} placeholder="Author" />
      <button type="submit">Add Book</button>
      </form>
      </>
)


}