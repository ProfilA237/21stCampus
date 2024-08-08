import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCourse = mutation({
  args: {
    course_id: v.string(),
    title: v.string(),
    description: v.string(),
    num_enrolled: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You are not logged in");
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity.email))
      .collect();

    if (user.length === 0) {
      throw new ConvexError("User not found");
    }

    const courses = await ctx.db.insert("courses", {
      course_id: args.course_id,
      title: args.title,
      description: args.description,
      num_enrolled: args.num_enrolled,
    });
    return courses;
  },
});

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("courses").collect();
  },
});
