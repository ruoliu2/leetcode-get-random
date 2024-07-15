'use client';
import React from "react";
import  Link from "next/link";
import { usePathname } from 'next/navigation'
import {LinkProps} from "next/link";
import {Button} from "@mui/material";
interface HeaderLinkProps {
  href: string;
  text: string;
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, text }) => {
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link href={href}>
      <Button
        sx={{
          color: isActive ? "primary" : "black",
        }}
      >
        {text}
      </Button>
    </Link>
  );

};

export default HeaderLink;
