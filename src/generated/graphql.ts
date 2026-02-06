// @ts-nocheck
import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { graphqlFetch } from '@/lib/graphql/graphqlFetch';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: string; output: string; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: string; }
  JSON: { input: unknown; output: unknown; }
  UUID: { input: string; output: string; }
};

export type ApiToken = Node & {
  __typename?: 'ApiToken';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastUsedAt?: Maybe<Scalars['Datetime']['output']>;
  name: Scalars['String']['output'];
  /** Reads a single `Namespace` that is related to this `ApiToken`. */
  namespace?: Maybe<Namespace>;
  namespaceId: Scalars['UUID']['output'];
  /** Reads a single `Repository` that is related to this `ApiToken`. */
  repository?: Maybe<Repository>;
  repositoryId?: Maybe<Scalars['UUID']['output']>;
  rowId: Scalars['UUID']['output'];
  scope: Scalars['String']['output'];
  tokenHash: Scalars['String']['output'];
  tokenPrefix: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/**
 * A condition to be used against `ApiToken` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ApiTokenCondition = {
  /** Checks for equality with the object’s `createdBy` field. */
  createdBy?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `isActive` field. */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `namespaceId` field. */
  namespaceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `tokenHash` field. */
  tokenHash?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `tokenPrefix` field. */
  tokenPrefix?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `ApiToken` values. */
export type ApiTokenConnection = {
  __typename?: 'ApiTokenConnection';
  /** A list of edges which contains the `ApiToken` and cursor to aid in pagination. */
  edges: Array<Maybe<ApiTokenEdge>>;
  /** A list of `ApiToken` objects. */
  nodes: Array<Maybe<ApiToken>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ApiToken` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ApiToken` edge in the connection. */
export type ApiTokenEdge = {
  __typename?: 'ApiTokenEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ApiToken` at the end of the edge. */
  node?: Maybe<ApiToken>;
};

/** A filter to be used against `ApiToken` object types. All fields are combined with a logical ‘and.’ */
export type ApiTokenFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ApiTokenFilter>>;
  /** Filter by the object’s `createdBy` field. */
  createdBy?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isActive` field. */
  isActive?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `namespace` relation. */
  namespace?: InputMaybe<NamespaceFilter>;
  /** Filter by the object’s `namespaceId` field. */
  namespaceId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ApiTokenFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ApiTokenFilter>>;
  /** Filter by the object’s `repository` relation. */
  repository?: InputMaybe<RepositoryFilter>;
  /** A related `repository` exists. */
  repositoryExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tokenHash` field. */
  tokenHash?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tokenPrefix` field. */
  tokenPrefix?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `ApiToken` */
export type ApiTokenInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastUsedAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  namespaceId: Scalars['UUID']['input'];
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  tokenHash: Scalars['String']['input'];
  tokenPrefix: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `ApiToken`. */
export enum ApiTokenOrderBy {
  CreatedByAsc = 'CREATED_BY_ASC',
  CreatedByDesc = 'CREATED_BY_DESC',
  IsActiveAsc = 'IS_ACTIVE_ASC',
  IsActiveDesc = 'IS_ACTIVE_DESC',
  NamespaceIdAsc = 'NAMESPACE_ID_ASC',
  NamespaceIdDesc = 'NAMESPACE_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RepositoryIdAsc = 'REPOSITORY_ID_ASC',
  RepositoryIdDesc = 'REPOSITORY_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TokenHashAsc = 'TOKEN_HASH_ASC',
  TokenHashDesc = 'TOKEN_HASH_DESC',
  TokenPrefixAsc = 'TOKEN_PREFIX_ASC',
  TokenPrefixDesc = 'TOKEN_PREFIX_DESC'
}

/** Represents an update to a `ApiToken`. Fields that are set will be updated. */
export type ApiTokenPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastUsedAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  namespaceId?: InputMaybe<Scalars['UUID']['input']>;
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  tokenHash?: InputMaybe<Scalars['String']['input']>;
  tokenPrefix?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Artifact = Node & {
  __typename?: 'Artifact';
  /** Reads a single `ContainerMetadatum` that is related to this `Artifact`. */
  containerMetadatum?: Maybe<ContainerMetadatum>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  digest: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  mediaType: Scalars['String']['output'];
  /** Reads a single `Repository` that is related to this `Artifact`. */
  repository?: Maybe<Repository>;
  repositoryId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads a single `SchemaMetadatum` that is related to this `Artifact`. */
  schemaMetadatum?: Maybe<SchemaMetadatum>;
  size: Scalars['BigInt']['output'];
  /** Reads and enables pagination through a set of `Tag`. */
  tags: TagConnection;
  /** Reads a single `WasmMetadatum` that is related to this `Artifact`. */
  wasmMetadatum?: Maybe<WasmMetadatum>;
};


export type ArtifactTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};

/**
 * A condition to be used against `Artifact` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ArtifactCondition = {
  /** Checks for equality with the object’s `digest` field. */
  digest?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Artifact` values. */
export type ArtifactConnection = {
  __typename?: 'ArtifactConnection';
  /** A list of edges which contains the `Artifact` and cursor to aid in pagination. */
  edges: Array<Maybe<ArtifactEdge>>;
  /** A list of `Artifact` objects. */
  nodes: Array<Maybe<Artifact>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Artifact` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Artifact` edge in the connection. */
export type ArtifactEdge = {
  __typename?: 'ArtifactEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Artifact` at the end of the edge. */
  node?: Maybe<Artifact>;
};

/** A filter to be used against `Artifact` object types. All fields are combined with a logical ‘and.’ */
export type ArtifactFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ArtifactFilter>>;
  /** Filter by the object’s `containerMetadatum` relation. */
  containerMetadatum?: InputMaybe<ContainerMetadatumFilter>;
  /** A related `containerMetadatum` exists. */
  containerMetadatumExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `digest` field. */
  digest?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ArtifactFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ArtifactFilter>>;
  /** Filter by the object’s `repository` relation. */
  repository?: InputMaybe<RepositoryFilter>;
  /** Filter by the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `schemaMetadatum` relation. */
  schemaMetadatum?: InputMaybe<SchemaMetadatumFilter>;
  /** A related `schemaMetadatum` exists. */
  schemaMetadatumExists?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tags` relation. */
  tags?: InputMaybe<ArtifactToManyTagFilter>;
  /** Some related `tags` exist. */
  tagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `wasmMetadatum` relation. */
  wasmMetadatum?: InputMaybe<WasmMetadatumFilter>;
  /** A related `wasmMetadatum` exists. */
  wasmMetadatumExists?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Artifact` */
export type ArtifactInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  digest: Scalars['String']['input'];
  mediaType: Scalars['String']['input'];
  repositoryId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  size: Scalars['BigInt']['input'];
};

/** Methods to use when ordering `Artifact`. */
export enum ArtifactOrderBy {
  DigestAsc = 'DIGEST_ASC',
  DigestDesc = 'DIGEST_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RepositoryIdAsc = 'REPOSITORY_ID_ASC',
  RepositoryIdDesc = 'REPOSITORY_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Artifact`. Fields that are set will be updated. */
export type ArtifactPatch = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  digest?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<Scalars['String']['input']>;
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  size?: InputMaybe<Scalars['BigInt']['input']>;
};

/** A filter to be used against many `Tag` object types. All fields are combined with a logical ‘and.’ */
export type ArtifactToManyTagFilter = {
  /** Every related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagFilter>;
  /** No related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagFilter>;
  /** Some related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagFilter>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type ContainerMetadatum = Node & {
  __typename?: 'ContainerMetadatum';
  architecture?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Artifact` that is related to this `ContainerMetadatum`. */
  artifact?: Maybe<Artifact>;
  artifactId: Scalars['UUID']['output'];
  configDigest?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  layerDigests: Scalars['JSON']['output'];
  os?: Maybe<Scalars['String']['output']>;
  schemaVersion: Scalars['Int']['output'];
};

/**
 * A condition to be used against `ContainerMetadatum` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ContainerMetadatumCondition = {
  /** Checks for equality with the object’s `artifactId` field. */
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `ContainerMetadatum` values. */
export type ContainerMetadatumConnection = {
  __typename?: 'ContainerMetadatumConnection';
  /** A list of edges which contains the `ContainerMetadatum` and cursor to aid in pagination. */
  edges: Array<Maybe<ContainerMetadatumEdge>>;
  /** A list of `ContainerMetadatum` objects. */
  nodes: Array<Maybe<ContainerMetadatum>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ContainerMetadatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `ContainerMetadatum` edge in the connection. */
export type ContainerMetadatumEdge = {
  __typename?: 'ContainerMetadatumEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `ContainerMetadatum` at the end of the edge. */
  node?: Maybe<ContainerMetadatum>;
};

/** A filter to be used against `ContainerMetadatum` object types. All fields are combined with a logical ‘and.’ */
export type ContainerMetadatumFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ContainerMetadatumFilter>>;
  /** Filter by the object’s `artifact` relation. */
  artifact?: InputMaybe<ArtifactFilter>;
  /** Filter by the object’s `artifactId` field. */
  artifactId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ContainerMetadatumFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ContainerMetadatumFilter>>;
};

/** An input for mutations affecting `ContainerMetadatum` */
export type ContainerMetadatumInput = {
  architecture?: InputMaybe<Scalars['String']['input']>;
  artifactId: Scalars['UUID']['input'];
  configDigest?: InputMaybe<Scalars['String']['input']>;
  layerDigests?: InputMaybe<Scalars['JSON']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  schemaVersion: Scalars['Int']['input'];
};

/** Methods to use when ordering `ContainerMetadatum`. */
export enum ContainerMetadatumOrderBy {
  ArtifactIdAsc = 'ARTIFACT_ID_ASC',
  ArtifactIdDesc = 'ARTIFACT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `ContainerMetadatum`. Fields that are set will be updated. */
export type ContainerMetadatumPatch = {
  architecture?: InputMaybe<Scalars['String']['input']>;
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
  configDigest?: InputMaybe<Scalars['String']['input']>;
  layerDigests?: InputMaybe<Scalars['JSON']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  schemaVersion?: InputMaybe<Scalars['Int']['input']>;
};

/** All input for the create `ApiToken` mutation. */
export type CreateApiTokenInput = {
  /** The `ApiToken` to be created by this mutation. */
  apiToken: ApiTokenInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `ApiToken` mutation. */
export type CreateApiTokenPayload = {
  __typename?: 'CreateApiTokenPayload';
  /** The `ApiToken` that was created by this mutation. */
  apiToken?: Maybe<ApiToken>;
  /** An edge for our `ApiToken`. May be used by Relay 1. */
  apiTokenEdge?: Maybe<ApiTokenEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ApiToken` mutation. */
export type CreateApiTokenPayloadApiTokenEdgeArgs = {
  orderBy?: Array<ApiTokenOrderBy>;
};

/** All input for the create `Artifact` mutation. */
export type CreateArtifactInput = {
  /** The `Artifact` to be created by this mutation. */
  artifact: ArtifactInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Artifact` mutation. */
export type CreateArtifactPayload = {
  __typename?: 'CreateArtifactPayload';
  /** The `Artifact` that was created by this mutation. */
  artifact?: Maybe<Artifact>;
  /** An edge for our `Artifact`. May be used by Relay 1. */
  artifactEdge?: Maybe<ArtifactEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Artifact` mutation. */
export type CreateArtifactPayloadArtifactEdgeArgs = {
  orderBy?: Array<ArtifactOrderBy>;
};

/** All input for the create `ContainerMetadatum` mutation. */
export type CreateContainerMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `ContainerMetadatum` to be created by this mutation. */
  containerMetadatum: ContainerMetadatumInput;
};

/** The output of our create `ContainerMetadatum` mutation. */
export type CreateContainerMetadatumPayload = {
  __typename?: 'CreateContainerMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ContainerMetadatum` that was created by this mutation. */
  containerMetadatum?: Maybe<ContainerMetadatum>;
  /** An edge for our `ContainerMetadatum`. May be used by Relay 1. */
  containerMetadatumEdge?: Maybe<ContainerMetadatumEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ContainerMetadatum` mutation. */
export type CreateContainerMetadatumPayloadContainerMetadatumEdgeArgs = {
  orderBy?: Array<ContainerMetadatumOrderBy>;
};

/** All input for the create `Namespace` mutation. */
export type CreateNamespaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Namespace` to be created by this mutation. */
  namespace: NamespaceInput;
};

/** The output of our create `Namespace` mutation. */
export type CreateNamespacePayload = {
  __typename?: 'CreateNamespacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Namespace` that was created by this mutation. */
  namespace?: Maybe<Namespace>;
  /** An edge for our `Namespace`. May be used by Relay 1. */
  namespaceEdge?: Maybe<NamespaceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Namespace` mutation. */
export type CreateNamespacePayloadNamespaceEdgeArgs = {
  orderBy?: Array<NamespaceOrderBy>;
};

/** All input for the create `Repository` mutation. */
export type CreateRepositoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Repository` to be created by this mutation. */
  repository: RepositoryInput;
};

/** The output of our create `Repository` mutation. */
export type CreateRepositoryPayload = {
  __typename?: 'CreateRepositoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Repository` that was created by this mutation. */
  repository?: Maybe<Repository>;
  /** An edge for our `Repository`. May be used by Relay 1. */
  repositoryEdge?: Maybe<RepositoryEdge>;
};


/** The output of our create `Repository` mutation. */
export type CreateRepositoryPayloadRepositoryEdgeArgs = {
  orderBy?: Array<RepositoryOrderBy>;
};

/** All input for the create `SchemaMetadatum` mutation. */
export type CreateSchemaMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SchemaMetadatum` to be created by this mutation. */
  schemaMetadatum: SchemaMetadatumInput;
};

/** The output of our create `SchemaMetadatum` mutation. */
export type CreateSchemaMetadatumPayload = {
  __typename?: 'CreateSchemaMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SchemaMetadatum` that was created by this mutation. */
  schemaMetadatum?: Maybe<SchemaMetadatum>;
  /** An edge for our `SchemaMetadatum`. May be used by Relay 1. */
  schemaMetadatumEdge?: Maybe<SchemaMetadatumEdge>;
};


/** The output of our create `SchemaMetadatum` mutation. */
export type CreateSchemaMetadatumPayloadSchemaMetadatumEdgeArgs = {
  orderBy?: Array<SchemaMetadatumOrderBy>;
};

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Tag` to be created by this mutation. */
  tag: TagInput;
};

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the create `UploadSession` mutation. */
export type CreateUploadSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `UploadSession` to be created by this mutation. */
  uploadSession: UploadSessionInput;
};

/** The output of our create `UploadSession` mutation. */
export type CreateUploadSessionPayload = {
  __typename?: 'CreateUploadSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UploadSession` that was created by this mutation. */
  uploadSession?: Maybe<UploadSession>;
  /** An edge for our `UploadSession`. May be used by Relay 1. */
  uploadSessionEdge?: Maybe<UploadSessionEdge>;
};


/** The output of our create `UploadSession` mutation. */
export type CreateUploadSessionPayloadUploadSessionEdgeArgs = {
  orderBy?: Array<UploadSessionOrderBy>;
};

/** All input for the create `WasmMetadatum` mutation. */
export type CreateWasmMetadatumInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WasmMetadatum` to be created by this mutation. */
  wasmMetadatum: WasmMetadatumInput;
};

/** The output of our create `WasmMetadatum` mutation. */
export type CreateWasmMetadatumPayload = {
  __typename?: 'CreateWasmMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WasmMetadatum` that was created by this mutation. */
  wasmMetadatum?: Maybe<WasmMetadatum>;
  /** An edge for our `WasmMetadatum`. May be used by Relay 1. */
  wasmMetadatumEdge?: Maybe<WasmMetadatumEdge>;
};


/** The output of our create `WasmMetadatum` mutation. */
export type CreateWasmMetadatumPayloadWasmMetadatumEdgeArgs = {
  orderBy?: Array<WasmMetadatumOrderBy>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteApiTokenById` mutation. */
export type DeleteApiTokenByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ApiToken` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteApiToken` mutation. */
export type DeleteApiTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `ApiToken` mutation. */
export type DeleteApiTokenPayload = {
  __typename?: 'DeleteApiTokenPayload';
  /** The `ApiToken` that was deleted by this mutation. */
  apiToken?: Maybe<ApiToken>;
  /** An edge for our `ApiToken`. May be used by Relay 1. */
  apiTokenEdge?: Maybe<ApiTokenEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedApiTokenId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ApiToken` mutation. */
export type DeleteApiTokenPayloadApiTokenEdgeArgs = {
  orderBy?: Array<ApiTokenOrderBy>;
};

/** All input for the `deleteArtifactById` mutation. */
export type DeleteArtifactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Artifact` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteArtifact` mutation. */
export type DeleteArtifactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Artifact` mutation. */
export type DeleteArtifactPayload = {
  __typename?: 'DeleteArtifactPayload';
  /** The `Artifact` that was deleted by this mutation. */
  artifact?: Maybe<Artifact>;
  /** An edge for our `Artifact`. May be used by Relay 1. */
  artifactEdge?: Maybe<ArtifactEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedArtifactId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Artifact` mutation. */
export type DeleteArtifactPayloadArtifactEdgeArgs = {
  orderBy?: Array<ArtifactOrderBy>;
};

/** All input for the `deleteContainerMetadatumById` mutation. */
export type DeleteContainerMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ContainerMetadatum` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteContainerMetadatum` mutation. */
export type DeleteContainerMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `ContainerMetadatum` mutation. */
export type DeleteContainerMetadatumPayload = {
  __typename?: 'DeleteContainerMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ContainerMetadatum` that was deleted by this mutation. */
  containerMetadatum?: Maybe<ContainerMetadatum>;
  /** An edge for our `ContainerMetadatum`. May be used by Relay 1. */
  containerMetadatumEdge?: Maybe<ContainerMetadatumEdge>;
  deletedContainerMetadatumId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ContainerMetadatum` mutation. */
export type DeleteContainerMetadatumPayloadContainerMetadatumEdgeArgs = {
  orderBy?: Array<ContainerMetadatumOrderBy>;
};

/** All input for the `deleteNamespaceById` mutation. */
export type DeleteNamespaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Namespace` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteNamespaceByName` mutation. */
export type DeleteNamespaceByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteNamespace` mutation. */
export type DeleteNamespaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Namespace` mutation. */
export type DeleteNamespacePayload = {
  __typename?: 'DeleteNamespacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedNamespaceId?: Maybe<Scalars['ID']['output']>;
  /** The `Namespace` that was deleted by this mutation. */
  namespace?: Maybe<Namespace>;
  /** An edge for our `Namespace`. May be used by Relay 1. */
  namespaceEdge?: Maybe<NamespaceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Namespace` mutation. */
export type DeleteNamespacePayloadNamespaceEdgeArgs = {
  orderBy?: Array<NamespaceOrderBy>;
};

/** All input for the `deleteRepositoryById` mutation. */
export type DeleteRepositoryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Repository` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteRepository` mutation. */
export type DeleteRepositoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Repository` mutation. */
export type DeleteRepositoryPayload = {
  __typename?: 'DeleteRepositoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedRepositoryId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Repository` that was deleted by this mutation. */
  repository?: Maybe<Repository>;
  /** An edge for our `Repository`. May be used by Relay 1. */
  repositoryEdge?: Maybe<RepositoryEdge>;
};


/** The output of our delete `Repository` mutation. */
export type DeleteRepositoryPayloadRepositoryEdgeArgs = {
  orderBy?: Array<RepositoryOrderBy>;
};

/** All input for the `deleteSchemaMetadatumById` mutation. */
export type DeleteSchemaMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SchemaMetadatum` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSchemaMetadatum` mutation. */
export type DeleteSchemaMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `SchemaMetadatum` mutation. */
export type DeleteSchemaMetadatumPayload = {
  __typename?: 'DeleteSchemaMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSchemaMetadatumId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SchemaMetadatum` that was deleted by this mutation. */
  schemaMetadatum?: Maybe<SchemaMetadatum>;
  /** An edge for our `SchemaMetadatum`. May be used by Relay 1. */
  schemaMetadatumEdge?: Maybe<SchemaMetadatumEdge>;
};


/** The output of our delete `SchemaMetadatum` mutation. */
export type DeleteSchemaMetadatumPayloadSchemaMetadatumEdgeArgs = {
  orderBy?: Array<SchemaMetadatumOrderBy>;
};

/** All input for the `deleteTagById` mutation. */
export type DeleteTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tag` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTagId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the `deleteUploadSessionById` mutation. */
export type DeleteUploadSessionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UploadSession` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUploadSession` mutation. */
export type DeleteUploadSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `UploadSession` mutation. */
export type DeleteUploadSessionPayload = {
  __typename?: 'DeleteUploadSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUploadSessionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UploadSession` that was deleted by this mutation. */
  uploadSession?: Maybe<UploadSession>;
  /** An edge for our `UploadSession`. May be used by Relay 1. */
  uploadSessionEdge?: Maybe<UploadSessionEdge>;
};


/** The output of our delete `UploadSession` mutation. */
export type DeleteUploadSessionPayloadUploadSessionEdgeArgs = {
  orderBy?: Array<UploadSessionOrderBy>;
};

/** All input for the `deleteWasmMetadatumById` mutation. */
export type DeleteWasmMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WasmMetadatum` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteWasmMetadatum` mutation. */
export type DeleteWasmMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our delete `WasmMetadatum` mutation. */
export type DeleteWasmMetadatumPayload = {
  __typename?: 'DeleteWasmMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWasmMetadatumId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WasmMetadatum` that was deleted by this mutation. */
  wasmMetadatum?: Maybe<WasmMetadatum>;
  /** An edge for our `WasmMetadatum`. May be used by Relay 1. */
  wasmMetadatumEdge?: Maybe<WasmMetadatumEdge>;
};


/** The output of our delete `WasmMetadatum` mutation. */
export type DeleteWasmMetadatumPayloadWasmMetadatumEdgeArgs = {
  orderBy?: Array<WasmMetadatumOrderBy>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `ApiToken`. */
  createApiToken?: Maybe<CreateApiTokenPayload>;
  /** Creates a single `Artifact`. */
  createArtifact?: Maybe<CreateArtifactPayload>;
  /** Creates a single `ContainerMetadatum`. */
  createContainerMetadatum?: Maybe<CreateContainerMetadatumPayload>;
  /** Creates a single `Namespace`. */
  createNamespace?: Maybe<CreateNamespacePayload>;
  /** Creates a single `Repository`. */
  createRepository?: Maybe<CreateRepositoryPayload>;
  /** Creates a single `SchemaMetadatum`. */
  createSchemaMetadatum?: Maybe<CreateSchemaMetadatumPayload>;
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>;
  /** Creates a single `UploadSession`. */
  createUploadSession?: Maybe<CreateUploadSessionPayload>;
  /** Creates a single `WasmMetadatum`. */
  createWasmMetadatum?: Maybe<CreateWasmMetadatumPayload>;
  /** Deletes a single `ApiToken` using a unique key. */
  deleteApiToken?: Maybe<DeleteApiTokenPayload>;
  /** Deletes a single `ApiToken` using its globally unique id. */
  deleteApiTokenById?: Maybe<DeleteApiTokenPayload>;
  /** Deletes a single `Artifact` using a unique key. */
  deleteArtifact?: Maybe<DeleteArtifactPayload>;
  /** Deletes a single `Artifact` using its globally unique id. */
  deleteArtifactById?: Maybe<DeleteArtifactPayload>;
  /** Deletes a single `ContainerMetadatum` using a unique key. */
  deleteContainerMetadatum?: Maybe<DeleteContainerMetadatumPayload>;
  /** Deletes a single `ContainerMetadatum` using its globally unique id. */
  deleteContainerMetadatumById?: Maybe<DeleteContainerMetadatumPayload>;
  /** Deletes a single `Namespace` using a unique key. */
  deleteNamespace?: Maybe<DeleteNamespacePayload>;
  /** Deletes a single `Namespace` using its globally unique id. */
  deleteNamespaceById?: Maybe<DeleteNamespacePayload>;
  /** Deletes a single `Namespace` using a unique key. */
  deleteNamespaceByName?: Maybe<DeleteNamespacePayload>;
  /** Deletes a single `Repository` using a unique key. */
  deleteRepository?: Maybe<DeleteRepositoryPayload>;
  /** Deletes a single `Repository` using its globally unique id. */
  deleteRepositoryById?: Maybe<DeleteRepositoryPayload>;
  /** Deletes a single `SchemaMetadatum` using a unique key. */
  deleteSchemaMetadatum?: Maybe<DeleteSchemaMetadatumPayload>;
  /** Deletes a single `SchemaMetadatum` using its globally unique id. */
  deleteSchemaMetadatumById?: Maybe<DeleteSchemaMetadatumPayload>;
  /** Deletes a single `Tag` using a unique key. */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Deletes a single `Tag` using its globally unique id. */
  deleteTagById?: Maybe<DeleteTagPayload>;
  /** Deletes a single `UploadSession` using a unique key. */
  deleteUploadSession?: Maybe<DeleteUploadSessionPayload>;
  /** Deletes a single `UploadSession` using its globally unique id. */
  deleteUploadSessionById?: Maybe<DeleteUploadSessionPayload>;
  /** Deletes a single `WasmMetadatum` using a unique key. */
  deleteWasmMetadatum?: Maybe<DeleteWasmMetadatumPayload>;
  /** Deletes a single `WasmMetadatum` using its globally unique id. */
  deleteWasmMetadatumById?: Maybe<DeleteWasmMetadatumPayload>;
  /** Updates a single `ApiToken` using a unique key and a patch. */
  updateApiToken?: Maybe<UpdateApiTokenPayload>;
  /** Updates a single `ApiToken` using its globally unique id and a patch. */
  updateApiTokenById?: Maybe<UpdateApiTokenPayload>;
  /** Updates a single `Artifact` using a unique key and a patch. */
  updateArtifact?: Maybe<UpdateArtifactPayload>;
  /** Updates a single `Artifact` using its globally unique id and a patch. */
  updateArtifactById?: Maybe<UpdateArtifactPayload>;
  /** Updates a single `ContainerMetadatum` using a unique key and a patch. */
  updateContainerMetadatum?: Maybe<UpdateContainerMetadatumPayload>;
  /** Updates a single `ContainerMetadatum` using its globally unique id and a patch. */
  updateContainerMetadatumById?: Maybe<UpdateContainerMetadatumPayload>;
  /** Updates a single `Namespace` using a unique key and a patch. */
  updateNamespace?: Maybe<UpdateNamespacePayload>;
  /** Updates a single `Namespace` using its globally unique id and a patch. */
  updateNamespaceById?: Maybe<UpdateNamespacePayload>;
  /** Updates a single `Namespace` using a unique key and a patch. */
  updateNamespaceByName?: Maybe<UpdateNamespacePayload>;
  /** Updates a single `Repository` using a unique key and a patch. */
  updateRepository?: Maybe<UpdateRepositoryPayload>;
  /** Updates a single `Repository` using its globally unique id and a patch. */
  updateRepositoryById?: Maybe<UpdateRepositoryPayload>;
  /** Updates a single `SchemaMetadatum` using a unique key and a patch. */
  updateSchemaMetadatum?: Maybe<UpdateSchemaMetadatumPayload>;
  /** Updates a single `SchemaMetadatum` using its globally unique id and a patch. */
  updateSchemaMetadatumById?: Maybe<UpdateSchemaMetadatumPayload>;
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTag?: Maybe<UpdateTagPayload>;
  /** Updates a single `Tag` using its globally unique id and a patch. */
  updateTagById?: Maybe<UpdateTagPayload>;
  /** Updates a single `UploadSession` using a unique key and a patch. */
  updateUploadSession?: Maybe<UpdateUploadSessionPayload>;
  /** Updates a single `UploadSession` using its globally unique id and a patch. */
  updateUploadSessionById?: Maybe<UpdateUploadSessionPayload>;
  /** Updates a single `WasmMetadatum` using a unique key and a patch. */
  updateWasmMetadatum?: Maybe<UpdateWasmMetadatumPayload>;
  /** Updates a single `WasmMetadatum` using its globally unique id and a patch. */
  updateWasmMetadatumById?: Maybe<UpdateWasmMetadatumPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateApiTokenArgs = {
  input: CreateApiTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateArtifactArgs = {
  input: CreateArtifactInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateContainerMetadatumArgs = {
  input: CreateContainerMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateNamespaceArgs = {
  input: CreateNamespaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRepositoryArgs = {
  input: CreateRepositoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSchemaMetadatumArgs = {
  input: CreateSchemaMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUploadSessionArgs = {
  input: CreateUploadSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWasmMetadatumArgs = {
  input: CreateWasmMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteApiTokenArgs = {
  input: DeleteApiTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteApiTokenByIdArgs = {
  input: DeleteApiTokenByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteArtifactArgs = {
  input: DeleteArtifactInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteArtifactByIdArgs = {
  input: DeleteArtifactByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContainerMetadatumArgs = {
  input: DeleteContainerMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteContainerMetadatumByIdArgs = {
  input: DeleteContainerMetadatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNamespaceArgs = {
  input: DeleteNamespaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNamespaceByIdArgs = {
  input: DeleteNamespaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNamespaceByNameArgs = {
  input: DeleteNamespaceByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRepositoryArgs = {
  input: DeleteRepositoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRepositoryByIdArgs = {
  input: DeleteRepositoryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSchemaMetadatumArgs = {
  input: DeleteSchemaMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSchemaMetadatumByIdArgs = {
  input: DeleteSchemaMetadatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagByIdArgs = {
  input: DeleteTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadSessionArgs = {
  input: DeleteUploadSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUploadSessionByIdArgs = {
  input: DeleteUploadSessionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWasmMetadatumArgs = {
  input: DeleteWasmMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWasmMetadatumByIdArgs = {
  input: DeleteWasmMetadatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateApiTokenArgs = {
  input: UpdateApiTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateApiTokenByIdArgs = {
  input: UpdateApiTokenByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateArtifactArgs = {
  input: UpdateArtifactInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateArtifactByIdArgs = {
  input: UpdateArtifactByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContainerMetadatumArgs = {
  input: UpdateContainerMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateContainerMetadatumByIdArgs = {
  input: UpdateContainerMetadatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNamespaceArgs = {
  input: UpdateNamespaceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNamespaceByIdArgs = {
  input: UpdateNamespaceByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNamespaceByNameArgs = {
  input: UpdateNamespaceByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRepositoryArgs = {
  input: UpdateRepositoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRepositoryByIdArgs = {
  input: UpdateRepositoryByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSchemaMetadatumArgs = {
  input: UpdateSchemaMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSchemaMetadatumByIdArgs = {
  input: UpdateSchemaMetadatumByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagByIdArgs = {
  input: UpdateTagByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadSessionArgs = {
  input: UpdateUploadSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUploadSessionByIdArgs = {
  input: UpdateUploadSessionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWasmMetadatumArgs = {
  input: UpdateWasmMetadatumInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWasmMetadatumByIdArgs = {
  input: UpdateWasmMetadatumByIdInput;
};

export type Namespace = Node & {
  __typename?: 'Namespace';
  /** Reads and enables pagination through a set of `ApiToken`. */
  apiTokens: ApiTokenConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Repository`. */
  repositories: RepositoryConnection;
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type NamespaceApiTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApiTokenCondition>;
  filter?: InputMaybe<ApiTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApiTokenOrderBy>>;
};


export type NamespaceRepositoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RepositoryCondition>;
  filter?: InputMaybe<RepositoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RepositoryOrderBy>>;
};

/**
 * A condition to be used against `Namespace` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type NamespaceCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Namespace` values. */
export type NamespaceConnection = {
  __typename?: 'NamespaceConnection';
  /** A list of edges which contains the `Namespace` and cursor to aid in pagination. */
  edges: Array<Maybe<NamespaceEdge>>;
  /** A list of `Namespace` objects. */
  nodes: Array<Maybe<Namespace>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Namespace` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Namespace` edge in the connection. */
export type NamespaceEdge = {
  __typename?: 'NamespaceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Namespace` at the end of the edge. */
  node?: Maybe<Namespace>;
};

/** A filter to be used against `Namespace` object types. All fields are combined with a logical ‘and.’ */
export type NamespaceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<NamespaceFilter>>;
  /** Filter by the object’s `apiTokens` relation. */
  apiTokens?: InputMaybe<NamespaceToManyApiTokenFilter>;
  /** Some related `apiTokens` exist. */
  apiTokensExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<NamespaceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<NamespaceFilter>>;
  /** Filter by the object’s `repositories` relation. */
  repositories?: InputMaybe<NamespaceToManyRepositoryFilter>;
  /** Some related `repositories` exist. */
  repositoriesExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Namespace` */
export type NamespaceInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Namespace`. */
export enum NamespaceOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Namespace`. Fields that are set will be updated. */
export type NamespacePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `ApiToken` object types. All fields are combined with a logical ‘and.’ */
export type NamespaceToManyApiTokenFilter = {
  /** Every related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ApiTokenFilter>;
  /** No related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ApiTokenFilter>;
  /** Some related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ApiTokenFilter>;
};

/** A filter to be used against many `Repository` object types. All fields are combined with a logical ‘and.’ */
export type NamespaceToManyRepositoryFilter = {
  /** Every related `Repository` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<RepositoryFilter>;
  /** No related `Repository` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<RepositoryFilter>;
  /** Some related `Repository` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<RepositoryFilter>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `ApiToken`. */
  apiToken?: Maybe<ApiToken>;
  /** Reads a single `ApiToken` using its globally unique `ID`. */
  apiTokenById?: Maybe<ApiToken>;
  /** Reads and enables pagination through a set of `ApiToken`. */
  apiTokens?: Maybe<ApiTokenConnection>;
  /** Get a single `Artifact`. */
  artifact?: Maybe<Artifact>;
  /** Reads a single `Artifact` using its globally unique `ID`. */
  artifactById?: Maybe<Artifact>;
  /** Reads and enables pagination through a set of `Artifact`. */
  artifacts?: Maybe<ArtifactConnection>;
  /** Reads and enables pagination through a set of `ContainerMetadatum`. */
  containerMetadata?: Maybe<ContainerMetadatumConnection>;
  /** Get a single `ContainerMetadatum`. */
  containerMetadatum?: Maybe<ContainerMetadatum>;
  /** Reads a single `ContainerMetadatum` using its globally unique `ID`. */
  containerMetadatumById?: Maybe<ContainerMetadatum>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Get a single `Namespace`. */
  namespace?: Maybe<Namespace>;
  /** Reads a single `Namespace` using its globally unique `ID`. */
  namespaceById?: Maybe<Namespace>;
  /** Get a single `Namespace`. */
  namespaceByName?: Maybe<Namespace>;
  /** Reads and enables pagination through a set of `Namespace`. */
  namespaces?: Maybe<NamespaceConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads and enables pagination through a set of `Repository`. */
  repositories?: Maybe<RepositoryConnection>;
  /** Get a single `Repository`. */
  repository?: Maybe<Repository>;
  /** Reads a single `Repository` using its globally unique `ID`. */
  repositoryById?: Maybe<Repository>;
  /** Reads and enables pagination through a set of `SchemaMetadatum`. */
  schemaMetadata?: Maybe<SchemaMetadatumConnection>;
  /** Get a single `SchemaMetadatum`. */
  schemaMetadatum?: Maybe<SchemaMetadatum>;
  /** Reads a single `SchemaMetadatum` using its globally unique `ID`. */
  schemaMetadatumById?: Maybe<SchemaMetadatum>;
  /** Get a single `Tag`. */
  tag?: Maybe<Tag>;
  /** Reads a single `Tag` using its globally unique `ID`. */
  tagById?: Maybe<Tag>;
  /** Reads and enables pagination through a set of `Tag`. */
  tags?: Maybe<TagConnection>;
  /** Get a single `UploadSession`. */
  uploadSession?: Maybe<UploadSession>;
  /** Reads a single `UploadSession` using its globally unique `ID`. */
  uploadSessionById?: Maybe<UploadSession>;
  /** Reads and enables pagination through a set of `UploadSession`. */
  uploadSessions?: Maybe<UploadSessionConnection>;
  /** Reads and enables pagination through a set of `WasmMetadatum`. */
  wasmMetadata?: Maybe<WasmMetadatumConnection>;
  /** Get a single `WasmMetadatum`. */
  wasmMetadatum?: Maybe<WasmMetadatum>;
  /** Reads a single `WasmMetadatum` using its globally unique `ID`. */
  wasmMetadatumById?: Maybe<WasmMetadatum>;
};


/** The root query type which gives access points into the data universe. */
export type QueryApiTokenArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApiTokenByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryApiTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApiTokenCondition>;
  filter?: InputMaybe<ApiTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApiTokenOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryArtifactArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryArtifactByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryArtifactsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ArtifactCondition>;
  filter?: InputMaybe<ArtifactFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ArtifactOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryContainerMetadataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ContainerMetadatumCondition>;
  filter?: InputMaybe<ContainerMetadatumFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ContainerMetadatumOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryContainerMetadatumArgs = {
  artifactId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryContainerMetadatumByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNamespaceArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNamespaceByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNamespaceByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNamespacesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<NamespaceCondition>;
  filter?: InputMaybe<NamespaceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NamespaceOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<RepositoryCondition>;
  filter?: InputMaybe<RepositoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RepositoryOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRepositoryArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRepositoryByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySchemaMetadataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SchemaMetadatumCondition>;
  filter?: InputMaybe<SchemaMetadatumFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SchemaMetadatumOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySchemaMetadatumArgs = {
  artifactId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySchemaMetadatumByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadSessionArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadSessionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUploadSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UploadSessionCondition>;
  filter?: InputMaybe<UploadSessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UploadSessionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWasmMetadataArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WasmMetadatumCondition>;
  filter?: InputMaybe<WasmMetadatumFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WasmMetadatumOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWasmMetadatumArgs = {
  artifactId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWasmMetadatumByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Repository = Node & {
  __typename?: 'Repository';
  /** Reads and enables pagination through a set of `ApiToken`. */
  apiTokens: ApiTokenConnection;
  artifactType: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Artifact`. */
  artifacts: ArtifactConnection;
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Reads a single `Namespace` that is related to this `Repository`. */
  namespace?: Maybe<Namespace>;
  namespaceId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Tag`. */
  tags: TagConnection;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  /** Reads and enables pagination through a set of `UploadSession`. */
  uploadSessions: UploadSessionConnection;
};


export type RepositoryApiTokensArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ApiTokenCondition>;
  filter?: InputMaybe<ApiTokenFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApiTokenOrderBy>>;
};


export type RepositoryArtifactsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ArtifactCondition>;
  filter?: InputMaybe<ArtifactFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ArtifactOrderBy>>;
};


export type RepositoryTagsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TagCondition>;
  filter?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TagOrderBy>>;
};


export type RepositoryUploadSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UploadSessionCondition>;
  filter?: InputMaybe<UploadSessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UploadSessionOrderBy>>;
};

/**
 * A condition to be used against `Repository` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RepositoryCondition = {
  /** Checks for equality with the object’s `artifactType` field. */
  artifactType?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `namespaceId` field. */
  namespaceId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Repository` values. */
export type RepositoryConnection = {
  __typename?: 'RepositoryConnection';
  /** A list of edges which contains the `Repository` and cursor to aid in pagination. */
  edges: Array<Maybe<RepositoryEdge>>;
  /** A list of `Repository` objects. */
  nodes: Array<Maybe<Repository>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Repository` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Repository` edge in the connection. */
export type RepositoryEdge = {
  __typename?: 'RepositoryEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Repository` at the end of the edge. */
  node?: Maybe<Repository>;
};

/** A filter to be used against `Repository` object types. All fields are combined with a logical ‘and.’ */
export type RepositoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<RepositoryFilter>>;
  /** Filter by the object’s `apiTokens` relation. */
  apiTokens?: InputMaybe<RepositoryToManyApiTokenFilter>;
  /** Some related `apiTokens` exist. */
  apiTokensExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `artifactType` field. */
  artifactType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `artifacts` relation. */
  artifacts?: InputMaybe<RepositoryToManyArtifactFilter>;
  /** Some related `artifacts` exist. */
  artifactsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `namespace` relation. */
  namespace?: InputMaybe<NamespaceFilter>;
  /** Filter by the object’s `namespaceId` field. */
  namespaceId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<RepositoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<RepositoryFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `tags` relation. */
  tags?: InputMaybe<RepositoryToManyTagFilter>;
  /** Some related `tags` exist. */
  tagsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `uploadSessions` relation. */
  uploadSessions?: InputMaybe<RepositoryToManyUploadSessionFilter>;
  /** Some related `uploadSessions` exist. */
  uploadSessionsExist?: InputMaybe<Scalars['Boolean']['input']>;
};

/** An input for mutations affecting `Repository` */
export type RepositoryInput = {
  artifactType: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  namespaceId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Repository`. */
export enum RepositoryOrderBy {
  ArtifactTypeAsc = 'ARTIFACT_TYPE_ASC',
  ArtifactTypeDesc = 'ARTIFACT_TYPE_DESC',
  NamespaceIdAsc = 'NAMESPACE_ID_ASC',
  NamespaceIdDesc = 'NAMESPACE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Repository`. Fields that are set will be updated. */
export type RepositoryPatch = {
  artifactType?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  namespaceId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against many `ApiToken` object types. All fields are combined with a logical ‘and.’ */
export type RepositoryToManyApiTokenFilter = {
  /** Every related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ApiTokenFilter>;
  /** No related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ApiTokenFilter>;
  /** Some related `ApiToken` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ApiTokenFilter>;
};

/** A filter to be used against many `Artifact` object types. All fields are combined with a logical ‘and.’ */
export type RepositoryToManyArtifactFilter = {
  /** Every related `Artifact` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ArtifactFilter>;
  /** No related `Artifact` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ArtifactFilter>;
  /** Some related `Artifact` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ArtifactFilter>;
};

/** A filter to be used against many `Tag` object types. All fields are combined with a logical ‘and.’ */
export type RepositoryToManyTagFilter = {
  /** Every related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TagFilter>;
  /** No related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TagFilter>;
  /** Some related `Tag` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TagFilter>;
};

/** A filter to be used against many `UploadSession` object types. All fields are combined with a logical ‘and.’ */
export type RepositoryToManyUploadSessionFilter = {
  /** Every related `UploadSession` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<UploadSessionFilter>;
  /** No related `UploadSession` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<UploadSessionFilter>;
  /** Some related `UploadSession` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<UploadSessionFilter>;
};

export type SchemaMetadatum = Node & {
  __typename?: 'SchemaMetadatum';
  /** Reads a single `Artifact` that is related to this `SchemaMetadatum`. */
  artifact?: Maybe<Artifact>;
  artifactId: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  isValid: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  validationErrors?: Maybe<Scalars['JSON']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `SchemaMetadatum` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SchemaMetadatumCondition = {
  /** Checks for equality with the object’s `artifactId` field. */
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SchemaMetadatum` values. */
export type SchemaMetadatumConnection = {
  __typename?: 'SchemaMetadatumConnection';
  /** A list of edges which contains the `SchemaMetadatum` and cursor to aid in pagination. */
  edges: Array<Maybe<SchemaMetadatumEdge>>;
  /** A list of `SchemaMetadatum` objects. */
  nodes: Array<Maybe<SchemaMetadatum>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SchemaMetadatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SchemaMetadatum` edge in the connection. */
export type SchemaMetadatumEdge = {
  __typename?: 'SchemaMetadatumEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SchemaMetadatum` at the end of the edge. */
  node?: Maybe<SchemaMetadatum>;
};

/** A filter to be used against `SchemaMetadatum` object types. All fields are combined with a logical ‘and.’ */
export type SchemaMetadatumFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SchemaMetadatumFilter>>;
  /** Filter by the object’s `artifact` relation. */
  artifact?: InputMaybe<ArtifactFilter>;
  /** Filter by the object’s `artifactId` field. */
  artifactId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SchemaMetadatumFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SchemaMetadatumFilter>>;
};

/** An input for mutations affecting `SchemaMetadatum` */
export type SchemaMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  validationErrors?: InputMaybe<Scalars['JSON']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `SchemaMetadatum`. */
export enum SchemaMetadatumOrderBy {
  ArtifactIdAsc = 'ARTIFACT_ID_ASC',
  ArtifactIdDesc = 'ARTIFACT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `SchemaMetadatum`. Fields that are set will be updated. */
export type SchemaMetadatumPatch = {
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  validationErrors?: InputMaybe<Scalars['JSON']['input']>;
  version?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  /** Reads a single `Artifact` that is related to this `Tag`. */
  artifact?: Maybe<Artifact>;
  artifactId: Scalars['UUID']['output'];
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Reads a single `Repository` that is related to this `Tag`. */
  repository?: Maybe<Repository>;
  repositoryId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `artifactId` field. */
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Tag` values. */
export type TagConnection = {
  __typename?: 'TagConnection';
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<Maybe<TagEdge>>;
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Tag` edge in the connection. */
export type TagEdge = {
  __typename?: 'TagEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** A filter to be used against `Tag` object types. All fields are combined with a logical ‘and.’ */
export type TagFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `artifact` relation. */
  artifact?: InputMaybe<ArtifactFilter>;
  /** Filter by the object’s `artifactId` field. */
  artifactId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TagFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TagFilter>>;
  /** Filter by the object’s `repository` relation. */
  repository?: InputMaybe<RepositoryFilter>;
  /** Filter by the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Tag` */
export type TagInput = {
  artifactId: Scalars['UUID']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name: Scalars['String']['input'];
  repositoryId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Methods to use when ordering `Tag`. */
export enum TagOrderBy {
  ArtifactIdAsc = 'ARTIFACT_ID_ASC',
  ArtifactIdDesc = 'ARTIFACT_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RepositoryIdAsc = 'REPOSITORY_ID_ASC',
  RepositoryIdDesc = 'REPOSITORY_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

/** All input for the `updateApiTokenById` mutation. */
export type UpdateApiTokenByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ApiToken` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ApiToken` being updated. */
  patch: ApiTokenPatch;
};

/** All input for the `updateApiToken` mutation. */
export type UpdateApiTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ApiToken` being updated. */
  patch: ApiTokenPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `ApiToken` mutation. */
export type UpdateApiTokenPayload = {
  __typename?: 'UpdateApiTokenPayload';
  /** The `ApiToken` that was updated by this mutation. */
  apiToken?: Maybe<ApiToken>;
  /** An edge for our `ApiToken`. May be used by Relay 1. */
  apiTokenEdge?: Maybe<ApiTokenEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ApiToken` mutation. */
export type UpdateApiTokenPayloadApiTokenEdgeArgs = {
  orderBy?: Array<ApiTokenOrderBy>;
};

/** All input for the `updateArtifactById` mutation. */
export type UpdateArtifactByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Artifact` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Artifact` being updated. */
  patch: ArtifactPatch;
};

/** All input for the `updateArtifact` mutation. */
export type UpdateArtifactInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Artifact` being updated. */
  patch: ArtifactPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Artifact` mutation. */
export type UpdateArtifactPayload = {
  __typename?: 'UpdateArtifactPayload';
  /** The `Artifact` that was updated by this mutation. */
  artifact?: Maybe<Artifact>;
  /** An edge for our `Artifact`. May be used by Relay 1. */
  artifactEdge?: Maybe<ArtifactEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Artifact` mutation. */
export type UpdateArtifactPayloadArtifactEdgeArgs = {
  orderBy?: Array<ArtifactOrderBy>;
};

/** All input for the `updateContainerMetadatumById` mutation. */
export type UpdateContainerMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `ContainerMetadatum` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `ContainerMetadatum` being updated. */
  patch: ContainerMetadatumPatch;
};

/** All input for the `updateContainerMetadatum` mutation. */
export type UpdateContainerMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `ContainerMetadatum` being updated. */
  patch: ContainerMetadatumPatch;
};

/** The output of our update `ContainerMetadatum` mutation. */
export type UpdateContainerMetadatumPayload = {
  __typename?: 'UpdateContainerMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `ContainerMetadatum` that was updated by this mutation. */
  containerMetadatum?: Maybe<ContainerMetadatum>;
  /** An edge for our `ContainerMetadatum`. May be used by Relay 1. */
  containerMetadatumEdge?: Maybe<ContainerMetadatumEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ContainerMetadatum` mutation. */
export type UpdateContainerMetadatumPayloadContainerMetadatumEdgeArgs = {
  orderBy?: Array<ContainerMetadatumOrderBy>;
};

/** All input for the `updateNamespaceById` mutation. */
export type UpdateNamespaceByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Namespace` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Namespace` being updated. */
  patch: NamespacePatch;
};

/** All input for the `updateNamespaceByName` mutation. */
export type UpdateNamespaceByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Namespace` being updated. */
  patch: NamespacePatch;
};

/** All input for the `updateNamespace` mutation. */
export type UpdateNamespaceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Namespace` being updated. */
  patch: NamespacePatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Namespace` mutation. */
export type UpdateNamespacePayload = {
  __typename?: 'UpdateNamespacePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Namespace` that was updated by this mutation. */
  namespace?: Maybe<Namespace>;
  /** An edge for our `Namespace`. May be used by Relay 1. */
  namespaceEdge?: Maybe<NamespaceEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Namespace` mutation. */
export type UpdateNamespacePayloadNamespaceEdgeArgs = {
  orderBy?: Array<NamespaceOrderBy>;
};

/** All input for the `updateRepositoryById` mutation. */
export type UpdateRepositoryByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Repository` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Repository` being updated. */
  patch: RepositoryPatch;
};

/** All input for the `updateRepository` mutation. */
export type UpdateRepositoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Repository` being updated. */
  patch: RepositoryPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Repository` mutation. */
export type UpdateRepositoryPayload = {
  __typename?: 'UpdateRepositoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Repository` that was updated by this mutation. */
  repository?: Maybe<Repository>;
  /** An edge for our `Repository`. May be used by Relay 1. */
  repositoryEdge?: Maybe<RepositoryEdge>;
};


/** The output of our update `Repository` mutation. */
export type UpdateRepositoryPayloadRepositoryEdgeArgs = {
  orderBy?: Array<RepositoryOrderBy>;
};

/** All input for the `updateSchemaMetadatumById` mutation. */
export type UpdateSchemaMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SchemaMetadatum` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SchemaMetadatum` being updated. */
  patch: SchemaMetadatumPatch;
};

/** All input for the `updateSchemaMetadatum` mutation. */
export type UpdateSchemaMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `SchemaMetadatum` being updated. */
  patch: SchemaMetadatumPatch;
};

/** The output of our update `SchemaMetadatum` mutation. */
export type UpdateSchemaMetadatumPayload = {
  __typename?: 'UpdateSchemaMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SchemaMetadatum` that was updated by this mutation. */
  schemaMetadatum?: Maybe<SchemaMetadatum>;
  /** An edge for our `SchemaMetadatum`. May be used by Relay 1. */
  schemaMetadatumEdge?: Maybe<SchemaMetadatumEdge>;
};


/** The output of our update `SchemaMetadatum` mutation. */
export type UpdateSchemaMetadatumPayloadSchemaMetadatumEdgeArgs = {
  orderBy?: Array<SchemaMetadatumOrderBy>;
};

/** All input for the `updateTagById` mutation. */
export type UpdateTagByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Tag` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
};

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Tag` being updated. */
  patch: TagPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagEdge>;
};


/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: Array<TagOrderBy>;
};

/** All input for the `updateUploadSessionById` mutation. */
export type UpdateUploadSessionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UploadSession` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `UploadSession` being updated. */
  patch: UploadSessionPatch;
};

/** All input for the `updateUploadSession` mutation. */
export type UpdateUploadSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `UploadSession` being updated. */
  patch: UploadSessionPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `UploadSession` mutation. */
export type UpdateUploadSessionPayload = {
  __typename?: 'UpdateUploadSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UploadSession` that was updated by this mutation. */
  uploadSession?: Maybe<UploadSession>;
  /** An edge for our `UploadSession`. May be used by Relay 1. */
  uploadSessionEdge?: Maybe<UploadSessionEdge>;
};


/** The output of our update `UploadSession` mutation. */
export type UpdateUploadSessionPayloadUploadSessionEdgeArgs = {
  orderBy?: Array<UploadSessionOrderBy>;
};

/** All input for the `updateWasmMetadatumById` mutation. */
export type UpdateWasmMetadatumByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WasmMetadatum` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WasmMetadatum` being updated. */
  patch: WasmMetadatumPatch;
};

/** All input for the `updateWasmMetadatum` mutation. */
export type UpdateWasmMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `WasmMetadatum` being updated. */
  patch: WasmMetadatumPatch;
};

/** The output of our update `WasmMetadatum` mutation. */
export type UpdateWasmMetadatumPayload = {
  __typename?: 'UpdateWasmMetadatumPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `WasmMetadatum` that was updated by this mutation. */
  wasmMetadatum?: Maybe<WasmMetadatum>;
  /** An edge for our `WasmMetadatum`. May be used by Relay 1. */
  wasmMetadatumEdge?: Maybe<WasmMetadatumEdge>;
};


/** The output of our update `WasmMetadatum` mutation. */
export type UpdateWasmMetadatumPayloadWasmMetadatumEdgeArgs = {
  orderBy?: Array<WasmMetadatumOrderBy>;
};

export type UploadSession = Node & {
  __typename?: 'UploadSession';
  createdAt?: Maybe<Scalars['Datetime']['output']>;
  expiresAt: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  offset: Scalars['BigInt']['output'];
  /** Reads a single `Repository` that is related to this `UploadSession`. */
  repository?: Maybe<Repository>;
  repositoryId: Scalars['UUID']['output'];
  rowId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `UploadSession` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UploadSessionCondition = {
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `UploadSession` values. */
export type UploadSessionConnection = {
  __typename?: 'UploadSessionConnection';
  /** A list of edges which contains the `UploadSession` and cursor to aid in pagination. */
  edges: Array<Maybe<UploadSessionEdge>>;
  /** A list of `UploadSession` objects. */
  nodes: Array<Maybe<UploadSession>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UploadSession` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `UploadSession` edge in the connection. */
export type UploadSessionEdge = {
  __typename?: 'UploadSessionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UploadSession` at the end of the edge. */
  node?: Maybe<UploadSession>;
};

/** A filter to be used against `UploadSession` object types. All fields are combined with a logical ‘and.’ */
export type UploadSessionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UploadSessionFilter>>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UploadSessionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UploadSessionFilter>>;
  /** Filter by the object’s `repository` relation. */
  repository?: InputMaybe<RepositoryFilter>;
  /** Filter by the object’s `repositoryId` field. */
  repositoryId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `UploadSession` */
export type UploadSessionInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt: Scalars['Datetime']['input'];
  offset?: InputMaybe<Scalars['BigInt']['input']>;
  repositoryId: Scalars['UUID']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Methods to use when ordering `UploadSession`. */
export enum UploadSessionOrderBy {
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RepositoryIdAsc = 'REPOSITORY_ID_ASC',
  RepositoryIdDesc = 'REPOSITORY_ID_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC'
}

/** Represents an update to a `UploadSession`. Fields that are set will be updated. */
export type UploadSessionPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  offset?: InputMaybe<Scalars['BigInt']['input']>;
  repositoryId?: InputMaybe<Scalars['UUID']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WasmMetadatum = Node & {
  __typename?: 'WasmMetadatum';
  /** Reads a single `Artifact` that is related to this `WasmMetadatum`. */
  artifact?: Maybe<Artifact>;
  artifactId: Scalars['UUID']['output'];
  exports: Scalars['JSON']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  imports: Scalars['JSON']['output'];
  runtime?: Maybe<Scalars['String']['output']>;
};

/**
 * A condition to be used against `WasmMetadatum` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WasmMetadatumCondition = {
  /** Checks for equality with the object’s `artifactId` field. */
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WasmMetadatum` values. */
export type WasmMetadatumConnection = {
  __typename?: 'WasmMetadatumConnection';
  /** A list of edges which contains the `WasmMetadatum` and cursor to aid in pagination. */
  edges: Array<Maybe<WasmMetadatumEdge>>;
  /** A list of `WasmMetadatum` objects. */
  nodes: Array<Maybe<WasmMetadatum>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WasmMetadatum` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `WasmMetadatum` edge in the connection. */
export type WasmMetadatumEdge = {
  __typename?: 'WasmMetadatumEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WasmMetadatum` at the end of the edge. */
  node?: Maybe<WasmMetadatum>;
};

/** A filter to be used against `WasmMetadatum` object types. All fields are combined with a logical ‘and.’ */
export type WasmMetadatumFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<WasmMetadatumFilter>>;
  /** Filter by the object’s `artifact` relation. */
  artifact?: InputMaybe<ArtifactFilter>;
  /** Filter by the object’s `artifactId` field. */
  artifactId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<WasmMetadatumFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<WasmMetadatumFilter>>;
};

/** An input for mutations affecting `WasmMetadatum` */
export type WasmMetadatumInput = {
  artifactId: Scalars['UUID']['input'];
  exports?: InputMaybe<Scalars['JSON']['input']>;
  imports?: InputMaybe<Scalars['JSON']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `WasmMetadatum`. */
export enum WasmMetadatumOrderBy {
  ArtifactIdAsc = 'ARTIFACT_ID_ASC',
  ArtifactIdDesc = 'ARTIFACT_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `WasmMetadatum`. Fields that are set will be updated. */
export type WasmMetadatumPatch = {
  artifactId?: InputMaybe<Scalars['UUID']['input']>;
  exports?: InputMaybe<Scalars['JSON']['input']>;
  imports?: InputMaybe<Scalars['JSON']['input']>;
  runtime?: InputMaybe<Scalars['String']['input']>;
};

export type CreateArtifactMutationVariables = Exact<{
  input: CreateArtifactInput;
}>;


export type CreateArtifactMutation = { __typename?: 'Mutation', createArtifact?: { __typename?: 'CreateArtifactPayload', artifact?: { __typename?: 'Artifact', id: string, rowId: string, repositoryId: string, digest: string, size: string, mediaType: string, createdAt?: string | null } | null } | null };

export type DeleteArtifactMutationVariables = Exact<{
  input: DeleteArtifactInput;
}>;


export type DeleteArtifactMutation = { __typename?: 'Mutation', deleteArtifact?: { __typename?: 'DeleteArtifactPayload', artifact?: { __typename?: 'Artifact', rowId: string, digest: string } | null } | null };

export type CreateNamespaceMutationVariables = Exact<{
  input: CreateNamespaceInput;
}>;


export type CreateNamespaceMutation = { __typename?: 'Mutation', createNamespace?: { __typename?: 'CreateNamespacePayload', namespace?: { __typename?: 'Namespace', id: string, rowId: string, name: string, description?: string | null } | null } | null };

export type UpdateNamespaceMutationVariables = Exact<{
  input: UpdateNamespaceInput;
}>;


export type UpdateNamespaceMutation = { __typename?: 'Mutation', updateNamespace?: { __typename?: 'UpdateNamespacePayload', namespace?: { __typename?: 'Namespace', id: string, rowId: string, name: string, description?: string | null } | null } | null };

export type DeleteNamespaceMutationVariables = Exact<{
  input: DeleteNamespaceInput;
}>;


export type DeleteNamespaceMutation = { __typename?: 'Mutation', deleteNamespace?: { __typename?: 'DeleteNamespacePayload', namespace?: { __typename?: 'Namespace', rowId: string, name: string } | null } | null };

export type CreateRepositoryMutationVariables = Exact<{
  input: CreateRepositoryInput;
}>;


export type CreateRepositoryMutation = { __typename?: 'Mutation', createRepository?: { __typename?: 'CreateRepositoryPayload', repository?: { __typename?: 'Repository', id: string, rowId: string, namespaceId: string, name: string, description?: string | null, artifactType: string, isPublic: boolean } | null } | null };

export type UpdateRepositoryMutationVariables = Exact<{
  input: UpdateRepositoryInput;
}>;


export type UpdateRepositoryMutation = { __typename?: 'Mutation', updateRepository?: { __typename?: 'UpdateRepositoryPayload', repository?: { __typename?: 'Repository', id: string, rowId: string, name: string, description?: string | null, artifactType: string, isPublic: boolean } | null } | null };

export type DeleteRepositoryMutationVariables = Exact<{
  input: DeleteRepositoryInput;
}>;


export type DeleteRepositoryMutation = { __typename?: 'Mutation', deleteRepository?: { __typename?: 'DeleteRepositoryPayload', repository?: { __typename?: 'Repository', rowId: string, name: string } | null } | null };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag?: { __typename?: 'CreateTagPayload', tag?: { __typename?: 'Tag', id: string, rowId: string, repositoryId: string, artifactId: string, name: string, createdAt?: string | null } | null } | null };

export type UpdateTagMutationVariables = Exact<{
  input: UpdateTagInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: { __typename?: 'UpdateTagPayload', tag?: { __typename?: 'Tag', id: string, rowId: string, artifactId: string, name: string, updatedAt?: string | null } | null } | null };

export type DeleteTagMutationVariables = Exact<{
  input: DeleteTagInput;
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag?: { __typename?: 'DeleteTagPayload', tag?: { __typename?: 'Tag', rowId: string, name: string } | null } | null };

export type NamespacesQueryVariables = Exact<{
  condition?: InputMaybe<NamespaceCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type NamespacesQuery = { __typename?: 'Query', namespaces?: { __typename?: 'NamespaceConnection', totalCount: number, nodes: Array<{ __typename?: 'Namespace', id: string, rowId: string, name: string, description?: string | null, createdAt?: string | null, repositories: { __typename?: 'RepositoryConnection', totalCount: number } } | null> } | null };

export type NamespaceQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type NamespaceQuery = { __typename?: 'Query', namespace?: { __typename?: 'Namespace', id: string, rowId: string, name: string, description?: string | null, createdAt?: string | null, updatedAt?: string | null, repositories: { __typename?: 'RepositoryConnection', totalCount: number, nodes: Array<{ __typename?: 'Repository', id: string, rowId: string, name: string, description?: string | null, artifactType: string, isPublic: boolean, createdAt?: string | null, artifacts: { __typename?: 'ArtifactConnection', totalCount: number }, tags: { __typename?: 'TagConnection', totalCount: number } } | null> } } | null };

export type NamespaceByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type NamespaceByNameQuery = { __typename?: 'Query', namespaceByName?: { __typename?: 'Namespace', id: string, rowId: string, name: string, description?: string | null, repositories: { __typename?: 'RepositoryConnection', nodes: Array<{ __typename?: 'Repository', id: string, rowId: string, name: string, artifactType: string, isPublic: boolean } | null> } } | null };

export type RepositoryQueryVariables = Exact<{
  rowId: Scalars['UUID']['input'];
}>;


export type RepositoryQuery = { __typename?: 'Query', repository?: { __typename?: 'Repository', id: string, rowId: string, namespaceId: string, name: string, description?: string | null, artifactType: string, isPublic: boolean, createdAt?: string | null, updatedAt?: string | null, namespace?: { __typename?: 'Namespace', id: string, rowId: string, name: string } | null, artifacts: { __typename?: 'ArtifactConnection', totalCount: number, nodes: Array<{ __typename?: 'Artifact', id: string, rowId: string, digest: string, size: string, mediaType: string, content?: string | null, createdAt?: string | null } | null> }, tags: { __typename?: 'TagConnection', totalCount: number, nodes: Array<{ __typename?: 'Tag', id: string, rowId: string, name: string, artifactId: string, createdAt?: string | null, updatedAt?: string | null, artifact?: { __typename?: 'Artifact', digest: string, size: string } | null } | null> } } | null };

export type RepositoriesByNamespaceQueryVariables = Exact<{
  namespaceId: Scalars['UUID']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RepositoriesByNamespaceQuery = { __typename?: 'Query', repositories?: { __typename?: 'RepositoryConnection', totalCount: number, nodes: Array<{ __typename?: 'Repository', id: string, rowId: string, name: string, description?: string | null, artifactType: string, isPublic: boolean, createdAt?: string | null, artifacts: { __typename?: 'ArtifactConnection', totalCount: number }, tags: { __typename?: 'TagConnection', totalCount: number } } | null> } | null };



export const CreateArtifactDocument = `
    mutation CreateArtifact($input: CreateArtifactInput!) {
  createArtifact(input: $input) {
    artifact {
      id
      rowId
      repositoryId
      digest
      size
      mediaType
      createdAt
    }
  }
}
    `;

export const useCreateArtifactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateArtifactMutation, TError, CreateArtifactMutationVariables, TContext>) => {
    
    return useMutation<CreateArtifactMutation, TError, CreateArtifactMutationVariables, TContext>(
      {
    mutationKey: ['CreateArtifact'],
    mutationFn: (variables?: CreateArtifactMutationVariables) => graphqlFetch<CreateArtifactMutation, CreateArtifactMutationVariables>(CreateArtifactDocument, variables)(),
    ...options
  }
    )};

useCreateArtifactMutation.getKey = () => ['CreateArtifact'];


useCreateArtifactMutation.fetcher = (variables: CreateArtifactMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateArtifactMutation, CreateArtifactMutationVariables>(CreateArtifactDocument, variables, options);

export const DeleteArtifactDocument = `
    mutation DeleteArtifact($input: DeleteArtifactInput!) {
  deleteArtifact(input: $input) {
    artifact {
      rowId
      digest
    }
  }
}
    `;

export const useDeleteArtifactMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteArtifactMutation, TError, DeleteArtifactMutationVariables, TContext>) => {
    
    return useMutation<DeleteArtifactMutation, TError, DeleteArtifactMutationVariables, TContext>(
      {
    mutationKey: ['DeleteArtifact'],
    mutationFn: (variables?: DeleteArtifactMutationVariables) => graphqlFetch<DeleteArtifactMutation, DeleteArtifactMutationVariables>(DeleteArtifactDocument, variables)(),
    ...options
  }
    )};

useDeleteArtifactMutation.getKey = () => ['DeleteArtifact'];


useDeleteArtifactMutation.fetcher = (variables: DeleteArtifactMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteArtifactMutation, DeleteArtifactMutationVariables>(DeleteArtifactDocument, variables, options);

export const CreateNamespaceDocument = `
    mutation CreateNamespace($input: CreateNamespaceInput!) {
  createNamespace(input: $input) {
    namespace {
      id
      rowId
      name
      description
    }
  }
}
    `;

export const useCreateNamespaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateNamespaceMutation, TError, CreateNamespaceMutationVariables, TContext>) => {
    
    return useMutation<CreateNamespaceMutation, TError, CreateNamespaceMutationVariables, TContext>(
      {
    mutationKey: ['CreateNamespace'],
    mutationFn: (variables?: CreateNamespaceMutationVariables) => graphqlFetch<CreateNamespaceMutation, CreateNamespaceMutationVariables>(CreateNamespaceDocument, variables)(),
    ...options
  }
    )};

useCreateNamespaceMutation.getKey = () => ['CreateNamespace'];


useCreateNamespaceMutation.fetcher = (variables: CreateNamespaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateNamespaceMutation, CreateNamespaceMutationVariables>(CreateNamespaceDocument, variables, options);

export const UpdateNamespaceDocument = `
    mutation UpdateNamespace($input: UpdateNamespaceInput!) {
  updateNamespace(input: $input) {
    namespace {
      id
      rowId
      name
      description
    }
  }
}
    `;

export const useUpdateNamespaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateNamespaceMutation, TError, UpdateNamespaceMutationVariables, TContext>) => {
    
    return useMutation<UpdateNamespaceMutation, TError, UpdateNamespaceMutationVariables, TContext>(
      {
    mutationKey: ['UpdateNamespace'],
    mutationFn: (variables?: UpdateNamespaceMutationVariables) => graphqlFetch<UpdateNamespaceMutation, UpdateNamespaceMutationVariables>(UpdateNamespaceDocument, variables)(),
    ...options
  }
    )};

useUpdateNamespaceMutation.getKey = () => ['UpdateNamespace'];


useUpdateNamespaceMutation.fetcher = (variables: UpdateNamespaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateNamespaceMutation, UpdateNamespaceMutationVariables>(UpdateNamespaceDocument, variables, options);

export const DeleteNamespaceDocument = `
    mutation DeleteNamespace($input: DeleteNamespaceInput!) {
  deleteNamespace(input: $input) {
    namespace {
      rowId
      name
    }
  }
}
    `;

export const useDeleteNamespaceMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteNamespaceMutation, TError, DeleteNamespaceMutationVariables, TContext>) => {
    
    return useMutation<DeleteNamespaceMutation, TError, DeleteNamespaceMutationVariables, TContext>(
      {
    mutationKey: ['DeleteNamespace'],
    mutationFn: (variables?: DeleteNamespaceMutationVariables) => graphqlFetch<DeleteNamespaceMutation, DeleteNamespaceMutationVariables>(DeleteNamespaceDocument, variables)(),
    ...options
  }
    )};

useDeleteNamespaceMutation.getKey = () => ['DeleteNamespace'];


useDeleteNamespaceMutation.fetcher = (variables: DeleteNamespaceMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteNamespaceMutation, DeleteNamespaceMutationVariables>(DeleteNamespaceDocument, variables, options);

export const CreateRepositoryDocument = `
    mutation CreateRepository($input: CreateRepositoryInput!) {
  createRepository(input: $input) {
    repository {
      id
      rowId
      namespaceId
      name
      description
      artifactType
      isPublic
    }
  }
}
    `;

export const useCreateRepositoryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateRepositoryMutation, TError, CreateRepositoryMutationVariables, TContext>) => {
    
    return useMutation<CreateRepositoryMutation, TError, CreateRepositoryMutationVariables, TContext>(
      {
    mutationKey: ['CreateRepository'],
    mutationFn: (variables?: CreateRepositoryMutationVariables) => graphqlFetch<CreateRepositoryMutation, CreateRepositoryMutationVariables>(CreateRepositoryDocument, variables)(),
    ...options
  }
    )};

useCreateRepositoryMutation.getKey = () => ['CreateRepository'];


useCreateRepositoryMutation.fetcher = (variables: CreateRepositoryMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateRepositoryMutation, CreateRepositoryMutationVariables>(CreateRepositoryDocument, variables, options);

export const UpdateRepositoryDocument = `
    mutation UpdateRepository($input: UpdateRepositoryInput!) {
  updateRepository(input: $input) {
    repository {
      id
      rowId
      name
      description
      artifactType
      isPublic
    }
  }
}
    `;

export const useUpdateRepositoryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateRepositoryMutation, TError, UpdateRepositoryMutationVariables, TContext>) => {
    
    return useMutation<UpdateRepositoryMutation, TError, UpdateRepositoryMutationVariables, TContext>(
      {
    mutationKey: ['UpdateRepository'],
    mutationFn: (variables?: UpdateRepositoryMutationVariables) => graphqlFetch<UpdateRepositoryMutation, UpdateRepositoryMutationVariables>(UpdateRepositoryDocument, variables)(),
    ...options
  }
    )};

useUpdateRepositoryMutation.getKey = () => ['UpdateRepository'];


useUpdateRepositoryMutation.fetcher = (variables: UpdateRepositoryMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateRepositoryMutation, UpdateRepositoryMutationVariables>(UpdateRepositoryDocument, variables, options);

export const DeleteRepositoryDocument = `
    mutation DeleteRepository($input: DeleteRepositoryInput!) {
  deleteRepository(input: $input) {
    repository {
      rowId
      name
    }
  }
}
    `;

export const useDeleteRepositoryMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteRepositoryMutation, TError, DeleteRepositoryMutationVariables, TContext>) => {
    
    return useMutation<DeleteRepositoryMutation, TError, DeleteRepositoryMutationVariables, TContext>(
      {
    mutationKey: ['DeleteRepository'],
    mutationFn: (variables?: DeleteRepositoryMutationVariables) => graphqlFetch<DeleteRepositoryMutation, DeleteRepositoryMutationVariables>(DeleteRepositoryDocument, variables)(),
    ...options
  }
    )};

useDeleteRepositoryMutation.getKey = () => ['DeleteRepository'];


useDeleteRepositoryMutation.fetcher = (variables: DeleteRepositoryMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteRepositoryMutation, DeleteRepositoryMutationVariables>(DeleteRepositoryDocument, variables, options);

export const CreateTagDocument = `
    mutation CreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    tag {
      id
      rowId
      repositoryId
      artifactId
      name
      createdAt
    }
  }
}
    `;

export const useCreateTagMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTagMutation, TError, CreateTagMutationVariables, TContext>) => {
    
    return useMutation<CreateTagMutation, TError, CreateTagMutationVariables, TContext>(
      {
    mutationKey: ['CreateTag'],
    mutationFn: (variables?: CreateTagMutationVariables) => graphqlFetch<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, variables)(),
    ...options
  }
    )};

useCreateTagMutation.getKey = () => ['CreateTag'];


useCreateTagMutation.fetcher = (variables: CreateTagMutationVariables, options?: RequestInit['headers']) => graphqlFetch<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, variables, options);

export const UpdateTagDocument = `
    mutation UpdateTag($input: UpdateTagInput!) {
  updateTag(input: $input) {
    tag {
      id
      rowId
      artifactId
      name
      updatedAt
    }
  }
}
    `;

export const useUpdateTagMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTagMutation, TError, UpdateTagMutationVariables, TContext>) => {
    
    return useMutation<UpdateTagMutation, TError, UpdateTagMutationVariables, TContext>(
      {
    mutationKey: ['UpdateTag'],
    mutationFn: (variables?: UpdateTagMutationVariables) => graphqlFetch<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, variables)(),
    ...options
  }
    )};

useUpdateTagMutation.getKey = () => ['UpdateTag'];


useUpdateTagMutation.fetcher = (variables: UpdateTagMutationVariables, options?: RequestInit['headers']) => graphqlFetch<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, variables, options);

export const DeleteTagDocument = `
    mutation DeleteTag($input: DeleteTagInput!) {
  deleteTag(input: $input) {
    tag {
      rowId
      name
    }
  }
}
    `;

export const useDeleteTagMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTagMutation, TError, DeleteTagMutationVariables, TContext>) => {
    
    return useMutation<DeleteTagMutation, TError, DeleteTagMutationVariables, TContext>(
      {
    mutationKey: ['DeleteTag'],
    mutationFn: (variables?: DeleteTagMutationVariables) => graphqlFetch<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, variables)(),
    ...options
  }
    )};

useDeleteTagMutation.getKey = () => ['DeleteTag'];


useDeleteTagMutation.fetcher = (variables: DeleteTagMutationVariables, options?: RequestInit['headers']) => graphqlFetch<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, variables, options);

export const NamespacesDocument = `
    query Namespaces($condition: NamespaceCondition, $first: Int, $offset: Int) {
  namespaces(condition: $condition, first: $first, offset: $offset) {
    nodes {
      id
      rowId
      name
      description
      createdAt
      repositories {
        totalCount
      }
    }
    totalCount
  }
}
    `;

export const useNamespacesQuery = <
      TData = NamespacesQuery,
      TError = unknown
    >(
      variables?: NamespacesQueryVariables,
      options?: Omit<UseQueryOptions<NamespacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NamespacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NamespacesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Namespaces'] : ['Namespaces', variables],
    queryFn: graphqlFetch<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, variables),
    ...options
  }
    )};

useNamespacesQuery.getKey = (variables?: NamespacesQueryVariables) => variables === undefined ? ['Namespaces'] : ['Namespaces', variables];

export const useInfiniteNamespacesQuery = <
      TData = InfiniteData<NamespacesQuery>,
      TError = unknown
    >(
      variables: NamespacesQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NamespacesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NamespacesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NamespacesQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? variables === undefined ? ['Namespaces.infinite'] : ['Namespaces.infinite', variables],
      queryFn: (metaData) => graphqlFetch<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNamespacesQuery.getKey = (variables?: NamespacesQueryVariables) => variables === undefined ? ['Namespaces.infinite'] : ['Namespaces.infinite', variables];


useNamespacesQuery.fetcher = (variables?: NamespacesQueryVariables, options?: RequestInit['headers']) => graphqlFetch<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, variables, options);

export const NamespaceDocument = `
    query Namespace($rowId: UUID!) {
  namespace(rowId: $rowId) {
    id
    rowId
    name
    description
    createdAt
    updatedAt
    repositories {
      nodes {
        id
        rowId
        name
        description
        artifactType
        isPublic
        createdAt
        artifacts {
          totalCount
        }
        tags {
          totalCount
        }
      }
      totalCount
    }
  }
}
    `;

export const useNamespaceQuery = <
      TData = NamespaceQuery,
      TError = unknown
    >(
      variables: NamespaceQueryVariables,
      options?: Omit<UseQueryOptions<NamespaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NamespaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NamespaceQuery, TError, TData>(
      {
    queryKey: ['Namespace', variables],
    queryFn: graphqlFetch<NamespaceQuery, NamespaceQueryVariables>(NamespaceDocument, variables),
    ...options
  }
    )};

useNamespaceQuery.getKey = (variables: NamespaceQueryVariables) => ['Namespace', variables];

export const useInfiniteNamespaceQuery = <
      TData = InfiniteData<NamespaceQuery>,
      TError = unknown
    >(
      variables: NamespaceQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NamespaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NamespaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NamespaceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Namespace.infinite', variables],
      queryFn: (metaData) => graphqlFetch<NamespaceQuery, NamespaceQueryVariables>(NamespaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNamespaceQuery.getKey = (variables: NamespaceQueryVariables) => ['Namespace.infinite', variables];


useNamespaceQuery.fetcher = (variables: NamespaceQueryVariables, options?: RequestInit['headers']) => graphqlFetch<NamespaceQuery, NamespaceQueryVariables>(NamespaceDocument, variables, options);

export const NamespaceByNameDocument = `
    query NamespaceByName($name: String!) {
  namespaceByName(name: $name) {
    id
    rowId
    name
    description
    repositories {
      nodes {
        id
        rowId
        name
        artifactType
        isPublic
      }
    }
  }
}
    `;

export const useNamespaceByNameQuery = <
      TData = NamespaceByNameQuery,
      TError = unknown
    >(
      variables: NamespaceByNameQueryVariables,
      options?: Omit<UseQueryOptions<NamespaceByNameQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NamespaceByNameQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NamespaceByNameQuery, TError, TData>(
      {
    queryKey: ['NamespaceByName', variables],
    queryFn: graphqlFetch<NamespaceByNameQuery, NamespaceByNameQueryVariables>(NamespaceByNameDocument, variables),
    ...options
  }
    )};

useNamespaceByNameQuery.getKey = (variables: NamespaceByNameQueryVariables) => ['NamespaceByName', variables];

export const useInfiniteNamespaceByNameQuery = <
      TData = InfiniteData<NamespaceByNameQuery>,
      TError = unknown
    >(
      variables: NamespaceByNameQueryVariables,
      options: Omit<UseInfiniteQueryOptions<NamespaceByNameQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<NamespaceByNameQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<NamespaceByNameQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['NamespaceByName.infinite', variables],
      queryFn: (metaData) => graphqlFetch<NamespaceByNameQuery, NamespaceByNameQueryVariables>(NamespaceByNameDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteNamespaceByNameQuery.getKey = (variables: NamespaceByNameQueryVariables) => ['NamespaceByName.infinite', variables];


useNamespaceByNameQuery.fetcher = (variables: NamespaceByNameQueryVariables, options?: RequestInit['headers']) => graphqlFetch<NamespaceByNameQuery, NamespaceByNameQueryVariables>(NamespaceByNameDocument, variables, options);

export const RepositoryDocument = `
    query Repository($rowId: UUID!) {
  repository(rowId: $rowId) {
    id
    rowId
    namespaceId
    name
    description
    artifactType
    isPublic
    createdAt
    updatedAt
    namespace {
      id
      rowId
      name
    }
    artifacts(orderBy: [PRIMARY_KEY_DESC]) {
      nodes {
        id
        rowId
        digest
        size
        mediaType
        content
        createdAt
      }
      totalCount
    }
    tags {
      nodes {
        id
        rowId
        name
        artifactId
        createdAt
        updatedAt
        artifact {
          digest
          size
        }
      }
      totalCount
    }
  }
}
    `;

export const useRepositoryQuery = <
      TData = RepositoryQuery,
      TError = unknown
    >(
      variables: RepositoryQueryVariables,
      options?: Omit<UseQueryOptions<RepositoryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RepositoryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RepositoryQuery, TError, TData>(
      {
    queryKey: ['Repository', variables],
    queryFn: graphqlFetch<RepositoryQuery, RepositoryQueryVariables>(RepositoryDocument, variables),
    ...options
  }
    )};

useRepositoryQuery.getKey = (variables: RepositoryQueryVariables) => ['Repository', variables];

export const useInfiniteRepositoryQuery = <
      TData = InfiniteData<RepositoryQuery>,
      TError = unknown
    >(
      variables: RepositoryQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RepositoryQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RepositoryQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RepositoryQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['Repository.infinite', variables],
      queryFn: (metaData) => graphqlFetch<RepositoryQuery, RepositoryQueryVariables>(RepositoryDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRepositoryQuery.getKey = (variables: RepositoryQueryVariables) => ['Repository.infinite', variables];


useRepositoryQuery.fetcher = (variables: RepositoryQueryVariables, options?: RequestInit['headers']) => graphqlFetch<RepositoryQuery, RepositoryQueryVariables>(RepositoryDocument, variables, options);

export const RepositoriesByNamespaceDocument = `
    query RepositoriesByNamespace($namespaceId: UUID!, $first: Int, $offset: Int) {
  repositories(
    condition: {namespaceId: $namespaceId}
    first: $first
    offset: $offset
  ) {
    nodes {
      id
      rowId
      name
      description
      artifactType
      isPublic
      createdAt
      artifacts {
        totalCount
      }
      tags {
        totalCount
      }
    }
    totalCount
  }
}
    `;

export const useRepositoriesByNamespaceQuery = <
      TData = RepositoriesByNamespaceQuery,
      TError = unknown
    >(
      variables: RepositoriesByNamespaceQueryVariables,
      options?: Omit<UseQueryOptions<RepositoriesByNamespaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RepositoriesByNamespaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RepositoriesByNamespaceQuery, TError, TData>(
      {
    queryKey: ['RepositoriesByNamespace', variables],
    queryFn: graphqlFetch<RepositoriesByNamespaceQuery, RepositoriesByNamespaceQueryVariables>(RepositoriesByNamespaceDocument, variables),
    ...options
  }
    )};

useRepositoriesByNamespaceQuery.getKey = (variables: RepositoriesByNamespaceQueryVariables) => ['RepositoriesByNamespace', variables];

export const useInfiniteRepositoriesByNamespaceQuery = <
      TData = InfiniteData<RepositoriesByNamespaceQuery>,
      TError = unknown
    >(
      variables: RepositoriesByNamespaceQueryVariables,
      options: Omit<UseInfiniteQueryOptions<RepositoriesByNamespaceQuery, TError, TData>, 'queryKey'> & { queryKey?: UseInfiniteQueryOptions<RepositoriesByNamespaceQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useInfiniteQuery<RepositoriesByNamespaceQuery, TError, TData>(
      (() => {
    const { queryKey: optionsQueryKey, ...restOptions } = options;
    return {
      queryKey: optionsQueryKey ?? ['RepositoriesByNamespace.infinite', variables],
      queryFn: (metaData) => graphqlFetch<RepositoriesByNamespaceQuery, RepositoriesByNamespaceQueryVariables>(RepositoriesByNamespaceDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      ...restOptions
    }
  })()
    )};

useInfiniteRepositoriesByNamespaceQuery.getKey = (variables: RepositoriesByNamespaceQueryVariables) => ['RepositoriesByNamespace.infinite', variables];


useRepositoriesByNamespaceQuery.fetcher = (variables: RepositoriesByNamespaceQueryVariables, options?: RequestInit['headers']) => graphqlFetch<RepositoriesByNamespaceQuery, RepositoriesByNamespaceQueryVariables>(RepositoriesByNamespaceDocument, variables, options);
