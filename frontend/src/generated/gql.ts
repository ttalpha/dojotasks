/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment UserFragment on User {\n    id\n    name\n  }\n": typeof types.UserFragmentFragmentDoc,
    "\n  fragment TaskFragment on Task {\n    id\n    title\n    status\n    createdAt\n    assignees {\n      ...UserFragment\n    }\n  }\n": typeof types.TaskFragmentFragmentDoc,
    "\n  fragment ProjectFragment on Project {\n    id\n    name\n    createdAt\n    members {\n      ...UserFragment\n    }\n  }\n": typeof types.ProjectFragmentFragmentDoc,
    "\n  fragment CommentFragment on Comment {\n    id\n    text\n    author {\n      ...UserFragment\n    }\n  }\n": typeof types.CommentFragmentFragmentDoc,
    "\n  mutation Register($input: CreateUserInput!) {\n    register(createUserInput: $input) {\n      ...UserFragment\n      email\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ...UserFragment\n      email\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(createProjectInput: $input) {\n      ...ProjectFragment\n      tasks {\n        ...TaskFragment\n      }\n    }\n  }\n": typeof types.CreateProjectDocument,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n": typeof types.CreateTaskDocument,
    "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n": typeof types.UpdateTaskDocument,
    "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      ...CommentFragment\n    }\n  }\n": typeof types.CreateCommentDocument,
    "\n  query FindProject($id: Int!) {\n    project(id: $id) {\n      id\n      members {\n        id\n        name\n      }\n      createdAt\n      tasks {\n        id\n        title\n        status\n        assignees {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.FindProjectDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": typeof types.MeDocument,
    "\n  query Projects {\n    projects {\n      id\n      name\n      createdAt\n    }\n  }\n": typeof types.ProjectsDocument,
};
const documents: Documents = {
    "\n  fragment UserFragment on User {\n    id\n    name\n  }\n": types.UserFragmentFragmentDoc,
    "\n  fragment TaskFragment on Task {\n    id\n    title\n    status\n    createdAt\n    assignees {\n      ...UserFragment\n    }\n  }\n": types.TaskFragmentFragmentDoc,
    "\n  fragment ProjectFragment on Project {\n    id\n    name\n    createdAt\n    members {\n      ...UserFragment\n    }\n  }\n": types.ProjectFragmentFragmentDoc,
    "\n  fragment CommentFragment on Comment {\n    id\n    text\n    author {\n      ...UserFragment\n    }\n  }\n": types.CommentFragmentFragmentDoc,
    "\n  mutation Register($input: CreateUserInput!) {\n    register(createUserInput: $input) {\n      ...UserFragment\n      email\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ...UserFragment\n      email\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(createProjectInput: $input) {\n      ...ProjectFragment\n      tasks {\n        ...TaskFragment\n      }\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      ...CommentFragment\n    }\n  }\n": types.CreateCommentDocument,
    "\n  query FindProject($id: Int!) {\n    project(id: $id) {\n      id\n      members {\n        id\n        name\n      }\n      createdAt\n      tasks {\n        id\n        title\n        status\n        assignees {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.FindProjectDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query Projects {\n    projects {\n      id\n      name\n      createdAt\n    }\n  }\n": types.ProjectsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskFragment on Task {\n    id\n    title\n    status\n    createdAt\n    assignees {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  fragment TaskFragment on Task {\n    id\n    title\n    status\n    createdAt\n    assignees {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectFragment on Project {\n    id\n    name\n    createdAt\n    members {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  fragment ProjectFragment on Project {\n    id\n    name\n    createdAt\n    members {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommentFragment on Comment {\n    id\n    text\n    author {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  fragment CommentFragment on Comment {\n    id\n    text\n    author {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: CreateUserInput!) {\n    register(createUserInput: $input) {\n      ...UserFragment\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Register($input: CreateUserInput!) {\n    register(createUserInput: $input) {\n      ...UserFragment\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ...UserFragment\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ...UserFragment\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(createProjectInput: $input) {\n      ...ProjectFragment\n      tasks {\n        ...TaskFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(createProjectInput: $input) {\n      ...ProjectFragment\n      tasks {\n        ...TaskFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTask($input: CreateTaskInput!) {\n    createTask(createTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($input: UpdateTaskInput!) {\n    updateTask(updateTaskInput: $input) {\n      ...TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      ...CommentFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreateComment($input: CreateCommentInput!) {\n    createComment(createCommentInput: $input) {\n      ...CommentFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindProject($id: Int!) {\n    project(id: $id) {\n      id\n      members {\n        id\n        name\n      }\n      createdAt\n      tasks {\n        id\n        title\n        status\n        assignees {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindProject($id: Int!) {\n    project(id: $id) {\n      id\n      members {\n        id\n        name\n      }\n      createdAt\n      tasks {\n        id\n        title\n        status\n        assignees {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Projects {\n    projects {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Projects {\n    projects {\n      id\n      name\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;