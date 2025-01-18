import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/instrument/create/")({
  loader: () => {
    return { crumb: "Creation", title: "New instrument" };
  },
});
