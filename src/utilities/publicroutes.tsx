import React from "react";
import { Route } from "react-router-dom";


export default (props:any) => {
  const { component: CustomComponent, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      component={(props:any) => {
        return <CustomComponent {...props} auth={auth} />;
      }}
    />
  );
};
