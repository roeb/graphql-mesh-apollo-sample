# `connectionParams` for Subscriptions are not resolved 

Reproduction for the follwing issue in graphql-mesh: https://github.com/Urigo/graphql-mesh/issues/5774


## Reproduction Steps

1. `yarn install`

2. `yarn build`

3. `yarn start`

The Apollo Server is available on port 3500, the GraphQL Mesh on port 4000 and the react app on port 5000.

> ⚠️ Yoga GraphiQL doesn't work with subscription. It throws **Must provide query string**. Any other graphql client like Banana Cake Pop oder Apollo Studio works fine.

4. Once the GraphQL Mesh and Apollo Server are started, the React App must be started in a new terminal.

`yarn start:react'

5. Add the following Header to your Requests

```json
{
  "Authorization": "TOKEN",
  "Tenant":"TENANT"
}
````

> After execeute the queries/mutation or subscription, you can find a console.log output with the available headers (header values).

6. Execute Query

```graphql
query {
    books {
        id
        title
        author
    }
}
```

7. Execute Subscription

```graphql
subscription {
  commentAdded {
    id
    content
  }
}
```

> You will see that here the correct header values are not passed like e.g. with query or mutation.

8. The react app subscribes directly to the GraphQL mesh via websocket at startup. The subscription goes through to the Apollo server, but the connection parameters passed by the client do not follow. GraphQL Mesh does not resolve them correctly