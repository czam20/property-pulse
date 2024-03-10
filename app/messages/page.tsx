import Messages from "./components/Messages";

export default function MessagesPage() {
  return (
    <section className="bg-blue-50 h-full min-h-[calc(100vh-144px)]">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-4">Your Messages</h1>
            <Messages />
        </div>
      </div>
    </section>
  );
}
