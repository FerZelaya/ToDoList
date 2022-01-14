import React from "react";
import { Route, Redirect } from "react-router-dom";

export default (props: any) => {
  const { component: CustomComponent, auth, ...rest } = props;

  
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return auth.isLogged ? (
          <CustomComponent {...props} auth={auth} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};
