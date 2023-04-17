type ExtendMetaContent = Record<
  string,
  undefined | string | URL | number | boolean | null | undefined
>;
type MultiMetaContent =
  | (ExtendMetaContent | string | URL | number)[]
  | null
  | undefined;

type MetaProps = {
  name?: string;
  property?: string;
  media?: string;
  content: (MultiMetaContent | string | number | URL) | null | undefined;
};

export type Props = MetaProps;

export function Meta({ content: _content, name, property, ...props }: Props) {
  if (!name && !property) return null;

  // @ts-ignore
  const contents = Array.isArray(_content) ? _content : [_content];

  const hasContents =
    typeof contents !== "undefined" && contents !== null && contents.length > 0;

  if (!hasContents) return null;

  const elems = contents.map((content, index) => {
    if (!content) return null;

    if (
      typeof content === "string" ||
      typeof content === "number" ||
      content instanceof URL
    ) {
      return (
        <meta
          key={`${name || property}-${index}`}
          {...(name ? { name } : {})}
          {...(property ? { property } : {})}
          {...(props.media ? { media: props.media } : {})}
          content={typeof content === "string" ? content : content.toString()}
        />
      );
    } else {
      return Object.entries(content).map(([k, v], index) => {
        const key = getMetaKey((name || property) as string, k);
        const _thisContent = typeof v === "string" ? v : v?.toString();

        return (
          <meta
            key={`${key}-${k}-${index}`}
            {...(name ? { name: key } : {})}
            {...(property ? { property: key } : {})}
            {...(props.media ? { media: props.media } : {})}
            content={_thisContent}
          />
        );
      });
    }
  });

  return <>{elems}</>;
}

function camelToSnake(camelCaseStr: string) {
  return camelCaseStr.replace(/([A-Z])/g, function (match) {
    return "_" + match.toLowerCase();
  });
}

function getMetaKey(prefix: string, key: string) {
  // Use `twitter:image` and `og:image` instead of `twitter:image:url` and `og:image:url`
  // to be more compatible as it's a more common format
  if ((prefix === "og:image" || prefix === "twitter:image") && key === "url") {
    return prefix;
  }
  if (prefix.startsWith("og:") || prefix.startsWith("twitter:")) {
    key = camelToSnake(key);
  }
  return prefix + ":" + key;
}
