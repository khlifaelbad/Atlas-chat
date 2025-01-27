import { ChatProvider } from "context";
import "semantic-ui-css/semantic.min.css";
import { useAuth, useResolved } from "hooks";
import { Login, Signup, Chat, Home, About } from "components";
import { Switch, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";

export const App = () => {
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* git<Route path="*" component={} /> */}
        </Switch>
      </div>
    </ChatProvider>
  ) : (
    <div className="chats-loading-globle">
      <Loader active size="huge" />
    </div>
  );
};
