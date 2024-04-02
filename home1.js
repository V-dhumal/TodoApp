import React, {useEffect, useState } from 'react'
import './home.css';
import addIcon from "./add.png";
import Taskcard from '../../components/task-cards/taskcard';

function home() {
  const [tasks, setTasks]=useState([]);
  const[error, setError]=useState('');
  const[newTasks, setNewTasks]=useState('');
  const[category, setcategory]=useState('');

const saveTaskToLS=(taskToSave)=>{
    localStorage.setItem('tasks', JSON.stringify(taskToSave));
  }

const validateNewTask=()=>{
  if(newTasks===' '){
    setError('please Enter a task')
    return false
  }
  else{
    setError('');
    return true;
  }
}

const addTask=()=>{
const validationResult=validateNewTask();
if(!validationResult) return;

const newTasks=[{
  title:newTasks,
  category:category,
}, ...tasks]
saveTaskToLS(newTasks);
setTasks(newTasks);
setNewTasks('')

}


const deleteTask=(index)=>{
  const newTasks=tasks;
  newTasks.splice(index, 1);
  setTasks([...newTasks]);
  saveTaskToLS(newTasks);
}



useEffect(()=>{
  const tasks=localStorage.getItem('tasks')
  if(tasks){
    setTasks(JSON.parse(tasks));
  }
},
[])
  return (
    <div>
      <h1 className='heading'>ToDo App: {category}</h1>
     <div className='input-container'>
      {
        tasks.map((task,i)=>{
          const {title, category}= task;
          return<Taskcard 
          title={title}
          category={category} 
          key={i} 
          delFunction={deleteTask} 
          index={i}
          />
            
          
        })
      }
     </div>

    <p className='error-message'> {error} </p>

      <div className='input-container'>
        <input type='text'
         placeholder='Add a new task'
          className='task-input'
          value={newTasks}
          onChange={(e)=>{
            setNewTasks(e.target.value)
          }}/>
        
        <select className='category-select'
        value={category}
        onChange={(e)=>{
          setcategory(e.target.value)
        }}>
          <option value=' '>category</option>
          <option value='🏢 Office'>🏢 Office</option>
          <option value='🎓 Collge'>🎓 Collge</option>
          <option value='🛒 Shopping'>🛒 Shopping</option>
          <option  value='🎯Goal'>🎯Goal</option>
          <option  value='⭐ Hobby'>⭐ Hobby</option>
          
          
          
          

        </select>

        <img src={addIcon} 
        alt='add'
         className='add-icon'
         onClick={addTask}/>
      </div>
    </div>
  )
}

export default home
