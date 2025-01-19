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

      <nav className="flex flex-row space-x-6 bg-blue-400 p-8 text-white">
        <Link to="/">Home</Link>
        <Link to="/instrument">Instruments List</Link>
      </nav>
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}
