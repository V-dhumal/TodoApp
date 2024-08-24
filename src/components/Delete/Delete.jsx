import React from 'react'
import  del from './trash.png'

function Delete({Tasks}) {
  return (
    <div>
        <h2 className=' '>{Tasks}</h2>
        <img src={del} className=' h-10 w-10'/>
    </div> 
  )  
}

export default Delete
