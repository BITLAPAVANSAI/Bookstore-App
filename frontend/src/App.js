import React from 'react'
import { Route,Routes } from 'react-router-dom'
import DeleteBook from './pages/DeleteBook'
import ShowBook from './pages/ShowBook'
import Home from './pages/Home'
import UpdateBook from './pages/UpdateBook'
import CreateBook from './pages/CreateBook'
function App() {
  return (
    <div>
    <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='books/create' element={<CreateBook/>}/>
                <Route path='books/details/:id' element={<ShowBook/>}/>
                <Route path='books/edit/:id' element={<UpdateBook/>}/>
                <Route path='books/delete/:id' element={<DeleteBook/>} />
    </Routes>
    </div>
  )
}

export default App