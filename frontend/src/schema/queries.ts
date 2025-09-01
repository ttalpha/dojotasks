export const projectQuery = /* GraphQL */ `
  query FindProject($id: Int!) {
    project(id: $id) {
      id
      members {
        id
        name
      }
      createdAt
      tasks {
        id
        title
        status
        assignees {
          id
          name
        }
      }
    }
  }
`;

export const meQuery = /* GraphQL */ `
  query Me {
    me {
      id
      name
      email
    }
  }
`;

export const projectsQuery = /* GraphQL */ `
  query Projects {
    projects {
      id
      name
      createdAt
    }
  }
`;
