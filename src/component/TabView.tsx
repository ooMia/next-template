"use client";

import { useState } from "react";

const TabView = ({ children }: { children: React.ReactNode[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-[50vw]">
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
      <div className="container rect">{children[activeTab]}</div>
    </div>
  );
};

export { TabView };
