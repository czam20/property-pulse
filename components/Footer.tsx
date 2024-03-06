import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 py-3 px-4 sm:px-6 lg:px-8 h-20">
      <div className="container mx-auto flex flex-col gap-1 md:flex-row items-center justify-between max-w-7xl h-full">
        <div className="relative h-8 w-8">
          <Image src="/images/logo.png" alt="Logo" fill sizes="150px" />
        </div>
        <div>
          <p className="text-sm text-gray-500">
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
