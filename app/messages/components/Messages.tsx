"use client";
import { useState, useEffect, use } from "react";
import Loading from "@/components/Loading";
import MessageCard from "./MessageCard";
import { Message } from "@/types/message-types";

export default function Messages() {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, []);

  if (loading) return <Loading heigth={400} />;

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p>You have no messages</p>
      ) : (
        messages.map((message) => (
          <MessageCard key={message._id} message={message} />
        ))
      )}
    </div>
  );
}
