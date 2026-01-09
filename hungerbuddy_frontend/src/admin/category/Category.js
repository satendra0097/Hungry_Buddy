import CategoryInterface from "./categoryinterface"
import DisplayAll from './DisplayAll'
import { useState } from "react"
export default function Category()
{ const [refresh,setRefresh]=useState(false)

return (
  <div>
    <CategoryInterface refresh={refresh} setRefresh={setRefresh}/>
    <DisplayAll refresh={refresh} setRefresh={setRefresh} />
  </div>
)

}

