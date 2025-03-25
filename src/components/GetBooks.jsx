import React,{useState} from 'react'
import { useQuery,gql,useMutation } from '@apollo/client'
import AddBooks from './AddBooks';

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

const DELETE_BOOK=gql`
mutation DeleteBook($id:Int!){
deleteBook(id:$id)

}
`



export default function GetBooks({ setBook }){



const {loading,data,error}=useQuery(GET_BOOKS)
const [deleteBook] = useMutation(DELETE_BOOK, {
  refetchQueries: [{ query: GET_BOOKS }],
  onCompleted: () => {
    alert("Book deleted successfully!");
  },
  onError: (err) => {
    alert(`Error deleting book: ${err.message}`);
  },
});

if (loading) return <p>loading......</p>
if(error) return <p>Error:{error.message}</p>

//console.log(data)

const allbooks=data.books.map(b=>(
  <tr key={b.id}>
      <td>{b.title}</td>
      <td>{b.author}</td>
     <td><button onClick={()=>deleteBook({ variables: { id: b.id } })}>Delete</button></td>
      <td><button onClick={()=>handleEdit(b)}>Edit</button></td>
  </tr>

))
//Edit
const handleEdit=(books)=>{
  setBook(books)

}



return(
    <div className='table-container'>
    <h1>Books List</h1>
   <table>
    <thead>
    <tr>
    <td>Title</td>
    <td>Author</td>
    <td>Delete</td>
    <td>Edit</td>
    </tr>

    </thead>
    <tbody>
      {
        allbooks
   
      }
 </tbody>
 </table>
   
  </div>
)




} 