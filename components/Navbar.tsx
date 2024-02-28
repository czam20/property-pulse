"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaGoogle, FaBell } from "react-icons/fa";

export default function Navbar() {
  const [openMobileMenu, setOpenModalMenu] = useState(false);
  const isLogged = true;

  return (
    <nav className="bg-blue-700 border-b border-blue-500 h-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-black/25 focus:outline-none "
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpenModalMenu((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <FaBars className="text-xl" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <div className="h-10 w-auto relative">
                <Image fill src="/images/logo-white.png" alt="PropertyPulse" />
              </div>

              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                PropertyPulse
              </span>
            </Link>
            {/* Desktop Menu Hidden below md screens */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <MenuOption url="/" label="Home" />
                <MenuOption url="/properties" label="Properties" />
                {isLogged ? (
                  <MenuOption url="/properties/add" label="Add Property" />
                ) : null}
              </div>
            </div>
          </div>

          {isLogged ? (
            <div className="absolute gap-x-3 right-0 flex items-center">
              <Link href="/messages" className="relative group">
                <div className="relative rounded-full text-lg bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <FaBell />
                </div>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                </span>
              </Link>
              {/* Profile */}
              <ProfileMenu />
            </div>
          ) : (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <button className="flex items-center gap-x-2 text-white bg-slate-700 hover:bg-slate-800 rounded-md px-3 py-2">
                  <FaGoogle />
                  <span>Login or Register</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. --> */}
      {openMobileMenu ? (
        <div className="space-y-1 px-2 pb-3 pt-2">
          <MenuOption url="/" label="Home" />
          <MenuOption url="/properties" label="Properties" />
          {isLogged ? (
            <MenuOption url="/properties/add" label="Add Property" />
          ) : (
            <button className="flex items-center gap-x-2 text-white bg-slate-700 hover:bg-slate-800 rounded-md px-3 py-2">
              <FaGoogle />
              <span>Login or Register</span>
            </button>
          )}
        </div>
      ) : null}
    </nav>
  );
}

type MenuOptionProps = {
  url: string;
  label: string;
};

function MenuOption(props: MenuOptionProps) {
  const pathname = usePathname();

  return (
    <Link
      href={props.url}
      className={`${
        pathname === props.url && "underline underline-offset-4"
      } text-gray-100 leading-5 block rounded-md px-3 py-2 text-base font-medium`}
    >
      {props.label}
    </Link>
  );
}

function ProfileMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full relative overflow-hidden">
            <Image fill src="/images/profile.png" alt="" />
          </div>
        </button>
      </div>

      {/* Dropdown */}
      {openMenu ? (
        <div
          id="user-menu"
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-0"
          >
            Your Profile
          </Link>
          <Link
            href="/properties/saved"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Saved Properties
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Sign Out
          </Link>
        </div>
      ) : null}
    </div>
  );
}
