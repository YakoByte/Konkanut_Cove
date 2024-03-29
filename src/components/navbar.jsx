import { HamburgerButton } from "@icon-park/react";
import Image from "next/image";
import { buttonList } from "../constants/navbar";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";

export default function Header({ buttonList, selectedIndex = 0 }) {
  // if (selectedIndex >= buttonList.length) {
  //   throw Error("Selected Index Exceeded button-list length!");
  // }

  const [open, setOpen] = useState(false);

  const handleOverlayClick = () => {
    setOpen(false);
  };

  const router = useRouter();

  const imageLoader = ({ src, width, quality }) => {
    return `https://konkanut-cove.vercel.app/${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  const selectedIndexClasses = "border-green-800 border-b-4 hover:none";
  const selectedIndexSmall = "bg-green-800 bg-opacity-70 text-white hover:none";

  const collapseItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Packages",
      href: "/packages",
    },
    {
      title: "Experiences",
      href: "/experiences",
    },
    {
      title: "Hotels",
      href: "/hotels",
    },
    {
      title: "Gallery",
      href: "/gallery",
    },
    {
      title: "Places to Visit",
      href: "/place",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "About Us",
      href: "/about",
    },
  ];

  return (
    <Navbar
      // isBordered

      variant="sticky"
      css={{
        $$navbarBackgroundColor: "transparent",
        $$navbarBlurBackgroundColor: "transparent",
        background:
          " linear-gradient(180deg, #0E5347 -151.57%, rgba(255, 255, 255, 0.5) 144.56%)",
      }}
    >
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Link href={"/"}>
          <Image src={"/logo.svg"} width={100} height={80} alt=" " />
        </Link>
      </Navbar.Brand>

      <Navbar.Content
        enableCursorHighlight
        activeColor="success"
        hoverColor="success"
        variant="default"
      >
        <Navbar.Link href="/packages" hideIn="xs">
          Packages
        </Navbar.Link>
        <Navbar.Link href="/hotels" hideIn="xs">
          Hotels
        </Navbar.Link>
        <Navbar.Toggle />
      </Navbar.Content>

      <Navbar.Collapse
        css={{
          background: "White",
          overflow: "hidden",
        }}
      >
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={index}
            activeColor="success"
            css={{
              justifyContent: "end",
              color: index === collapseItems.length - 1 ? "$error" : "",
              $$navbarBlurBackgroundColor: "transparent",
              backgroundColor: "transparent",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                color: "black",
              }}
              href={item.href}
            >
              <Text b>{item.title}</Text>
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
{
  /* <nav className="flex flex-col w-full h-20  items-center">
<div className="flex w-full h-full items-center">
  <div className="flex-grow ml-6 md:ml-16">
    <Link href={"/"}>
      <Image src={"/logo.svg"} width={100} height={80} alt=" " />
    </Link>
  </div>

  <div className="flex h-full max-sm:hidden ">
    {buttonList.map(({ name, url }, ind) => (
      <button
        onClick={() => {
          router.push(url);
        }}
        key={ind}
        className={`h-full flex items-center justify-center px-4 sm:mr-4 lg:mr-10 text-sm font-sans text-green-800 hover:border-green-700 hover:border-b-4 hover:bg-white hover:bg-opacity-25  ${
          router.pathname === url && selectedIndexClasses
        }`}
      >
        {name}
      </button>
    ))}
  </div>

  <div className="flex h-full sm:hidden items-center mr-5">
    <div className="relative">
      <button
        className="bg-transparent border-slate-900 border-[1px] hover:bg-slate-50 hover:bg-opacity-25 rounded-md p-1 ripple-bg-slate-50 "
        onClick={() => setOpen(true)}
      >
        <HamburgerButton
          theme="filled"
          size="36"
          className="text-slate-900"
        />
      </button>

      {open && (
        <>
          <div className="absolute top-0 right-0 bg-slate-50 rounded-md shadow-lg overflow-hidden transform transition duration-300 z-10 ease-in-out ">
            <ul class="w-48">
              {buttonList.map(({ name, url }, ind) => (
                <li
                  className={` p-3 flex items-center justify-center px-4 sm:mr-4 lg:mr-10 text-sm font-sans hover:bg-green-500 hover:text-slate-100 hover:bg-opacity-70  ${
                    selectedIndex === ind && selectedIndexSmall
                  }`}
                  key={ind}
                >
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="fixed inset-0 z-0 w-full h-full bg-black bg-opacity-25"
            onClick={handleOverlayClick}
          ></div>
        </>
      )}
    </div>
  </div>
  <div className="md:mr-10 lg:mr-20"></div>
</div>

<div className="border-white border-b-[1px] w-[95%] mx-10"></div>
</nav> */
}
