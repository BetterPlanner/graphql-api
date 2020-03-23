import { Course } from "./models/Course.js"

export const resolvers = {
    Query: {
      courses: () => Course.find(),
      getCourse: async (_, args) => {
          const { search = null } = args;
          
          let searchQuery = {};

          if ( search ) {
            // search by code or by name.
            searchQuery = {
                $or: [
                    { code: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ]
            };
          }

          const course = await Course.find(searchQuery);
          return course
      }
    },
    Mutation: {
        createCourse: async (_, { code }) => {
            const course = new Course({code});
            await course.save();
            return course;
        }
    }
  };