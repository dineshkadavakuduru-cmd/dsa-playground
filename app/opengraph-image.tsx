import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DSA Playground — Interactive 3D Data Structure Visualizer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const STRUCTURES = ["STACK", "QUEUE", "BST", "AVL", "HEAP", "GRAPH"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090a",
          color: "#e5e5e6",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                backgroundColor: "#e4f222",
                color: "#08090a",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              D
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                DSA / PLAYGROUND
              </div>
              <div
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.22em",
                  color: "#62666d",
                  fontFamily: "ui-monospace, monospace",
                }}
              >
                STATE VISUALIZATION LAB
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: "0.22em",
              color: "#e4f222",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            COMPUTER SCIENCE / INTERACTIVE 3D
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.022em",
            }}
          >
            See the state.
          </div>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.022em",
              color: "#8a8f98",
            }}
          >
            Understand the step.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {STRUCTURES.map((name) => (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #23252a",
                backgroundColor: "#161718",
                color: "#d0d6e0",
                fontSize: "14px",
                letterSpacing: "0.16em",
                fontFamily: "ui-monospace, monospace",
                padding: "10px 18px",
              }}
            >
              {name}
            </div>
          ))}
          <div
            style={{
              marginLeft: "auto",
              fontSize: "13px",
              letterSpacing: "0.16em",
              color: "#62666d",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            DSA-PLAYGROUND.VERCEL.APP
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
