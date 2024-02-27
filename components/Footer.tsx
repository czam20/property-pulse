import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-8 w-8">
          <Image src="/images/logo.png" alt="Logo" fill />
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
