import React from "react";
import { useState, useEffect } from "react";
import Test from "../components/Test.jsx";
export default function TestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-8 py-10 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Test Hooks Playground</h1>
        <p className="text-gray-500 mb-8 text-center">
          Place where I will master Hooks<br/>
   
        </p>

        {/* Praksa za hookove ide ovde (npr. useState, useEffect, itd) */}

        <div className="w-full">
          {/* PRIMER: hook counter ovde iznad */}
          {/* Dodaj tvoj kod tipa: */}
          {/* <MyHookComponent /> */}
            <Test />
        </div>

      </div>
    </div>
  );
}
