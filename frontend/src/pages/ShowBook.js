import React,{useEffect,useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from "../components/Spinner"
function ShowBook() {
    const [book,setBook] = useState({});
    const[loading, setLoading]= useState(false);
    const {id}= useParams();
    useEffect(()=>{
      setLoading(true);
      axios.get(`http://localhost:5000/books/${id}`)
      .then((res)=>{
        setBook(res.data.Books);
        setLoading(false)
        console.log(res);
      }).catch((error)=>{
        console.log(error.message);
        setLoading(false);
      })
    },[])
  return (
    <div className='p-4'>
     <BackButton/> 
     <h1 className='text-3xl my-4'></h1>
     {loading ? (
      <Spinner/>

     ):(
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4  '>
        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Id &nbsp;:</span>
          <span>{book._id}</span>
        </div>

        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Title &nbsp;:</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Author &nbsp;:</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Publish Year &nbsp; :</span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Create Time &nbsp;:</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='textxl mr-4 text-gray-500'>Last Update Time &nbsp;:</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>

      </div>
     )}

    </div>
  )
};
export default ShowBook;
