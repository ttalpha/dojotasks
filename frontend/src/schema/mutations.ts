export const registerMutation = /* GraphQL */ `
  mutation Register($input: CreateUserInput!) {
    register(createUserInput: $input) {
      ...UserFragment
      email
    }
  }
`;
export const loginMutation = /* GraphQL */ `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ...UserFragment
      email
    }
  }
`;

export const logoutMutation = /* GraphQL */ `
  mutation Logout {
    logout
  }
`;

export const createProjectMutation = /* GraphQL */ `
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(createProjectInput: $input) {
      ...ProjectFragment
      tasks {
        ...TaskFragment
      }
    }
  }
`;

export const createTaskMutation = /* GraphQL */ `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(createTaskInput: $input) {
      ...TaskFragment
    }
  }
`;

export const updateTaskMutation = /* GraphQL */ `
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(updateTaskInput: $input) {
      ...TaskFragment
    }
  }
`;

export const createCommentMutation = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      ...CommentFragment
    }
  }
`;
