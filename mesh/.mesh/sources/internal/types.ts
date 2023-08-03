// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace InternalTypes {
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
};

export type Query = {
  books?: Maybe<Array<Maybe<Book>>>;
};

export type Subscription = {
  commentAdded?: Maybe<Comment>;
};

export type Mutation = {
  addComment?: Maybe<Comment>;
};


export type MutationaddCommentArgs = {
  bookId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};

export type Book = {
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
};

export type Comment = {
  id: Scalars['ID']['output'];
  content?: Maybe<Scalars['String']['output']>;
};

  export type QuerySdk = {
      /** undefined **/
  books: InContextSdkMethod<Query['books'], {}, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  addComment: InContextSdkMethod<Mutation['addComment'], MutationaddCommentArgs, MeshContext>
  };

  export type SubscriptionSdk = {
      /** undefined **/
  commentAdded: InContextSdkMethod<Subscription['commentAdded'], {}, MeshContext>
  };

  export type Context = {
      ["internal"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
