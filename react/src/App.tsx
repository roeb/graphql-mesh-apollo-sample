import "./App.css";
import { gql, useSubscription } from "@apollo/client";

const SUBSCRIBE_COMMENTS = gql`
  subscription {
    commentAdded {
      id
      content
    }
  }
`;

function App() {
  useSubscription(SUBSCRIBE_COMMENTS, {
    onError: (err) => console.log("error", err),
  });

  return (
    <>
      SUBSCRIPTION TEST CLIENT
    </>
  );
}

export default App;
