"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";

export default function User({ totalItems }) {

  const router = useRouter();

  return (
    
    <div>


      <div style={{ display: "flex", marginRight: 30 }}>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>


            <div
  onClick={() => router.push("/cart")}
  style={{
    marginRight: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    background: "black",
    marginLeft: 3,
    cursor: "pointer"
  }}
>
  <Badge badgeContent={totalItems} color="error">
    <img
      src="/images/cart.png"
      width={35}
      height={35}
      alt="cart"
    />
  </Badge>
</div>



            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, background: 'black' }}>
              <img src="/images/wallet.png" width={45} height={45} background="green" />
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3px', top: 40, left: 3, justifyContent: 'center', position: 'absolute', width: 45, height: 15, background: '#273c75', border: '0.7 solid #fff', borderRadius: 10 }}> <span style={{ color: '#fff', fontSize: 9, fontWeight: 'bold' }}>&#8377;20</span>
              </div>
            </div>



            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25, background: 'black', marginLeft: 3 }}>
              <img src="/images/user.png" width={45} height={45} background="green" />
            </div>



          </div>
        </div>
      </div>
    </div>
  )
}