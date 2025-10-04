"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BiBook } from "react-icons/bi";
import Link from "next/link";

export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNortheastern_University&psig=AOvVaw0_DcgsO6JiZJVEN2fmUUy7&ust=1759628851649000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDZ5ba2iZADFQAAAAAdAAAAABAEhttps://upload.wikimedia.org/wikipedia/commons/b/bb/NU_RGB_seal_R.png"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1 text-danger" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link href="/Dashboard" className="text-danger text-decoration-none">
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
          <br />
          <BiBook className="fs-1 text-danger mt-1" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Calendar"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Labs"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>

      {/* Settings */}
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/Settings"
          id="wd-settings-link"
          className="text-white text-decoration-none"
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Settings
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
