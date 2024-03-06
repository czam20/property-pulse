"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { FaBars, FaGoogle, FaBell } from "react-icons/fa";
import {
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import NavItem from "./NavItem";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const { data: session } = useSession();
  const [openMobileMenu, setOpenModalMenu] = useState(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res as any);
      } catch (error) {}
    };

    setAuthProviders();
  }, []);

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
                <Image fill src="/images/logo-white.png" alt="PropertyPulse" sizes="150px"/>
              </div>

              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                PropertyPulse
              </span>
            </Link>
            {/* Desktop Menu Hidden below md screens */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <NavItem url="/" label="Home" />
                <NavItem url="/properties" label="Properties" />
                {session ? (
                  <NavItem url="/properties/add" label="Add Property" />
                ) : null}
              </div>
            </div>
          </div>

          {session ? (
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
              <ProfileMenu profileImage={session?.user?.image} />
            </div>
          ) : (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <LoginButton
                  providerId={providers?.google.id ?? ""}
                  icon={<FaGoogle />}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. --> */}
      {openMobileMenu ? (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 bg-black">
            <NavItem url="/" label="Home" />
            <NavItem url="/properties" label="Properties" />
            {session ? (
              <NavItem url="/properties/add" label="Add Property" />
            ) : (
              <LoginButton
                providerId={providers?.google.id ?? ""}
                icon={<FaGoogle />}
              />
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
