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

  const UPDATE_BOOK=gql`
  mutation UpdateBook($id:Int!,$title: String!, $author: String!){
    updateBook(id:$id,title: $title, author: $author){
      id
      title
      author
    }
  }   
  `
    


export default function AddBooks({ book, setBook }){

    const [addBook] = useMutation(ADD_BOOK,{
      refetchQueries: ["GET_BOOKS"], // Refresh book list after updating
    });

    const [updateBook]=useMutation(UPDATE_BOOK,{
      refetchQueries: ["GET_BOOKS"], // Refresh book list after updating
    });

    const [title, setTitle]=useState("")
    const [author,setAuthor]=useState("")

    
  // Update form fields when book changes (for editing)
    useEffect(() => {
    setTitle(book.title || "");
    setAuthor(book.author || "");
  }, [book]);

    const addBookEvent = async (e) => {
        e.preventDefault()
    try{
    
    
      if (book.id) {
        // If book has an ID, update it
        await updateBook({ variables: { id: book.id, title, author } });
        alert("Book updated successfully!");
      } else {
        // If no ID, add a new book
        await addBook({ variables: { title, author } });
        alert("Book added successfully!");
      }
     setBook({id:"",title:"",author:""}); // Clear the form after submission
    
      setTitle("");
      setAuthor("");
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book.");
    }
  };
    


return(
    <main className="form-container">
    <h2>Add a Book</h2>
    <form onSubmit={addBookEvent}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Title" required />
      <input value={author}  onChange={(e)=> setAuthor(e.target.value)} placeholder="Author" required/>
      <button type="submit">{book.id?"Update Book":"Add Book"}</button>
      </form>
      </main>
)


}