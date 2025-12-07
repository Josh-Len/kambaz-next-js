// app/(Kambaz)/Courses/client.ts
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Generate or retrieve tab-specific identifier
const getTabId = (): string => {
  if (typeof window === "undefined") return "";
  let tabId = sessionStorage.getItem("kambaz-tab-id");
  if (!tabId) {
    tabId = `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("kambaz-tab-id", tabId);
  }
  return tabId;
};

const axiosWithCredentials = axios.create({ withCredentials: true });

// Add tab identifier to all requests
axiosWithCredentials.interceptors.request.use((config) => {
  const tabId = getTabId();
  if (tabId) {
    config.headers["X-Tab-Id"] = tabId;
  }
  return config;
});

// Also add tab ID to regular axios requests
axios.interceptors.request.use((config) => {
  const tabId = getTabId();
  if (tabId) {
    config.headers["X-Tab-Id"] = tabId;
  }
  return config;
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

/* ---------- Modules ---------- */

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

/* ---------- Assignments ---------- */

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

/* ---------- Enrollments (per assignment spec) ---------- */

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

/* ---------- People for course ---------- */

export const findPeopleForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/people`
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
 const response = await axios.get(`${COURSES_API}/${courseId}/users`);
 return response.data;
};

