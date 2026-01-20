"use client"
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
export default function SimilarAvailableComponent(){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    
    const [hovered,setHovered] = useState(null)
    //const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.serverUrl

    const images = [
        `${serverURL}/images/minialoosev.png`,
        `${serverURL}/images/yellowsev.png`,
        `${serverURL}/images/ratlamisev.png`
    ]

    return(
        <div style={{ 
            padding: matches ? "20px" : "0",
            marginLeft: matches ? -36 : "2%",
            marginTop: matches ? "30%" : "0"
        }}>
        

        
            <div style={{
                display:'flex',
                fontWeight:500,
                fontSize: matches ? "16px" : "20px"
            }}>
                Liked it? Try these!
            </div> 

            
            <div style={{
                display:'flex',
                flexDirection:'row',
                gap: matches ? 20 : 20,
                cursor:'pointer',
                marginTop: matches ? 15 : 20,
                marginLeft: matches ? -85 : '5%',
                justifyContent: matches ? "center" : "flex-start",
                flexWrap: matches ? "wrap" : "nowrap"
            }}>
               {images.map((src,index)=>(
                    <img 
                        key={index}
                        onMouseEnter={()=>setHovered(index)}
                        onMouseLeave={()=>setHovered(null)}
                        style={{
                            border: hovered===index ? '2px solid black' : '',
                            borderRadius: 15,
                            transform: hovered === index ? 'scale(1.07)' : 'scale(1)',
                            transition: '0.25s', 
                            background:'#fff',
                            width: matches ? '100px' : '130px',
                            height: matches ? '100px' : '130px',
                            objectFit: 'cover'
                        }}
                        src={src}
                        alt={`similar product ${index+1}`}
                    />
                ))}
            </div>

    
            <div style={{
                display:'flex',
                fontWeight:400,
                fontSize: matches ? "14px" : "20px",
                marginTop: matches ? 30 : 40
            }}>
                Also available on*            
            </div>




            <div style={{
                display:'flex',
                flexDirection:'row',
                gap: matches ? 15 : 20,
                marginTop: matches ? 15 : 22,
                height: matches ? '35px' : '40px',
                alignItems: 'center'
            }}>
                <img 
                    style={{
                        cursor:'pointer',
                        height: matches ? '30px' : '40px',
                        width: 'auto'
                    }} 
                    src={`${serverURL}/images/swiggy.png`}
                    alt="swiggy"
                />
                <img 
                    style={{
                        cursor:'pointer',
                        height: matches ? '20px' : '30px',
                        width: 'auto'
                    }} 
                    src={`${serverURL}/images/blinkit.png`}
                    alt="blinkit"
                />
                <img 
                    style={{
                        cursor:'pointer',
                        height: matches ? '20px' : '30px',
                        width: 'auto'
                    }} 
                    src={`${serverURL}/images/zepto.png`}
                    alt="zepto"
                />

                <img 
                    style={{
                        cursor:'pointer',
                        height: matches ? '20px' : '30px',
                        width: 'auto'
                    }} 
                    src={`${serverURL}/images/zomato.png`}
                    alt="swiggy"
                />
            </div>

    


            <div style={{
                display:'flex',
                fontWeight: 400,
                fontSize: matches ? "11px" : "12px",
                marginTop: matches ? 15 : 15,
                color: '#666',
                fontStyle: 'poppins'
            }}>
                *Product availability may vary by location.     
            </div>

            


            <Divider style={{
                display:'flex',
                marginTop: matches ? 35 : 30,
                border: 'none',
                borderTop: '1px solid #cebdd8ff',
                width: matches ? "93%" : "40%",
                marginLeft: matches ? "0" : "-1%",
                position:'absolute'
            }}/>
        </div>
    )
}