/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

type EnrollmentsState = {
  enrollments: any[];
};

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollInCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      const { user, course } = action.payload;
      const already = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (already) return;

      state.enrollments.push({
        _id: new Date().getTime().toString(), // simple transient id
        user,
        course,
      });
    },
    unenrollFromCourse: (
      state,
      action: PayloadAction<{ user: string; course: string }>
    ) => {
      const { user, course } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === user && e.course === course)
      );
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
