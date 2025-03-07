"use client";

import { useState } from "react";

const TabView = ({ children }: { children: React.ReactNode[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div>
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`rect ${activeTab === index ? "active" : ""}`}
          >
            Tab {index + 1}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center container rect">
        {children[activeTab]}
      </div>
    </div>
  );
};

export { TabView };
