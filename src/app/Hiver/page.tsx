"use client";

import { useEffect } from "react";
import Link from "next/link";


export default function Primaire() {
  useEffect(() => {
    const snowContainer = document.querySelector(".snowfall");
    console.log("Snow container:", snowContainer);

    if (snowContainer) {
      for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("li");
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = `-10px`; // Start above the viewport
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 20}s`; // Increased delay range for more progressive start
        snowContainer.appendChild(snowflake);
        console.log("Snowflake added:", snowflake);
      }
    }
  }, []);
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #142852, #0e022e)",
        }}

      </div>
            {/* Animation de neige */}
            <ul className="snowfall absolute inset-0 pointer-events-none"></ul>
    </div>
  );
}



