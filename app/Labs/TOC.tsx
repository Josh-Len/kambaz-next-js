"use client";
import { Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills" className="flex-row flex-wrap gap-2">
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs" active={pathname === "/Labs"}>
          Labs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab1" active={pathname.endsWith("Lab1")}>
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab2" active={pathname.endsWith("Lab2")}>
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab3" active={pathname.endsWith("Lab3")}>
          Lab 3
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab4" active={pathname.endsWith("Lab4")}>
          Lab 4
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab5" active={pathname.endsWith("Lab4")}>
          Lab 5
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={Link} href="/">Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/jannunzi">My GitHub</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
