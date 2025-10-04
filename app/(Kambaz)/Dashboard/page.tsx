"use client";

import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, Button } from "react-bootstrap";

const courses = [
  {
    href: "/Courses/1234",
    img: "/images/reactjs.jpg",
    title: "CS1234 React JS",
    subtitle: "Full Stack Software Developer",
  },
  {
    href: "/Courses/2345",
    img: "/images/nodejs.jpg",
    title: "CS2345 Node JS",
    subtitle: "Backend development with Node",
  },
  {
    href: "/Courses/3456",
    img: "/images/python.jpg",
    title: "CS3456 Python",
    subtitle: "Learn Python programming basics",
  },
  {
    href: "/Courses/4567",
    img: "/images/java.jpg",
    title: "CS4567 Java",
    subtitle: "Object-oriented programming in Java",
  },
  {
    href: "/Courses/5678",
    img: "/images/htmlcss.jpg",
    title: "CS5678 HTML & CSS",
    subtitle: "Building modern web pages",
  },
  {
    href: "/Courses/6789",
    img: "/images/sql.jpg",
    title: "CS6789 SQL",
    subtitle: "Databases and SQL queries",
  },
  {
    href: "/Courses/7890",
    img: "/images/ml.jpg",
    title: "CS7890 Machine Learning",
    subtitle: "Intro to AI & machine learning",
  },
];

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <Row id="wd-dashboard-courses" className="g-3">
        {courses.map((c) => (
          <Col key={c.href} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Link href={c.href} className="text-decoration-none">
                <div className="position-relative" style={{ height: 150 }}>
                  <Image
                    src={c.img}
                    alt={`${c.title} course thumbnail`}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
                  />
                </div>
                <Card.Body>
                  <Card.Title as="h5" className="mb-1">
                    {c.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {c.subtitle}
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
