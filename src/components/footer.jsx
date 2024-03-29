import { Facebook, Instagram } from "@icon-park/react";
import Image from "next/image";
import Link from "next/link";

const IconFooter = ({ children, classNames = [], text }) => {
  return (
    <div
      className={
        " bg-opacity-10 sm:w-50 cursor-pointer sm:h-50 p-1 max-sm:flex " +
        classNames.join(" ")
      }
    >
      <div className="rounded-full bg-green-800 p-2 w-50 min-w-50">
        {children}
      </div>
      <div className="p-2 sm:hidden">{text}</div>
    </div>
  );
};

export default function Footer() {
  return (
    <div className="p-10 sm:pt-40 sm:pb-20 px-5 bg-footer w-[100vw] h-100">
      <div className="flex max-sm:flex-col sm:items-end items-center">
        <div className="ml-5 grow text-gray-500 max-sm:my-4">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt=""
              width="180"
              height="120"
              style={{
                marginBottom: "20px",
              }}
            />
          </Link>
          {"\u00A9 All Copyrights Reserved"}
        </div>

        <Link href={"https://www.facebook.com/konkanutcove.holidays"}>
          <IconFooter text="Facebook">
            <Facebook
              // theme="outline"
              size="24"
              className="stroke-current text-white"
            />
          </IconFooter>
        </Link>
        <Link href={"https://www.instagram.com/konkanutcove_holidays/"}>
          <IconFooter classNames={["sm:ml-2 mt-2"]} text="Instagram">
            <Instagram
              // theme="outline"
              size="24"
              className="stroke-current text-white"
            />
          </IconFooter>
        </Link>
      </div>
    </div>
  );
}
