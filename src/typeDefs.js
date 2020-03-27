import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
  courses: [Course!]!
  getCourse(search: String): [Course!]
}

type Course {
  id: ID!
  code: String!
  name: String!,
  description: String!,
  division: String!,
  department: String,
  prerequisites: String,
  exclusions: String,
  level: Int,
  campus: String!,
  term: String,
  prerequisites_array: [String],
  required_for: [String]
}

type Mutation {
  createCourse(code: String!): Course!
}
`;