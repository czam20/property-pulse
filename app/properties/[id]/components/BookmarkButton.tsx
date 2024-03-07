"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CustomButton from "@/components/CustomButton";
import { FaBookmark } from "react-icons/fa";

type BookmarkButtonProps = {
  propertyId: string;
};

export default function BookmarkButton(props: BookmarkButtonProps) {
  const { propertyId } = props;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const getIsBookmarked = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/bookmarks/check/${propertyId}`);

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getIsBookmarked();
  }, [propertyId, session]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark this property");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          propertyId: propertyId,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomButton
      text={isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
      icon={<FaBookmark className="mr-2" />}
      className={
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      }
      onClick={handleClick}
      loading={loading}
    />
  );
}
