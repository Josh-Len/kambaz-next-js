"use client";

import Nav from "react-bootstrap/Nav";
import Link from "next/link";

export default function TOC() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs">Labs</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab1">Lab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab2" >Lab 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab3">Lab 3</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/">Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi" target="_blank" rel="noreferrer">
          My GitHub
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
