import React from 'react'
import { useState } from 'react'
import Link from "next/link";
import router from "next/router";


export const Dashboard = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    // logout method
    const logOut = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout`, {
            method: "POST", // Change method to POST
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            // Logout successful, redirect or perform any other action
            router.push(`${process.env.NEXT_PUBLIC_HOST}/login`)
            console.log("Logout successful");
          } else {
            // Handle error response
            console.error("Logout failed");
          }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
      

    return (
        <div className="min-h-full">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href={"/"}
                                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Home
                            </Link>                       
                            <Link
                                href={"/dashboard"}
                                className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Dashboard
                            </Link>   
                        </div>
                    </div>
                    </div>
                    <div className="md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                        <div className="relative ml-3">
                        <div>
                            <button onClick={toggleMenu}  type="button" className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>

                        {isMenuVisible && (
                            <div
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabIndex="-1"
                            >
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                            <a href="#" onClick={logOut} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                
                </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                </div>
            </main>
        </div>
    )
}

export default Dashboard