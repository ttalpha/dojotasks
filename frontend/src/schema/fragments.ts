export const userFragment = /* GraphQL */ `
  fragment UserFragment on User {
    id
    name
  }
`;

export const taskFragment = /* GraphQL */ `
  fragment TaskFragment on Task {
    id
    title
    status
    createdAt
    assignees {
      ...UserFragment
    }
  }
`;

export const projectFragment = /* GraphQL */ `
  fragment ProjectFragment on Project {
    id
    name
    createdAt
    members {
      ...UserFragment
    }
  }
`;

export const commentFragment = /* GraphQL */ `
  fragment CommentFragment on Comment {
    id
    text
    author {
      ...UserFragment
    }
  }
`;
