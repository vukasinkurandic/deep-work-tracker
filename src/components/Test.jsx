import React from "react";
import { useState, useEffect } from "react";
export default function Test() {
    const [count, setCount] = useState(0);
    
const increment = () => {
        setCount(count => count + 1);
    }
const decrement = () => {
        setCount(
            count => count > 0 ? count - 1 : 0
        );
    }
    return ( 
        <div className="flex items-center justify-center gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 transition" onClick={decrement} >-</button>
        <span className="px-6 py-2 text-xl font-semibold bg-gray-100 rounded text-blue-700 shadow">{count}</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition" onClick={increment}>+</button>
        </div>
    )
}
