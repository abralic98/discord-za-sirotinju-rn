import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Long: { input: any; output: any; }
};

export type BanUserInput = {
  reason: Scalars['String']['input'];
  serverId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type BannedUser = {
  __typename?: 'BannedUser';
  banAuthor: User;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateUpdated?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
  user: User;
};

export type CreateDmInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inboxId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  type: MessageType;
};

export type CreateMessageInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  roomId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  type: MessageType;
};

export type CreateRoomInput = {
  name: Scalars['String']['input'];
  serverId: Scalars['ID']['input'];
  type: RoomType;
};

export type CreateServerInput = {
  name: Scalars['String']['input'];
  publicServer: Scalars['Boolean']['input'];
};

export type CreateSessionInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  author?: Maybe<User>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateUpdated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  inbox?: Maybe<Inbox>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MessageType>;
};

export type DirectMessagePage = {
  __typename?: 'DirectMessagePage';
  content: Array<DirectMessage>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

/**
 * ###################################
 * ## DIRECT MESSAGES
 */
export type Inbox = {
  __typename?: 'Inbox';
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateUpdated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  messages?: Maybe<Array<Maybe<DirectMessage>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type JoinServerInput = {
  id: Scalars['ID']['input'];
  invitationLink?: InputMaybe<Scalars['String']['input']>;
};

export type KickUserInput = {
  serverId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Message = {
  __typename?: 'Message';
  author?: Maybe<User>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateUpdated?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<MessageType>;
};

export type MessagePage = {
  __typename?: 'MessagePage';
  content: Array<Message>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum MessageType {
  Attachment = 'ATTACHMENT',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUserToInbox?: Maybe<Inbox>;
  banUserFromServer?: Maybe<Scalars['Boolean']['output']>;
  createDirectMessage?: Maybe<DirectMessage>;
  createInbox?: Maybe<Inbox>;
  createMessage?: Maybe<Message>;
  createRoom?: Maybe<Room>;
  createServer?: Maybe<Server>;
  createSession?: Maybe<UserWithToken>;
  createUser?: Maybe<User>;
  deactivateUser?: Maybe<User>;
  deleteServer?: Maybe<Scalars['Boolean']['output']>;
  generateInviteLink?: Maybe<Scalars['String']['output']>;
  joinServer?: Maybe<Server>;
  joinServerWithInvite?: Maybe<Server>;
  kickUserFromServer?: Maybe<Scalars['Boolean']['output']>;
  removeMeFromInbox?: Maybe<Scalars['Boolean']['output']>;
  unbanUserFromServer?: Maybe<Scalars['Boolean']['output']>;
  updateServer?: Maybe<Server>;
  updateUser?: Maybe<User>;
  updateUserPassword?: Maybe<User>;
};


export type MutationAddUserToInboxArgs = {
  inboxId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationBanUserFromServerArgs = {
  input?: InputMaybe<BanUserInput>;
};


export type MutationCreateDirectMessageArgs = {
  message?: InputMaybe<CreateDmInput>;
};


export type MutationCreateInboxArgs = {
  withUserId: Scalars['ID']['input'];
};


export type MutationCreateMessageArgs = {
  message?: InputMaybe<CreateMessageInput>;
};


export type MutationCreateRoomArgs = {
  room?: InputMaybe<CreateRoomInput>;
};


export type MutationCreateServerArgs = {
  server?: InputMaybe<CreateServerInput>;
};


export type MutationCreateSessionArgs = {
  credentials?: InputMaybe<CreateSessionInput>;
};


export type MutationCreateUserArgs = {
  user?: InputMaybe<CreateUserInput>;
};


export type MutationDeactivateUserArgs = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteServerArgs = {
  serverId: Scalars['ID']['input'];
};


export type MutationGenerateInviteLinkArgs = {
  serverId: Scalars['ID']['input'];
};


export type MutationJoinServerArgs = {
  input?: InputMaybe<JoinServerInput>;
};


export type MutationJoinServerWithInviteArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationKickUserFromServerArgs = {
  input?: InputMaybe<KickUserInput>;
};


export type MutationRemoveMeFromInboxArgs = {
  inboxId: Scalars['ID']['input'];
};


export type MutationUnbanUserFromServerArgs = {
  input?: InputMaybe<UnbanUserInput>;
};


export type MutationUpdateServerArgs = {
  server?: InputMaybe<UpdateServerInput>;
};


export type MutationUpdateUserArgs = {
  user?: InputMaybe<UpdateUserInput>;
};


export type MutationUpdateUserPasswordArgs = {
  credentials?: InputMaybe<UpdateUserPasswordInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllServers: ServerPage;
  getAllUserServers?: Maybe<Array<Maybe<Server>>>;
  getAllUsers: UserPage;
  getBannedUsersByServerId?: Maybe<Array<Maybe<BannedUser>>>;
  getDirectMessagesByInboxId: DirectMessagePage;
  getInboxById?: Maybe<Inbox>;
  getMessagesByRoomId: MessagePage;
  getMyInbox?: Maybe<Array<Maybe<Inbox>>>;
  getRoomById?: Maybe<Room>;
  getRoomsByServerId?: Maybe<Rooms>;
  getServerById?: Maybe<Server>;
  getServerByInvite?: Maybe<Server>;
  getUserById?: Maybe<User>;
  meQuery?: Maybe<User>;
};


export type QueryGetAllServersArgs = {
  page: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  size: Scalars['Int']['input'];
};


export type QueryGetAllUsersArgs = {
  page: Scalars['Int']['input'];
  search: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};


export type QueryGetBannedUsersByServerIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDirectMessagesByInboxIdArgs = {
  id: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  size: Scalars['Int']['input'];
};


export type QueryGetInboxByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetMessagesByRoomIdArgs = {
  id: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  size: Scalars['Int']['input'];
};


export type QueryGetRoomByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRoomsByServerIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetServerByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetServerByInviteArgs = {
  token: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Room = {
  __typename?: 'Room';
  createdBy?: Maybe<User>;
  id: Scalars['ID']['output'];
  maxLimit?: Maybe<Scalars['Int']['output']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name: Scalars['String']['output'];
  server?: Maybe<Server>;
  type?: Maybe<RoomType>;
};

export enum RoomType {
  Text = 'TEXT',
  Voice = 'VOICE'
}

export type Rooms = {
  __typename?: 'Rooms';
  text?: Maybe<Array<Maybe<Room>>>;
  voice?: Maybe<Array<Maybe<Room>>>;
};

/**
 * #####################################
 * ### SERVERS & ROOMS #################
 */
export type Server = {
  __typename?: 'Server';
  banner?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  joinedUsers?: Maybe<Array<Maybe<User>>>;
  name?: Maybe<Scalars['String']['output']>;
  publicServer?: Maybe<Scalars['Boolean']['output']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
  serverImg?: Maybe<Scalars['String']['output']>;
};

export type ServerPage = {
  __typename?: 'ServerPage';
  content: Array<Server>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeToMessagesByInboxId?: Maybe<DirectMessage>;
  subscribeToMessagesByRoomId?: Maybe<Message>;
};


export type SubscriptionSubscribeToMessagesByInboxIdArgs = {
  inboxId: Scalars['ID']['input'];
};


export type SubscriptionSubscribeToMessagesByRoomIdArgs = {
  roomId: Scalars['ID']['input'];
};

export type UnbanUserInput = {
  serverId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateServerInput = {
  banner?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  publicServer?: InputMaybe<Scalars['Boolean']['input']>;
  serverImg?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['Long']['input']>;
  userPresence?: InputMaybe<UserPresenceType>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserPasswordInput = {
  confirmNewPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

/**  USERS ############################## */
export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  phoneNumber?: Maybe<Scalars['Long']['output']>;
  userPresence?: Maybe<UserPresenceType>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserPage = {
  __typename?: 'UserPage';
  content: Array<User>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum UserPresenceType {
  Away = 'AWAY',
  Busy = 'BUSY',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateSessionMutationVariables = Exact<{
  credentials: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession?: { __typename?: 'UserWithToken', token?: string | null, user?: { __typename?: 'User', id?: string | null, username?: string | null, email?: string | null, avatar?: string | null, userPresence?: UserPresenceType | null, dateCreated?: string | null } | null } | null };

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  user?: InputMaybe<UpdateUserInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  credentials?: InputMaybe<UpdateUserPasswordInput>;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword?: { __typename?: 'User', id?: string | null } | null };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', meQuery?: { __typename?: 'User', id?: string | null, username?: string | null, description?: string | null, email?: string | null, dateCreated?: string | null, avatar?: string | null, phoneNumber?: any | null, userPresence?: UserPresenceType | null } | null };

export type GetAllUserServersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserServersQuery = { __typename?: 'Query', getAllUserServers?: Array<{ __typename?: 'Server', id?: string | null, name?: string | null, serverImg?: string | null } | null> | null };

export type GetRoomsByServerIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetRoomsByServerIdQuery = { __typename?: 'Query', getRoomsByServerId?: { __typename?: 'Rooms', text?: Array<{ __typename?: 'Room', id: string, name: string, maxLimit?: number | null } | null> | null, voice?: Array<{ __typename?: 'Room', id: string, name: string, maxLimit?: number | null } | null> | null } | null };

export type CreateRoomMutationVariables = Exact<{
  room?: InputMaybe<CreateRoomInput>;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'Room', id: string } | null };

export type GetMessagesByRoomIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMessagesByRoomIdQuery = { __typename?: 'Query', getMessagesByRoomId: { __typename?: 'MessagePage', totalPages: number, totalElements: number, number: number, size: number, content: Array<{ __typename?: 'Message', id?: string | null, text?: string | null, type?: MessageType | null, dateCreated?: string | null, imageUrl?: string | null, author?: { __typename?: 'User', id?: string | null, avatar?: string | null, username?: string | null } | null }> } };

export type GetAllServersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllServersQuery = { __typename?: 'Query', getAllServers: { __typename?: 'ServerPage', totalPages: number, totalElements: number, number: number, size: number, content: Array<{ __typename?: 'Server', id?: string | null, name?: string | null, description?: string | null, banner?: string | null, serverImg?: string | null, joinedUsers?: Array<{ __typename?: 'User', id?: string | null, userPresence?: UserPresenceType | null } | null> | null }> } };

export type JoinServerMutationVariables = Exact<{
  input?: InputMaybe<JoinServerInput>;
}>;


export type JoinServerMutation = { __typename?: 'Mutation', joinServer?: { __typename?: 'Server', id?: string | null, serverImg?: string | null, name?: string | null } | null };



export const CreateSessionDocument = `
    mutation CreateSession($credentials: CreateSessionInput!) {
  createSession(credentials: $credentials) {
    token
    user {
      id
      username
      email
      avatar
      userPresence
      dateCreated
    }
  }
}
    `;

export const useCreateSessionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateSessionMutation, TError, CreateSessionMutationVariables, TContext>(
      ['CreateSession'],
      (variables?: CreateSessionMutationVariables) => fetcher<CreateSessionMutation, CreateSessionMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateSessionDocument, variables)(),
      options
    )};

export const CreateUserDocument = `
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;

export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateUserDocument, variables)(),
      options
    )};

export const UpdateUserDocument = `
    mutation UpdateUser($user: UpdateUserInput) {
  updateUser(user: $user) {
    id
  }
}
    `;

export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserDocument, variables)(),
      options
    )};

export const UpdateUserPasswordDocument = `
    mutation UpdateUserPassword($credentials: UpdateUserPasswordInput) {
  updateUserPassword(credentials: $credentials) {
    id
  }
}
    `;

export const useUpdateUserPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserPasswordMutation, TError, UpdateUserPasswordMutationVariables, TContext>
    ) => {
    
    return useMutation<UpdateUserPasswordMutation, TError, UpdateUserPasswordMutationVariables, TContext>(
      ['UpdateUserPassword'],
      (variables?: UpdateUserPasswordMutationVariables) => fetcher<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserPasswordDocument, variables)(),
      options
    )};

export const MeQueryDocument = `
    query meQuery {
  meQuery {
    id
    username
    description
    email
    dateCreated
    avatar
    phoneNumber
    userPresence
  }
}
    `;

export const useMeQueryQuery = <
      TData = MeQueryQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: MeQueryQueryVariables,
      options?: UseQueryOptions<MeQueryQuery, TError, TData>
    ) => {
    
    return useQuery<MeQueryQuery, TError, TData>(
      variables === undefined ? ['meQuery'] : ['meQuery', variables],
      fetcher<MeQueryQuery, MeQueryQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, MeQueryDocument, variables),
      options
    )};

export const GetAllUserServersDocument = `
    query getAllUserServers {
  getAllUserServers {
    id
    name
    serverImg
  }
}
    `;

export const useGetAllUserServersQuery = <
      TData = GetAllUserServersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetAllUserServersQueryVariables,
      options?: UseQueryOptions<GetAllUserServersQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllUserServersQuery, TError, TData>(
      variables === undefined ? ['getAllUserServers'] : ['getAllUserServers', variables],
      fetcher<GetAllUserServersQuery, GetAllUserServersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllUserServersDocument, variables),
      options
    )};

export const GetRoomsByServerIdDocument = `
    query getRoomsByServerId($id: ID!) {
  getRoomsByServerId(id: $id) {
    text {
      id
      name
      maxLimit
    }
    voice {
      id
      name
      maxLimit
    }
  }
}
    `;

export const useGetRoomsByServerIdQuery = <
      TData = GetRoomsByServerIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetRoomsByServerIdQueryVariables,
      options?: UseQueryOptions<GetRoomsByServerIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetRoomsByServerIdQuery, TError, TData>(
      ['getRoomsByServerId', variables],
      fetcher<GetRoomsByServerIdQuery, GetRoomsByServerIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetRoomsByServerIdDocument, variables),
      options
    )};

export const CreateRoomDocument = `
    mutation createRoom($room: CreateRoomInput) {
  createRoom(room: $room) {
    id
  }
}
    `;

export const useCreateRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>
    ) => {
    
    return useMutation<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>(
      ['createRoom'],
      (variables?: CreateRoomMutationVariables) => fetcher<CreateRoomMutation, CreateRoomMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateRoomDocument, variables)(),
      options
    )};

export const GetMessagesByRoomIdDocument = `
    query getMessagesByRoomId($id: ID!, $page: Int!, $size: Int!, $search: String) {
  getMessagesByRoomId(id: $id, page: $page, size: $size, search: $search) {
    totalPages
    totalElements
    number
    size
    content {
      id
      text
      author {
        id
        avatar
        username
      }
      type
      dateCreated
      imageUrl
    }
  }
}
    `;

export const useGetMessagesByRoomIdQuery = <
      TData = GetMessagesByRoomIdQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetMessagesByRoomIdQueryVariables,
      options?: UseQueryOptions<GetMessagesByRoomIdQuery, TError, TData>
    ) => {
    
    return useQuery<GetMessagesByRoomIdQuery, TError, TData>(
      ['getMessagesByRoomId', variables],
      fetcher<GetMessagesByRoomIdQuery, GetMessagesByRoomIdQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetMessagesByRoomIdDocument, variables),
      options
    )};

export const GetAllServersDocument = `
    query getAllServers($page: Int!, $size: Int!, $search: String) {
  getAllServers(page: $page, size: $size, search: $search) {
    totalPages
    totalElements
    number
    size
    content {
      id
      name
      description
      banner
      serverImg
      joinedUsers {
        id
        userPresence
      }
    }
  }
}
    `;

export const useGetAllServersQuery = <
      TData = GetAllServersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: GetAllServersQueryVariables,
      options?: UseQueryOptions<GetAllServersQuery, TError, TData>
    ) => {
    
    return useQuery<GetAllServersQuery, TError, TData>(
      ['getAllServers', variables],
      fetcher<GetAllServersQuery, GetAllServersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetAllServersDocument, variables),
      options
    )};

export const JoinServerDocument = `
    mutation joinServer($input: JoinServerInput) {
  joinServer(input: $input) {
    id
    serverImg
    name
  }
}
    `;

export const useJoinServerMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<JoinServerMutation, TError, JoinServerMutationVariables, TContext>
    ) => {
    
    return useMutation<JoinServerMutation, TError, JoinServerMutationVariables, TContext>(
      ['joinServer'],
      (variables?: JoinServerMutationVariables) => fetcher<JoinServerMutation, JoinServerMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, JoinServerDocument, variables)(),
      options
    )};
