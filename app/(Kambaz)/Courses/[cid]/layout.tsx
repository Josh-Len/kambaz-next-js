import type { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6"; // or "react-icons/fa" if you prefer
import { courses } from "../../Database";
import CourseNavigation from "./Navigation";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  const course = courses.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
      </h2>

      <hr />

      <div className="d-flex">
        <div className="d-none d-sm-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
