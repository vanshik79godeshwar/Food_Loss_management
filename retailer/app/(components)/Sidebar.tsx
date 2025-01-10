"use client";
import React, { useState, useEffect } from "react";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
  X,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut from NextAuth

interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}) => {
  const currentPath = usePathname();
  const isActive =
    currentPath === href || (currentPath === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex items-center cursor-pointer ${
          isCollapsed ? "justify-center py-4" : "justify-start px-6 py-4"
        } hover:text-blue-500 hover:bg-gray-100 gap-3 transition-all ${
          isActive ? "bg-gray-200 text-blue-500" : ""
        }`}
      >
        <Icon className="w-6 h-6 text-gray-600" />
        {!isCollapsed && (
          <span className="font-medium text-gray-700">{label}</span>
        )}
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);

  // Check for mobile view on mount
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setMobileOpen(false); // Close mobile sidebar if switching to desktop
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    signOut(); // Sign out using NextAuth
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      )}

      <div
        className={`fixed flex flex-col ${
          isMobile
            ? isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : isCollapsed
            ? "w-16"
            : "w-64"
        } h-full bg-white shadow-md transition-all duration-300 z-40`}
      >
        <div
          className={`flex items-center gap-3 p-4 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Image
            src="https://e7.pngegg.com/pngimages/779/61/png-clipart-logo-idea-cute-eagle-leaf-logo.png"
            alt="Company Logo"
            width={32}
            height={32}
            className={`rounded ${isCollapsed ? "mr-5 ml-16" : ""}`}
          />
          {!isCollapsed && !isMobile && (
            <h1 className="text-xl font-bold text-gray-800">Foodie Market</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="ml-auto p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          <SidebarLink
            href="/dashboard"
            icon={Layout}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/analytics"
            icon={Archive}
            label="Analytics"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/products"
            icon={Clipboard}
            label="Products"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/users"
            icon={User}
            label="Users"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/settings"
            icon={SlidersHorizontal}
            label="Settings"
            isCollapsed={isCollapsed}
          />
          <SidebarLink
            href="/expenses"
            icon={CircleDollarSign}
            label="Expenses"
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Logout Button */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-start px-6 py-4 cursor-pointer hover:bg-gray-100 hover:text-blue-500"
        >
          <LogOut className="w-6 h-6 text-gray-600" />
          {!isCollapsed && (
            <span className="font-medium text-gray-700">Logout</span>
          )}
        </div>

        {!isCollapsed && !isMobile && (
          <footer className="p-4 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Foodie Market
          </footer>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          onClick={toggleMobileSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

