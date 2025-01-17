"use client";
import { shopMenuItems } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";

const LogoBrand = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="font-poppins text-white font-bold text-xl hover:text-gray-300 flex gap-1">
        ZAYMA
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down relative top-2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transition opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 left-0 mt-2 w-[500px] h-[500px] origin-top-right bg-[#2A2A2A] rounded-lg shadow-xl ring-1 ring-black/5 focus:outline-none backdrop-blur-sm ">
          <div className="px-6 flex justify-center items-start w-full">
            <div className="flex-col flex justify-center space-y-2">
              <h1 className="text-sans font-bold text-2xl text-white mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-500"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
                Shop
              </h1>
              {shopMenuItems.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={`${
                        active ? "bg-[#363636]" : ""
                      } group flex font-semibold font-poppins items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white hover:shadow-lg transition-all duration-200`}
                    >
                      {item.name === "Découvrir" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-green-500"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                      {item.name === "Liste de souhaits" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-red-500"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                      )}
                      {item.name === "Panier" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-yellow-500"
                        >
                          <circle cx="8" cy="21" r="1" />
                          <circle cx="19" cy="21" r="1" />
                          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                        </svg>
                      )}
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className='w-1 h-[400px] bg-gradient-to-b from-gray-600/20 via gray-600/20 mx-8' /> 
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LogoBrand;
