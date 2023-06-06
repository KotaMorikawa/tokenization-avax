"use client";

import { useState } from "react";
import TokenizeForm from "../Form/TokenizeForm";
import ViewBuyersForm from "../Form/ViewBuyersForm";

const FarmerContainer = () => {
  const Tokenize = "Tokenize";
  const ViewBuyers = "ViewBuyers";

  const [activeTab, setActiveTab] = useState(Tokenize);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex bg-gray-900 rounded-t-lg px-4 py-2">
        <div
          className={`flex items-center text-white px-4 py-2 rounded ${
            activeTab === Tokenize ? "bg-green-500" : ""
          }`}
          onClick={() => setActiveTab(Tokenize)}
        >
          {Tokenize}
        </div>
        <div
          className={`flex items-center text-white px-4 py-2 rounded ${
            activeTab === ViewBuyers ? "bg-green-500" : ""
          }`}
          onClick={() => setActiveTab(ViewBuyers)}
        >
          {ViewBuyers}
        </div>
      </div>
      <div className="bg-gray-900 rounded-b-lg px-4 py-2">
        {activeTab === Tokenize && <TokenizeForm />}
        {activeTab === ViewBuyers && <ViewBuyersForm />}
      </div>
    </div>
  );
};
export default FarmerContainer;
