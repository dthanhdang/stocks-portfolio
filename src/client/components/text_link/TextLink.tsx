import type { LinkComponent } from "@tanstack/react-router";

import { twMerge } from "tailwind-merge";

import { CreatedLinkComponent } from "./CreatedLinkComponent.jsx";
import { MantineLinkComponent } from "./MantineLinkComponent.jsx";

// eslint-disable-next-line react/function-component-definition
export const TextLink: LinkComponent<typeof MantineLinkComponent> = ({
  className,
  ...props
}) => {
  return (
    <CreatedLinkComponent
      {...props}
      className={twMerge("underline", className)}
    />
  );
};
