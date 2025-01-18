import { QueryClient } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import * as React from "react";
import { TanStackRouterDevtools } from "stocks-portfolio/client/tanstack/dev_tools/router";

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent(): React.JSX.Element {
  return (
    <>
      <TanStackRouterDevtools />

      <div className="bg-blue-400 p-5 text-white underline">
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
