import clsx, { ClassValue } from "clsx";
import { HTMLAttributes, FunctionComponentFactory } from "react";

type LayoutTagName = "div" | "section" | "article" | "main" | "header";

type FancyTagProps = HTMLAttributes<HTMLElement> & {
  as?: LayoutTagName;
  className?: ClassValue;
};

type StackProps = FancyTagProps & {
  direction?: "row" | "column";
  gap?: number | string;
  noGap?: boolean;
};

export const Stack: FunctionComponentFactory<StackProps> = (_props = {}) => {
  let {
    as = "div",
    className: _className,
    direction = "row",
    gap = 2,
    children,
    ...props
  } = _props;

  // Gap can be a CSS variable, calc function, or a unit
  if (typeof gap === "string") {
    if (
      gap.startsWith("--") ||
      gap.includes("calc(") ||
      gap.includes("min(") ||
      gap.includes("max(") ||
      gap.match(/ex|em|rem|px|vw|vh|cqw|cqh/)
    ) {
      gap = `[${gap}]`;
    }
  }

  const classValue = clsx(
    "flex items-center justify-center",
    direction === "row" ? "flex-row" : "flex-col",
    (gap && (`gap-${gap}` as ClassValue)) || "gap-2",
    _className
  );

  const Tag = as;

  return (
    <Tag className={classValue} {...props}>
      {children}
    </Tag>
  );
};

function createFancyTag(
  displayName: string,
  defaultClassValue: ClassValue,
  defaultAsTag: LayoutTagName = "div"
) {
  const _comp = ({
    children,
    className,
    as: AsTag = defaultAsTag,
    ...props
  }: FancyTagProps) => (
    <AsTag className={clsx(defaultClassValue, className)} {...props}>
      {children}
    </AsTag>
  );
  _comp.displayName = displayName;
  return _comp;
}

export const Header = createFancyTag(
  "Header",
  "flex flex-col items-center text-center py-8 desc:w-full desc:max-w-content",
  "header"
);

export const HStack = createFancyTag(
  "HStack",
  "flex flex-row gap-2 items-center"
);
export const VStack = createFancyTag(
  "VStack",
  "flex flex-col gap-2 items-center"
);
