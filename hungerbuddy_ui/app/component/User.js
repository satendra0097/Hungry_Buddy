import Image from "next/image"

export default function () {
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 27,
              position: "absolute",
              width: 45,
              height: 15,
              background: "#30336b",
              border: "0.5 solid #fff",
              borderRadius: 10,
              marginRight: 80,
              padding: 5,
            }}
          >
            <span
              style={{ color: "#fff", fontSize: 9, fontWeight: "bold" }}
            >
              &#8377;20
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "#fff",
              position: "absolute",
              marginRight: 80,
            }}
          >
            <Image
              src="/images/1.png"
              width={45}
              height={45}
              alt=""
              background="green"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "#fff",
              position: "absolute",
              marginLeft: 5,
            }}
          >
            <Image
              src="/images/user.png"
              width={40}
              height={40}
              alt=""
              background="green"
            />
          </div>
        </div>
      </div>
    </div>
  )
}