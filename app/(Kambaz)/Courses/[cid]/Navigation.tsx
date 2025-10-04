import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/Courses/1234/Home" className="list-group-item text-danger border-0">Home</Link>
      <Link href="/Courses/1234/Modules" className="list-group-item text-danger border-0">Modules
        </Link>
      <Link href="/Courses/1234/Piazza" className="list-group-item text-danger border-0">Piazza</Link>
      <Link href="/Courses/1234/Zoom" className="list-group-item text-danger border-0">Zoom</Link>
      <Link href="/Courses/1234/Assignments" className="list-group-item text-danger border-0">
          Assignments</Link>
      <Link href="/Courses/1234/Quizzes" className="list-group-item text-danger border-0">Quizzes</Link>
      <Link href="/Courses/1234/Grades" className="list-group-item text-danger border-0">Grades</Link>
      <Link href="/Courses/1234/People/Table" className="list-group-item text-danger border-0">People</Link>
    </div>
  );}
