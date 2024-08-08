import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  },
});

// this query is used to get the top user by podcast count. first the podcast is sorted by views and then the user is sorted by total podcasts, so the user with the most podcasts will be at the top.
export const getTopUserByPodcastCount = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").collect();

    const userData = await Promise.all(
      user.map(async (u) => {
        const podcasts = await ctx.db
          .query("courses")
          .filter((q) => q.eq(q.field("course_id"), u.clerkId))
          .collect();

        const sortedPodcasts = podcasts.sort((a: any, b: any) => b.views - a.views);

        return {
          ...u,
          totalCourses: podcasts.length,
          course: sortedPodcasts.map((course) => ({
          course: course.title,
            pocastId: course.course_id,
          })),
        };
      })
    );

    return userData.sort((a, b) => b.totalCourses - a.totalCourses);
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    first_name: v.string(),
    last_name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      first_name: args.first_name,
      last_name: args.last_name,
    });
  },
});
/* 
export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    }),

    const course = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("course_id"), args.clerkId))
      .collect();

    await Promise.all(
      course.map(async (course) => {
        await ctx.db.patch(course.course_id, {
          course_id: args.clerkId,
        });
      })
    );
  },
}); */
/* 
export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user.clerkId);
  },
});  */