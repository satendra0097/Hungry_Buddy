"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export default function User({ totalItems }) {
  const router = useRouter();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");

    if (storedUser) {
      queueMicrotask(() => {
        try {
          const data = Object.values(JSON.parse(storedUser));
          setUser(data);
        } catch (error) {
          console.log("USER JSON ERROR:", error);
          setUser([]);
        }
      });
    }
  }, []);

  console.log("user", user);

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
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            {/* Cart */}
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
                cursor: "pointer",
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

            {/* Wallet */}
            <div
              onClick={() => router.push("/signin")}
              style={{
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 25,
                background: "black",
                marginLeft: 3,
              }}
            >
              <img
                src="/images/wallet.png"
                width={45}
                height={45}
                alt="wallet"
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 40,
                  left: 3,
                  width: 45,
                  height: 15,
                  background: "#273c75",
                  border: "1px solid #fff",
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: "bold",
                  }}
                >
                  &#8377;20
                </span>
              </div>
            </div>

            {/* User */}
            {user.length === 0 ? (
              <div
                onClick={() => router.push("/signin?from=HP")}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  background: "black",
                  marginLeft: 3,
                }}
              >
                <img
                  src="/images/user.png"
                  width={45}
                  height={45}
                  alt="user"
                />
              </div>
            ) : (
              <div
                onClick={() => router.push("/profile")}
                style={{
                  marginLeft: 3,
                  cursor: "pointer",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    width: 45,
                    height: 45,
                  }}
                >
                  {user[0]?.studentname?.[0] || "U"}
                </Avatar>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}