import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments"
        id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123"
            className="wd-assignment-link" >
            A1 - ENV + HTML
          </Link> <div className="wd-assignment-meta">
            Multiple Modules | <b>Not Available until</b> May 6 12:00 AM |
          </div>
          <div className="wd-assignment-due">
            <b>Due</b> May 13 at 11:59 PM | 100 Pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/223"
            className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <b>Not Available until</b> May 13 12:00 AM |
          </div>
          <div className="wd-assignment-due">
            <b>Due</b> May 20 at 11:59 PM | 100 Pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link href="/courses/1234/assignments/323" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-meta">
            Multiple Modules | <b>Not Available until</b> May 20 12:00 AM |
          </div>
          <div className="wd-assignment-due">
            <b>Due</b> May 27 at 11:59 PM | 100 Pts
          </div>
        </li>
      </ul>
    </div>
  );
}
