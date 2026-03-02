import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

/**
 * PageLayout — wraps all authenticated pages.
 * Manages sidebar collapse state and provides responsive shell.
 */
export default function PageLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? 68 : 240;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      {/* Main content */}
      <div
        className="flex-1 flex flex-col relative z-10"
        style={{
          marginLeft: sidebarW,
          transition: "margin-left 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <Navbar />
        <main className="flex-1 p-7 lg:p-8 max-w-[1400px] w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
