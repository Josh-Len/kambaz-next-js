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
          </Link> </li>
            Multiple Modules | Not Availible till May 6 12:00 AM |
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/223"
             className="wd-assignment-link" >
            A2 - CSS + BOOTSTRAP
          </Link> </li>
            Multiple Modules | Not Availible till May 13 12:00 AM |
            <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/323"
             className="wd-assignment-link" >
            A3 - JAVASCRIPT + REACT
          </Link> </li>
            Multiple Modules | Not Availible till May 20 12:00 AM |
      </ul>
    </div>
);}
