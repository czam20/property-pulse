"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useMessageContext } from "@/context/MessageContext";

export default function UnreadMessageCount() {
  const { data: session } = useSession();
  const { unreadCount, setUnreadCount } = useMessageContext();

  useEffect(() => {
    if (!session) return;

    const getUnreadMessagesCount = async () => {
      try {
        const res = await fetch("/api/messages/unread-count");

        if (res.status === 200) {
          const { count } = await res.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUnreadMessagesCount();
  }, [session]);

  return unreadCount > 0 ? (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadCount}
    </span>
  ) : null;
}
