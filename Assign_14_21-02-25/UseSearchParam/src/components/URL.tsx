import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import "../URL.css";

const URL = () => {
    const [input1,setInput1] = useState("");
    const [input2,setInput2] = useState("");
    const[params, setParams] = useSearchParams();


    const handleBtnClick=()=>{
        setParams({
            param1:input1,
            param2 : input2
        })
        setInput1("");
        setInput2("");
    }
  return (
    <div>
        Input 1 - <input type='text' value={input1}  onChange={(e)=>setInput1(e.target.value)} placeholder="Enter your text"/>
         Input 2 -
        <input type='text' value={input2}  onChange={(e)=>setInput2(e.target.value) } placeholder="Enter your text"/>
        <button onClick={handleBtnClick}>Update URL</button>

        <h1> Param 1 : {params.get("param1")}</h1>
        <h1> Param 2 : {params.get("param2")}</h1>
        
    </div>
  )
}

export default URL
