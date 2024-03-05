"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
    url: string;
    label: string;
  };
  
export default function NavItem(props: NavItemProps) {
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
  