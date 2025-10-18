"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { CiBeaker1 } from "react-icons/ci";
import { FaBookDead, FaCalendarAlt, FaRegUserCircle } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
export default function KambazNavigation() {
 const pathname = usePathname();
 const links = [
   { href: "/Account",   label: "Account",   icon: FaRegUserCircle },
   { href: "/Dashboard", label: "Dashboard", icon: MdSpaceDashboard },
   { href: "/Dashboard", label: "Courses",   icon: FaBookDead },
   { href: "/Calendar",  label: "Calendar",  icon: FaCalendarAlt },
   { href: "/Inbox",     label: "Inbox",     icon: FaRegUserCircle },
   { href: "/Labs",      label: "Labs",      icon: CiBeaker1 },
 ];
return (
   <ListGroup style={{ width: "140px" }} 
      className="rounded-0 position-fixed bottom-0 top-0  bg-black z-2">
     <ListGroupItem className="bg-black text-danger border-0">
       Northeastern </ListGroupItem>
     {links.map(({ href, label, icon: Icon }) => (
       <ListGroupItem key={href} as={Link} href={href}
         className={`${ pathname.includes(label) ? "bg-white text-danger"
                     : "bg-black text-white" } text-center border-0`} >
         <Icon className="fs-1 text-danger" /> <br />
         {label}
       </ListGroupItem>
     ))}
   </ListGroup>
 );}
