"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../People/Table"; // adjust path if needed
import * as coursesClient from "../../client"; // <- Courses client
import { FormControl } from "react-bootstrap";

export default function CoursePeoplePage() {
  const params = useParams();
  const { cid } = params as { cid: string };

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // Load users enrolled in this course
  const fetchUsers = async () => {
    try {
      const enrolledUsers = await coursesClient.findUsersForCourse(cid);
      setAllUsers(enrolledUsers);
      setUsers(enrolledUsers);
    } catch (e) {
      console.error("Failed to load users for course", e);
    }
  };

  useEffect(() => {
    if (!cid) return;
    fetchUsers();
  }, [cid]);

  // Filter by role within enrolled users
  const filterUsersByRole = (roleValue: string) => {
    setRole(roleValue);
    const lowerName = name.toLowerCase();

    const base = roleValue
      ? allUsers.filter((u) => u.role === roleValue)
      : allUsers;

    const filtered = base.filter(
      (u) =>
        u.firstName.toLowerCase().includes(lowerName) ||
        u.lastName.toLowerCase().includes(lowerName) ||
        (u.username && u.username.toLowerCase().includes(lowerName))
    );

    setUsers(filtered);
  };

  // Filter by name within enrolled users
  const filterUsersByName = (nameValue: string) => {
    setName(nameValue);
    const lower = nameValue.toLowerCase();

    const base = role ? allUsers.filter((u) => u.role === role) : allUsers;

    const filtered = base.filter(
      (u) =>
        u.firstName.toLowerCase().includes(lower) ||
        u.lastName.toLowerCase().includes(lower) ||
        (u.username && u.username.toLowerCase().includes(lower))
    );

    setUsers(filtered);
  };

  return (
    <div>
      <h3>Users Enrolled in Course</h3>

      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix mb-3" />

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
