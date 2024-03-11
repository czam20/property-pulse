"use client";
import React, { useContext, createContext, useState } from "react";

const MessageContext = createContext<{
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  unreadCount: 0,
  setUnreadCount: () => {},
});

export function MessageProvider(props: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <MessageContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

export const useMessageContext = () => useContext(MessageContext);
