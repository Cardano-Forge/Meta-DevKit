import { cn } from "~/lib/utils";

import { Label } from "./ui/label";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const TypographyVariants = {
  h1: "font-extrabold sm:text-[5rem] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  h2: "font-bold tracking-tight text-xl sm:text-2xl md:text-3xl first:mt-0",
  h3: "text-3xl font-bold tracking-tight text-lg sm:text-xl md:text-2xl",
  h4: "font-bold tracking-tight text-base sm:text-lg md:text-xl",
  h5: "text-base font-semibold tracking-tight",
  h6: "text-base font-medium tracking-tight",
  p: "text-base leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
  inlineCode:
    "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  regularText: "text-base",
  largeText: "text-lg font-semibold",
  smallText: "text-sm font-medium leading-none",
  mutedText: "text-sm text-muted-foreground",
};

type VariantPropType = keyof typeof TypographyVariants;

const variantElementMap: Record<NonNullable<VariantPropType>, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  blockquote: "blockquote",
  inlineCode: "code",
  largeText: "div",
  regularText: "div",
  smallText: "small",
  mutedText: "p",
  ul: "ul",
};

export type TypographyProps = {
  asChild?: boolean;
  as?: VariantPropType;
} & React.HTMLAttributes<HTMLElement>;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as = "p", asChild, ...props }, ref) => {
    const Component = asChild ? Slot : (as ?? "div");

    const componentProps = {
      className: cn(
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        TypographyVariants[as],
        className,
      ),
      ref,
      ...props,
    };

    return React.createElement(Component, componentProps);
  },
);
Typography.displayName = "Typography";
