import React,{useState} from 'react'
import { useQuery,gql,useMutation } from '@apollo/client'

// Ensure field name matches the backend
const GET_BOOKS = gql`
  query {
    books{  
      id
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export default function GetBooks(){

const {loading,data,error}=useQuery(GET_BOOKS)


if (loading) return <p>loading......</p>
if(error) return <p>Error:{error.message}</p>





//console.log(data)

const allbooks=data.books.map(b=>(
    <li key={b.id}>{b.title}</li>
))

return(
    <div>
    <h1>Books List</h1>
    <ul>
      {
        allbooks
    //   data.books.map((book) => (
    //     <li key={book.id}>
    //       <strong>{book.title}</strong> by {book.author}
    //     </li>
    //   ))
      }
    </ul>

   
  </div>
)




} 