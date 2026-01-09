import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { serverURL } from '../services/FatchNodeServices';

export default function EditIconComponent({image})
{ const [iconState,setIconState]=useState(false)
   const IconComponent=()=>{
    return(
   <div style={{position:'absolute',left:30,top:20}}>
                  <EditIcon style={{color:'#fff',width:20 }}  />
                </div>


    )
   } 

    
    return(
    <div style={{position:'relative'}} >
                {iconState?<IconComponent/>:<></>}
                <img
                  style={{ width: 50, height: 50, borderRadius: 5 }}
                  src={`${serverURL}/images/${image}`}
                  onMouseOver={()=>setIconState(true)}
                  onMouseLeave={()=>setIconState(false)} 
                />
              </div>
 
)
}