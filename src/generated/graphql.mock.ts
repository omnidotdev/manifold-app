// @ts-nocheck
import * as Types from './generated';

import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateArtifactMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createArtifact }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateArtifactMutation = (resolver: GraphQLResponseResolver<Types.CreateArtifactMutation, Types.CreateArtifactMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateArtifactMutation, Types.CreateArtifactMutationVariables>(
    'CreateArtifact',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteArtifactMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteArtifact }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteArtifactMutation = (resolver: GraphQLResponseResolver<Types.DeleteArtifactMutation, Types.DeleteArtifactMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteArtifactMutation, Types.DeleteArtifactMutationVariables>(
    'DeleteArtifact',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateNamespaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createNamespace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateNamespaceMutation = (resolver: GraphQLResponseResolver<Types.CreateNamespaceMutation, Types.CreateNamespaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateNamespaceMutation, Types.CreateNamespaceMutationVariables>(
    'CreateNamespace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateNamespaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateNamespace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateNamespaceMutation = (resolver: GraphQLResponseResolver<Types.UpdateNamespaceMutation, Types.UpdateNamespaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateNamespaceMutation, Types.UpdateNamespaceMutationVariables>(
    'UpdateNamespace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteNamespaceMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteNamespace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteNamespaceMutation = (resolver: GraphQLResponseResolver<Types.DeleteNamespaceMutation, Types.DeleteNamespaceMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteNamespaceMutation, Types.DeleteNamespaceMutationVariables>(
    'DeleteNamespace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateRepositoryMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createRepository }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateRepositoryMutation = (resolver: GraphQLResponseResolver<Types.CreateRepositoryMutation, Types.CreateRepositoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateRepositoryMutation, Types.CreateRepositoryMutationVariables>(
    'CreateRepository',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateRepositoryMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateRepository }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateRepositoryMutation = (resolver: GraphQLResponseResolver<Types.UpdateRepositoryMutation, Types.UpdateRepositoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateRepositoryMutation, Types.UpdateRepositoryMutationVariables>(
    'UpdateRepository',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteRepositoryMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteRepository }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteRepositoryMutation = (resolver: GraphQLResponseResolver<Types.DeleteRepositoryMutation, Types.DeleteRepositoryMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteRepositoryMutation, Types.DeleteRepositoryMutationVariables>(
    'DeleteRepository',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateTagMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { createTag }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockCreateTagMutation = (resolver: GraphQLResponseResolver<Types.CreateTagMutation, Types.CreateTagMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.CreateTagMutation, Types.CreateTagMutationVariables>(
    'CreateTag',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateTagMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { updateTag }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockUpdateTagMutation = (resolver: GraphQLResponseResolver<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>(
    'UpdateTag',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockDeleteTagMutation(
 *   ({ query, variables }) => {
 *     const { input } = variables;
 *     return HttpResponse.json({
 *       data: { deleteTag }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockDeleteTagMutation = (resolver: GraphQLResponseResolver<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>, options?: RequestHandlerOptions) =>
  graphql.mutation<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>(
    'DeleteTag',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockNamespacesQuery(
 *   ({ query, variables }) => {
 *     const { condition, first, offset } = variables;
 *     return HttpResponse.json({
 *       data: { namespaces }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockNamespacesQuery = (resolver: GraphQLResponseResolver<Types.NamespacesQuery, Types.NamespacesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.NamespacesQuery, Types.NamespacesQueryVariables>(
    'Namespaces',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockNamespaceQuery(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { namespace }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockNamespaceQuery = (resolver: GraphQLResponseResolver<Types.NamespaceQuery, Types.NamespaceQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.NamespaceQuery, Types.NamespaceQueryVariables>(
    'Namespace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockNamespaceByNameQuery(
 *   ({ query, variables }) => {
 *     const { name } = variables;
 *     return HttpResponse.json({
 *       data: { namespaceByName }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockNamespaceByNameQuery = (resolver: GraphQLResponseResolver<Types.NamespaceByNameQuery, Types.NamespaceByNameQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.NamespaceByNameQuery, Types.NamespaceByNameQueryVariables>(
    'NamespaceByName',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRepositoryQuery(
 *   ({ query, variables }) => {
 *     const { rowId } = variables;
 *     return HttpResponse.json({
 *       data: { repository }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRepositoryQuery = (resolver: GraphQLResponseResolver<Types.RepositoryQuery, Types.RepositoryQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.RepositoryQuery, Types.RepositoryQueryVariables>(
    'Repository',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockRepositoriesByNamespaceQuery(
 *   ({ query, variables }) => {
 *     const { namespaceId, first, offset } = variables;
 *     return HttpResponse.json({
 *       data: { repositories }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockRepositoriesByNamespaceQuery = (resolver: GraphQLResponseResolver<Types.RepositoriesByNamespaceQuery, Types.RepositoriesByNamespaceQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.RepositoriesByNamespaceQuery, Types.RepositoriesByNamespaceQueryVariables>(
    'RepositoriesByNamespace',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSearchRepositoriesQuery(
 *   ({ query, variables }) => {
 *     const { query, first } = variables;
 *     return HttpResponse.json({
 *       data: { repositories }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSearchRepositoriesQuery = (resolver: GraphQLResponseResolver<Types.SearchRepositoriesQuery, Types.SearchRepositoriesQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<Types.SearchRepositoriesQuery, Types.SearchRepositoriesQueryVariables>(
    'SearchRepositories',
    resolver,
    options
  )
