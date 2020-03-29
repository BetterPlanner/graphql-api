import { Course } from "./models/Course.js"

async function req_for ( course ) {
    if ( course ) {
        let searchQuery = {};
        // search by code
        searchQuery = {
            $or: [
                { code: { $regex: course, $options: 'i' } }
            ]
        };
        const return_val = await Course.findOne(searchQuery);
        return return_val.required_for
    }
}

async function make_tree (course, req_for_arr) {
    var return_object = {}
    if ( req_for_arr.length == 0 ) {
        return_object.name = course
    }
    else {
        return_object.name = course
        return_object.children = []
        for (var code of req_for_arr) {
            const next_req_for = await req_for(code);
            return_object.children.push(await make_tree(code, next_req_for))
        }
    }
    return return_object
}

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
      },
      getTree: async (_, args) => {
        const { search = null } = args;
        console.log(args)
        let searchQuery = {};
        if ( search ) {
            // search by code or by name.
            searchQuery = {
                $or: [
                    { code: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const course = await Course.findOne(searchQuery);
        const tree = await make_tree(search, course.required_for);
        return tree
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