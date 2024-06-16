import { useState, useEffect, useRef } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete} from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [Finished, setFinished] = useState(true)
  const ref = useRef(null)
  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  useEffect(() => {
    ref.current.focus();
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(todostring)
      setTodos(todos)
    }
  }, [])
  // To edit a saved todo//
  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    setTodo(t[0].todo)
    const newtodo = todos.filter((item)=> item.id!==id)
    setTodos(newtodo)
    
    ref.current.focus();
    saveTols()
  }
  //To delete a saved todo
  const handleDelete = (e, id) => {
    const newtodo = todos.filter((item)=> item.id!==id)
    setTodos(newtodo)}
  //To add a new todo
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    ref.current.focus();
    saveTols();
  }
  //Set todo value to what is written in input field
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  //undeline finished todo
  const handleCheck = (e,id) => {
  
    let index = todos.findIndex(items => {
      return items.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
  }
  //Show finished todos
  const togglefinished = (e) => {
    setFinished(!Finished)
  }
  return (
    <>
      <nav className='flex justify-between bg-slate-700 text-white py-2'>
        <div className="logo">
          <span className='font-bold text-xl mx-8'>ITask</span>
        </div>
        <ul className='flex gap-8 mx-9'>
          <li className='curser-pointer hover:font-bold transition-all duration-50'> Home</li>
          <li className='curser-pointer hover:font-bold transition-all duration-50'>Your Task</li>
        </ul>
      </nav>
      <div className=' md:container md:mx-auto rounded-xl p-5 bg=violet-100'>
        <div className=''>Your Todos</div>
      </div>
      <div className="flex  h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/2">
          <div className="flex items-center mb-6">
            <h1 className="mr-6 text-4xl font-bold text-purple-600">TO DO APP</h1>
          </div>
          <div className="relative flex gap-4">
            <input ref={ref} onChange={handleChange} value={todo} type="text" placeholder="What needs to be done today?"
              className="w-10/12 px-2 py-3 border rounded outline-none border-grey-600" />
            <button onClick={handleAdd} type="button" disabled={todo.length <= 3} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</button>
          </div>
          <div className="flex items-center gap-4 mx-2">
            <input onChange={togglefinished} className=' my-4' type="checkbox" checked={Finished}/> 
            <p>Show Finished</p>
          </div>
          {todos.length == 0 && <div className='font-bold text-gray-600'>No Todos to display</div>}
          {todos.map(items => {
            return (Finished || !items.isCompleted) && <ul className="list-reset" key={items.id}>
              <li className="relative flex items-center justify-between px-2 py-6 border-b">
                <div>
                  <input  onChange={(e)=>{handleCheck(e,items.id)}} type="checkbox" checked={items.isCompleted} className="" />
                  <p className={`inline-block text-gray-900 mx-3 ${items.isCompleted ? "line-through" : ""}`}>{items.todo}</p>
                </div>
                <div className='flex gap-5'>
                  <button onClick={(e) => { handleEdit(e, items.id) }} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><CiEdit /></button>
                  <button onClick={(e) => { handleDelete(e, items.id) }} type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><MdDelete/></button>
                </div>
              </li>
            </ul>
          })
        }
        </div>
      </div>
    </>
  )
}
export default App
