import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  courses: defineTable({
    course_id: v.string(),
    title: v.string(),
    description: v.string(),
    num_enrolled: v.number(),
  }),
  course_material: defineTable({
    course_id: v.string(),
    type: v.string(),
    link: v.string(),
  }),
  assignments: defineTable({
    assignment_id: v.string(),
    course_id: v.string(),
    title: v.string(),
    description: v.string(),
    due_date: v.string(),
  }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    first_name: v.string(),
    last_name: v.string(),
  }),
  enrollment: defineTable({
    clerkId: v.string(),
    course_id: v.string(),
  }),
});
