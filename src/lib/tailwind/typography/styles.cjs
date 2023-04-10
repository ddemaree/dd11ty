module.exports = (theme) => {
  const modifiers = {
    light: {
      css: {
        "--prose-headings-color": "var(--prose-strong-color)",
        "--prose-strong-color": theme("colors.black"),
        "--prose-base-color": theme("colors.neutral.800"),
        "--prose-quotes-color": theme("colors.neutral.600"),
        "--prose-captions-color": theme("colors.neutral.500"),
        "--prose-dividers-color": theme("colors.neutral.300"),
        "--prose-quotes-border-color": theme("colors.neutral.200"),
        "--prose-links-color": theme("colors.red.500"),
        "--prose-code-color": theme("colors.blue.500"),
      },
    },
    dark: {
      css: {
        "--prose-headings-color": "var(--prose-strong-color)",
        "--prose-strong-color": theme("colors.white"),
        "--prose-base-color": theme("colors.neutral.300"),
        "--prose-quotes-color": theme("colors.neutral.400"),
        "--prose-captions-color": theme("colors.neutral.400"),
        "--prose-dividers-color": theme("colors.neutral.700"),
        "--prose-quotes-border-color": theme("colors.neutral.800"),
        "--prose-links-color": theme("colors.red.500"),
        "--prose-code-color": theme("colors.blue.500"),
      },
    },
  };

  return {
    ...modifiers,
    "no-grid": {
      css: {
        display: "block",
      },
    },
    simplified: {
      css: {
        gridTemplateColumns:
          "[full-start wide-start content-start] 1fr [content-end wide-end full-end]",
      },
    },
    DEFAULT: {
      css: [
        modifiers.light.css,
        {
          // Nesting this with a & wraps the root level .prose class in a :where()
          "--dd-layout-padding-block": "1.5rem",
          "--dd-layout-padding-inline": "clamp(1rem, 5.5vw, 2.5rem)",
          "--prose-grid-inset": "minmax(var(--dd-layout-padding-inline), 4rem)",
          color: "var(--prose-base-color)",
          display: "grid",
          fontSize: "var(--prose-base-font-size)",
          fontFamily: "var(--prose-base-font-family)",
          lineHeight: "calc(1em + 1ex)",
          gridAutoFlow: "row",
          gridTemplateColumns:
            "[full-start] 1fr [wide-start] var(--prose-grid-inset) [content-start] min( calc(100% - (var(--dd-layout-padding-inline) * 2)), var(--width-content) ) [content-end] var(--prose-grid-inset) [wide-end] 1fr [full-end]",
          justifyItems: "start",
          rowGap: "var(--prose-flow-spacing-normal)",

          "& > :is(*, p)": {
            gridColumn: "content",
          },

          "& > :is(.alignwide, .size-large)": {
            gridColumn: "wide",
          },

          "& > .alignfull": {
            gridColumn: "full",
          },

          "& .wp-block-embed, .dd-embed": {
            justifySelf: "center",
          },

          /* 
          === SPACING ===
          */

          // EXPERIMENTAL - use grid also for spacing
          "> *": {
            margin: "unset",

            "& + *:is(figure, video, img, picture, hr)": {
              marginBlockStart:
                "calc(var(--prose-flow-spacing-normal) * 0.875)",

              "&:has(+ :not(figure, video, img, picture, hr))": {
                marginBlockEnd:
                  "calc(var(--prose-flow-spacing-normal) * 0.875)",
              },
            },
          },

          "> *:not(figure, hr) + :is(h1, h2, h3, h4, h5, h6)": {
            marginBlockStart: "var(--prose-flow-spacing-big)",
          },

          "> :is(h1, h2, h3, h4, h5, h6):has(+ :not(figure, hr))": {
            marginBlockEnd:
              "calc((-1 * var(--prose-flow-spacing-normal)) + 0.625rem)",
          },

          "blockquote * + *": {
            marginBlockStart: "var(--prose-flow-spacing-normal)",
          },

          "blockquote > cite": {
            display: "block",
            fontSize: "0.75em",
            fontStyle: "normal",
            fontWeight: "normal",
            marginBlockStart: "1em",
            textAlign: "right",

            "&:before": {
              content: '"— "',
            },

            a: {
              color: "inherit",
              textDecoration: "none",
            },
          },

          hr: {
            width: "100%",
            borderTop: "1px solid currentColor",
          },

          ":where(img, iframe)": {
            margin: "unset",
            width: "100%",
            height: "auto",
            maxWidth: "max-content",
          },

          a: {
            color: "var(--prose-links-color)",
            textDecoration: "underline",
            fontWeight: "var(--prose-links-font-weight, 500)",
            textUnderlineOffset: "0.15em",
            textDecorationThickness: "1px",
          },

          ":where(b, strong)": {
            fontWeight: "var(--prose-strong-font-weight, 600)",
          },

          ":not(a, blockquote, thead th, figcaption) :is(b, strong)": {
            color: "var(--prose-strong-color)",
          },

          ":is(h1, h2, h3, h4, h5, h6)": {
            fontFamily: "var(--prose-headings-font-family)",
            color: "var(--prose-headings-color)",
            fontWeight: "var(--prose-headings-font-weight, 600)",
            letterSpacing: "-0.01ch",
            lineHeight: 1.1,
          },

          h1: { fontSize: "2em" },
          h2: { fontSize: "1.75em" },
          h3: { fontSize: "1.5em" },

          ":is(ol, ul):not(.wp-block-social-links)": {
            paddingInlineStart: "var(--prose-indent)",

            ":is(ol, ul)": {
              marginBlock: "var(--prose-flow-spacing-xs) 0",
            },

            "& > li": {
              paddingInlineStart: "var(--prose-indent-nested)",
              marginBlock: "var(--prose-flow-spacing-xs)",
            },
          },

          "> :is(ol, ul) > li p": {
            marginBlock: "0.75em",
          },

          ol: {
            listStyleType: "decimal",

            "> li::marker": {
              fontFamily: "var(--prose-lists-marker-font-family)",
              fontWeight: 600,
              fontSize: "0.875em",
            },
          },

          ul: {
            listStyleType: "disc",
          },

          hr: {
            borderColor: "currentColor",
            borderTopWidth: "2px",
            color: "var(--prose-dividers-color)",
            maxWidth: "calc(var(--w-content) * 0.7)",
            justifySelf: "center",
            width: "100%",
          },

          blockquote: {
            borderInlineStartColor: "var(--prose-quotes-border-color)",
            borderInlineStartStyle: "solid",
            borderInlineStartWidth: "var(--prose-quotes-border-width)",
            color: "var(--prose-quotes-color)",
            fontFamily: "var(--prose-quotes-font-family)",
            paddingInlineStart:
              "calc(var(--prose-indent) - var(--prose-quotes-border-width) - 0.5rem)",
            paddingInlineEnd: "var(--prose-indent)",
            marginInlineStart: "0.5rem",

            "b, strong": {
              color: "inherit",
            },
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
            color: "var(--prose-captions-color)",
            fontFamily: "var(--prose-captions-font-family)",
            fontSize: "0.875em",
            lineHeight: 1.375,
            marginBlockStart: "1em",
            marginBlockEnd: 0,
            maxWidth: "60ch",
            textAlign: "center",
            paddingInline: "var(--dd-layout-padding-inline)",

            "*": {
              color: "inherit",
            },
          },

          "pre, code": {
            fontFamily: "var(--prose-code-font-family)",
          },

          "*:not(a, blockquote, thead th, figcaption) > code": {
            color: "var(--prose-code-color)",
          },

          "*:not(pre) code": {
            fontWeight: "var(--prose-inline-code-font-weight, 400)",
          },

          pre: {
            color: "var(--prose-code-color)",
            fontFamily: "var(--prose-code-font-family)",
            fontWeight: 400,
            overflowX: "auto",
            width: "100%",
            maxWidth: "100%",

            code: {
              backgroundColor: "transparent",
              color: "inherit",
              fontWeight: "inherit",
              fontSize: "inherit",
              width: "max-content",
              borderRadius: "0.5em",
              padding: "0.25em 0.5em",
            },
          },

          // Top level code blocks
          "> pre:not([class~='language']) > code": {
            // backgroundColor: `var(--prose-code-background-color, ${theme(
            //   "colors.neutral.100"
            // )})`,
            display: "block",
            fontSize: "0.875em",
            // padding: "1em",
            // borderRadius: theme("borderRadius.md"),
          },

          "> pre[class~='language'] > code": {
            padding: "0.5em",
            fontSize: "0.875em",
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

          // Custom tweet markup
          ".dd-embed-tweet": {
            backgroundColor: "var(--tweets-background-color)",
            borderColor: `var(--tweets-border-color, currentColor)`,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: `var(--tweets-border-radius, ${
              theme("borderRadius.md") || "0.5em"
            })`,
            color: "var(--tweets-content-color)",
            columnGap: `var(--tweets-column-gap, 1rem)`,
            display: "grid",
            fontFamily: `var(--tweets-font-family, ${
              theme("fontFamily.sans") || "system-ui"
            })`,
            gridAutoFlow: "row",
            gridTemplateColumns: `var(--tweets-img-size, ${theme(
              "spacing.16"
            )} 1fr)`,
            gridTemplateRows: `var(--tweets-img-size, auto 1fr)`,
            maxWidth: "var(--tweets-max-width, 580px)",
            lineHeight: 1.4,
            padding: "var(--tweets-padding, 1em)",
            rowGap: `var(--tweets-row-gap, 1rem)`,

            "*": {
              margin: "unset",
            },

            "> * ": {
              gridColumn: "2 / -1",
              width: "100%",
            },

            "& .tweet-header, & .tweet-header a": {
              display: "contents",
            },

            ".tweet-header": {
              lineHeight: 1.2,
            },

            ".tweet-author-img": {
              clipPath: "url(#squircleClip)",
              alignSelf: "start",
              gridColumn: "1/2",
              gridRow: "1/-1",
              height: `var(--tweets-img-size, ${theme("spacing.16")})`,
              width: `var(--tweets-img-size, ${theme("spacing.16")})`,
            },

            ".tweet-author-handle": {
              color: "var(--tweets-handle-color)",
              fontSize: "0.8em",
              marginBlockStart: "0.125em",
            },

            ".tweet-author-name": {
              color: "var(--tweets-name-color)",
              fontWeight: 600,
            },

            ".tweet-content": {
              color: "var(--tweets-content-color)",

              a: {
                color: "var(--tweets-links-color, inherit)",
              },
            },

            ".tweet-footer": {
              color: "var(--tweets-footer-color)",
              fontSize: "var(--tweets-footer-font-size, 0.75em)",
              marginBlockStart: theme("spacing.4"),
              opacity: "0.6",
            },

            ".tweet-date": {
              color: "var(--tweets-date-color)",
              textDecoration: "none",
              textTransform: "uppercase",
            },
          },
        },
      ],
    },
  };
};
