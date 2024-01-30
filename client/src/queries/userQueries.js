import { gql } from "@apollo/client";

const GET_USER = gql`
query GetUser($id: ID!) {
    user(_id: $id) {
    _id
    username
    email
    password
    profilePicUrl
    createdAt
  }
}
`;

const GET_USERS = gql`
query GetUsers {
    users {
    _id
    username
    email
    password
    profilePicUrl
    createdAt
  }
}
`;

export { GET_USER, GET_USERS };