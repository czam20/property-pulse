"use client";
import React, { useState } from "react";
import { Message } from "@/types/message-types";
import { toast } from "react-toastify";
import { useMessageContext } from "@/context/MessageContext";

type MessageCardProps = {
  message: Message;
};

export default function MessageCard(props: MessageCardProps) {
  const { message } = props;
  const date = new Date(message.createdAt);
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useMessageContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);

        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        toast.success(read ? "Marked as read" : "Marked as new");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success("Message deleted");
        setIsDeleted(true);

        if (!message.read) {
          setUnreadCount((prevCount) => prevCount - 1);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-lg mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        {message.phone && (
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
        )}

        <li>
          <strong>Received:</strong> {date.toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`${
          isRead ? "bg-gray-500" : "bg-blue-500"
        } mt-4 mr-3  text-white py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}
