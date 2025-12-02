"use client";
import { type ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

type Course = {
  _id: string;
  name: string;
  // number?: string;
  // description?: string;
};

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();

  const courses = useSelector<RootState, Course[]>(
    (state) => state.coursesReducer.courses
  );

  const course = courses.find((course) => course._id === cid);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <button
          type="button"
          className="btn btn-link p-0 me-4 mb-1 align-middle"
          onClick={() => setShowNav((prev) => !prev)}
        >
          <FaAlignJustify className="fs-4" />
        </button>

        {course?.name}
      </h2>

      <hr />

      <div className="d-flex">
        {showNav && (
          <div className="d-none d-sm-block me-4">
            <CourseNavigation />
          </div>
        )}

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
