"use client";

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../client"; // ⬅️ path from Courses/[cid]/People/Table/page.tsx

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!cid) return;

    const load = async () => {
      try {
        const users = await client.findPeopleForCourse(cid);
        setEnrolledUsers(users);
      } catch (e) {
        console.error("Failed to load people for course", e);
      }
    };

    load();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>
                <span className="wd-last-name"> {user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
