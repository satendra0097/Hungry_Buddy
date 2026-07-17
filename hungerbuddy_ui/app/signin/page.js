"use client"
import { Grid, TextField } from "@mui/material";
import { generateOTP, postData } from "../services/FetchNodeServices";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
export default function LoginPage(){
 const [mobileNo,setMobileNo]=useState('')
 const [user,setUser]=useState('')
 const [message,setMessage]=useState('')
 const navigate=useRouter()
 const param=useSearchParams()
 const from=param.get("from")
 
  const dispatch=useDispatch()

const handleClick=async()=>{

    var response=await postData("users/student_sign_in",{mobileNo})
    if(response.status)
     { 
        var mn=response?.data?.mobileno       
        dispatch({type:'ADD_USER',payload:[mn,response?.data]})
        
        navigate.push(`/otppage?from=${from}`)
     }
    else
     setMessage(response.message)




}    
return (
  <div style={{display:"flex",height:'100vh',width:'100%',justifyContent:'center',alignItems:'center'}}>
  <Grid size={12}>
    <div
      style={{
        background: "white",
        width: "85%",
        height: 550,
        borderRadius: 20,
        position: "relative",
        right: -20,
        boxShadow: "0 3px 6px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Grid size={6}>
        <div style={{ padding: 28 }}>
          HungerBuddy
        </div>
      </Grid>
      <Grid size={6}>
        <div style={{ marginLeft: 28, fontSize: 24, fontWeight: "1000" }}>
          Almost there!
        </div>
      </Grid>
      <Grid size={6}>
        <div
          style={{
            marginLeft: 28,
            fontSize: 14,
            fontWeight: "500",
            color: "#595959",
          }}
        >
          Simply sign in to place your order
        </div>
      </Grid>
      <Grid size={6}>
        <div
          style={{
            marginLeft: 28,
            marginTop: 35,
            fontSize: 14,
            fontWeight: "550",
            color: "#595959",
          }}
        >
          Mobile Number
        </div>
      </Grid>
      <Grid size={12}>
        <div style={{ margin: 28, marginTop: 2 }}>
          <input
            type="text"
            onChange={(e)=>setMobileNo(e.target.value)}
            placeholder="+91-"
            style={{
              width: "98%",
              height: 40,
              borderRadius: 10,
              border: "0.1px solid #DADADA",
              color: "Black",
              fontSize: 16,
              paddingLeft: 10,
              fontWeight: 550,
             
            }}
          />
        </div>
        <div style={{width:'100%',height:'60%',padding:20}}>
            {message}
        </div>
        <div
          style={{
            background: "#DADADA",
            width: "100%",
            height: 1,
            marginTop: 70,
          }}
        ></div>
        <Grid size={6}>
          <div
            style={{
              fontSize: 10,
              margin: 28,
              marginBottom: 15,
              width: "90%",
              lineHeight: "14px",
              wordWrap: "break-word",
              color: "#595959",
            }}
          >
            By signing in, you agree to our{" "}
            <span style={{ color: "#007bff", cursor: "pointer" }}>
              Terms and Conditions of Use
            </span>{" "}
            and{" "}
            <span style={{ color: "#007bff", cursor: "pointer" }}>
              Privacy Policy
            </span>
          </div>
        </Grid>
        <Grid size={12}>
          <div>
            <input
            onClick={handleClick}
              type="button"
              value="Sign in"
              style={{
                marginLeft: 25,
                width: "87%",
                height: 45,
                border: "none",
                borderRadius: 20,
                background: "#0050fdff",
                color: "white",
                fontSize: 15,
                fontWeight: 550,
              }}
            ></input>
          </div>
        </Grid>

      </Grid>
    </div>
  </Grid>
  </div>
);
}