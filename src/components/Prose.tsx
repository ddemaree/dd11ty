import clsx from "clsx";
import { PropsWithChildren, forwardRef, HTMLProps } from "react";

type ProseAsTag = "div" | "section" | "article" | "main";
type ProseBaseProps = HTMLProps<HTMLDivElement> & {
  as?: ProseAsTag;
};

type ProsePropsWithChildren = PropsWithChildren<ProseBaseProps>;
type ProsePropsSansChildren = ProseBaseProps & { content: string };
type ProseProps = ProsePropsWithChildren | ProsePropsSansChildren;

const Prose = forwardRef<HTMLDivElement, ProseProps>((_props, ref) => {
  const { content, children, as: AsTag = "div", className, ...props } = _props;
  const innerHtml = content ? { __html: content } : undefined;

  return (
    <AsTag
      className={clsx("prose dark:prose-dark", className)}
      dangerouslySetInnerHTML={innerHtml}
      ref={ref}
      {...props}
    >
      {children}
    </AsTag>
  );
});

Prose.displayName = "Prose";

export default Prose;
