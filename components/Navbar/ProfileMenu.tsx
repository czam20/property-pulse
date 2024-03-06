"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function ProfileMenu(props: { profileImage?: string | null }) {
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
              <Image
                fill
                src={props.profileImage || "/images/profile.png"}
                alt=""
                sizes="32px"
              />
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
              onClick={() => setOpenMenu(false)}
            >
              Your Profile
            </Link>
            <Link
              href="/properties/saved"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
              onClick={() => setOpenMenu(false)}
            >
              Saved Properties
            </Link>
            <button
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
              onClick={() => {
                setOpenMenu(false);
                signOut()
              }}
            >
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    );
  }
  