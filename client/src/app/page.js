"use client";
import Image from "next/image";
import Button from "@/components/Button";
import Checkboxes from "@/components/Checkboxes";
import React, { useState, useEffect } from "react";
import { getCode, checkCode } from "../utils/api";

export default function Home() {
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCode();
  }, []);

  const fetchCode = async () => {
    try {
      const newCode = await getCode();
      setCode(newCode);
      setMessage("");
    } catch (error) {
      console.error("Error fetching code:", error);
      setMessage("Error fetching code. Please try again.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await checkCode(inputCode);
      setMessage(response.message);
    } catch (error) {
      console.error("Error using code:", error);
      setMessage(error.response.data.error);
    }
  };

  return (
    <>
      <main className="flex items-center justify-center w-full md:min-h-screen py-5">
        {/* Main Container */}
        <div className="relative overflow-hidden w-[700px] h-[650px]">
          <div className="bg-gradient-to-r from-[#0A5783] via-[#10768D] to-[#189E99] w-full h-[500px]">
            {/* Content Container */}
            <div className="px-10 py-6 flex flex-col items-center gap-2">
              {/* Main Content */}
              <div className="w-[80%] flex flex-col items-center gap-3">
                <h1 className="text-white text-3xl font-bold">
                  Check your financial health
                </h1>
                <p className="text-center text-white text-xs font-extralight w-[60%] tracking-widest ">
                  Use WealthoMeter to get a free report card for your finances-
                  within minutes
                </p>

                <Button />
              </div>

              {/* Checkboxes*/}
              <div className="flex items-start justify-between text-white w-full relative">
                <div className="flex flex-col items-start gap-3 pt-12">
                  <Checkboxes label="Expected Retirement Age" />
                  <Checkboxes label="Identify Mistakes" />
                </div>

                <div className="flex flex-col items-start gap-3 pt-12">
                  <Checkboxes label="Personalised Roadmap" />

                  <Checkboxes label="Tips To Improve" />
                </div>
              </div>

              {/* Absolute Positioned Image */}
              <div className="absolute bottom-[240px] left-[260px]">
                <Image src="/mobile.png" width={250} height={500} alt="bg" />
              </div>
            </div>
          </div>

          {/* 2nd part Background */}
          <div className="-mt-[80px]">
            <Image
              src="/bg.png"
              width={500}
              height={400}
              alt="bg"
              className="absolute -bottom-[20px] left-0 w-full"
            />
            {/*Content */}
            <div className="relative z-30 text-white flex flex-col items-center gap-5">
              <h3 className="text-2xl font-bold">How it works?</h3>

              <div className="mx-auto">
                <Image
                  src="/line.png"
                  width={400}
                  height={50}
                  alt="working"
                  className="-mt-[90px] ml-[10px]"
                />

                <div className="flex items-center justify-between text-center gap-3 w-[110%] -ml-[10px] -mt-[80px] text-xs font-light tracking-wider">
                  <span className="w-[100px]">Answer few questions</span>
                  <span className="w-[100px]">
                    Register using phone and OTP
                  </span>
                  <span className="w-[120px]">
                    Get report and personal roadmap
                  </span>
                </div>
              </div>

              <Button />
            </div>
          </div>
        </div>
      </main>

      {/* API  */}
      <div className="flex flex-col items-center gap-4 mt-5 mb-10  ">
        <h3
          className=" flex-1 text-2xl font-semibold font-mono "
          style={{ backgroundColor: "gray", padding: "10px" }}
        >
          Section-2
        </h3>
        <div className="flex flex-col gap-5 w-[400px]">
          <div className="  justify-between items-center">
            <p className="text-lg mt-3 border-2 px-4 py-2 rounded-md bg-gray-400  ">
              Code: {code}
            </p>
            <button
              onClick={fetchCode}
              className="border-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600  mt-5"
            >
              Refresh
            </button>
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter the above code"
              className="border-2 px-4 py-2 rounded-md"
            />
            <button
              onClick={handleSubmit}
              className="border-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Submit
            </button>
          </div>
          <p className="text-sm">Message: {message}</p>
        </div>
      </div>
    </>
  );
}
