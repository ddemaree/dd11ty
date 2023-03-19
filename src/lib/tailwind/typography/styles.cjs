module.exports = (theme) => ({
  DEFAULT: {
    css: [
      {
        "--dd-layout-padding-block": "1.5rem",
        "--dd-layout-padding-inline": "clamp(1rem, 5.5vw, 2.5rem)",
        "--prose-text-size": "clamp(17px, 2.5vw, 20px)",
        "--prose-indent": "1.5em",
        "--prose-flow-spacing-xs": "calc(var(--prose-text-size) * 0.375)",
        "--prose-flow-spacing-sm": "calc(var(--prose-text-size) * 0.75)",
        "--prose-flow-spacing-normal": "calc(var(--prose-text-size) * 1.5)",
        "--prose-flow-spacing-big": "calc(var(--prose-text-size) * 3)",
        "--prose-grid-inset": "minmax(var(--dd-layout-padding-inline), 7rem)",
        display: "grid",
        fontSize: "var(--prose-text-size)",
        lineHeight: 1.6,
        gridAutoFlow: "row",
        gridTemplateColumns:
          "[full-start] 1fr [wide-start] var(--prose-grid-inset) [content-start] min( calc(100% - (var(--dd-layout-padding-inline) * 2)), var(--width-content) ) [content-end] var(--prose-grid-inset) [wide-end] 1fr [full-end]",
        justifyItems: "start",
        // paddingBlockStart: "var(--prose-flow-spacing-normal)",

        "& > :is(*, p)": {
          gridColumn: "content",
        },

        "& > :is(.alignwide, .size-large)": {
          gridColumn: "wide",
        },

        "& > .alignfull": {
          gridColumn: "full",
        },

        ".wp-block-embed, .dd-embed": {
          justifySelf: "center",
        },

        ":where(* + *), :where(blockquote * + *)": {
          marginBlockStart: "var(--prose-flow-spacing-normal)",
        },

        '> * + :where(figure, video, img, picture, hr, pre[class*="language-"]), > :where(figure, video, img, picture, hr, pre[class*="language-"]) + *':
          {
            marginBlockStart: "var(--prose-flow-spacing-big)",
          },

        ":where(img, iframe)": {
          margin: "unset",
          width: "100%",
          height: "auto",
          maxWidth: "100%",
        },

        a: {
          color: "var(--color-text-active)",
          textDecoration: "underline",
          fontWeight: 500,
          textUnderlineOffset: "0.15em",
          textDecorationThickness: "1px",
        },

        ":where(b, strong)": {
          fontWeight: 600,
        },

        ":not(a, blockquote, thead th, figcaption) :where(b, strong)": {
          color: "var(--color-text-high-emphasis)",
        },

        ":where(h1, h2, h3, h4, h5, h6)": {
          fontFamily: "var(--font-sans)",
          color: "var(--color-text-high-emphasis)",
          fontWeight: 600,
          letterSpacing: "-0.01ch",
          lineHeight: 1.1,
        },

        ":where(* + :where(h1, h2, h3, h4, h5, h6))": {
          marginBlockStart: "var(--prose-flow-spacing-big)",
        },

        h1: { fontSize: "2em" },
        h2: { fontSize: "1.75em" },
        h3: { fontSize: "1.5em" },

        ":is(ol, ul)": {
          paddingInlineStart: "var(--prose-indent)",

          ":is(ol, ul)": {
            marginBlock: "var(--prose-flow-spacing-xs) 0",
          },

          "& > li": {
            paddingInlineStart: "0.375em",
            marginBlock: "var(--prose-flow-spacing-xs)",
          },
        },

        "> :is(ol, ul) > li p": {
          marginBlock: "0.75em",
        },

        ol: {
          listStyleType: "decimal",

          "> li::marker": {
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "0.875em",
          },
        },

        ul: {
          listStyleType: "disc",
        },

        hr: {
          borderColor: "var(--color-hairline)",
          borderTopWidth: "1px",
          "+ *": {
            marginBlockStart: 0,
          },
        },

        blockquote: {
          "--prose-quote-border-width": "0.20rem",
          borderInlineStartColor: "var(--color-hairline)",
          borderInlineStartStyle: "solid",
          borderInlineStartWidth: "var(--prose-quote-border-width)",
          color: "var(--color-text-low-emphasis)",
          fontFamily: "var(--font-sans)",
          paddingInlineStart:
            "calc(var(--prose-indent) - var(--prose-quote-border-width) - 0.5rem)",
          paddingInlineEnd: "var(--prose-indent)",
          marginInlineStart: "0.5rem",
        },

        figure: {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",

          "> *": { margin: 0 },

          'iframe[src*="youtube.com"], iframe[src*="cloudinary.com"]': {
            aspectRatio: "16 / 9",
            height: "auto",
            width: "100%",
          },
        },

        figcaption: {
          color: "var(--color-text-low-emphasis)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.875em",
          lineHeight: 1.375,
          marginBlockStart: "1em",
          marginBlockEnd: 0,
          maxWidth: "60ch",
          textAlign: "center",
          paddingInline: "var(--dd-layout-padding-inline)",
        },

        "pre, code": {
          fontFamily: "var(--font-mono)",
        },

        "*:not(a, blockquote, thead th, figcaption) code": {
          color: "var(--color-text-code)",
        },

        "*:not(pre) code": {
          fontWeight: 500,
        },

        pre: {
          color: "var(--color-text-code)",
          fontFamily: "var(--font-mono)",
          fontWeight: 400,
          overflowX: "auto",

          code: {
            backgroundColor: "transparent",
            color: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
          },
        },

        // WP specific hacks

        ".wp-block-embed__wrapper": {
          display: "contents",
        },

        'figure[class*="gallery"]': {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "var(--prose-flow-spacing-sm)",
          alignItems: "unset",

          "figure:has(img)": {
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            margin: "unset",
            width: "calc(50% - (var(--prose-flow-spacing-sm) / 2))",

            img: {
              flex: "1 0 0%",
              height: "100%",
              objectFit: "cover",
              width: "100%",
            },
          },
        },
      },
    ],
  },
});
