/** @format */

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
    "dd-theme": {
      css: {
        color: `rgb(var(--dd-col-text))`,

        a: {
          color: `rgb(var(--dd-col-link))`,
        },

        ":not(a, blockquote, thead th, figcaption) :is(b, strong)": {
          color: `rgb(var(--dd-col-bold-text))`,
        },

        ":is(h1, h2, h3, h4, h5, h6)": {
          color: `rgb(var(--dd-col-bold-text))`,
        },

        hr: {
          borderColor: "currentColor",
          color: `rgb(var(--dd-col-dividers))`,
        },

        blockquote: {
          borderInlineStartColor: `rgb(var(--dd-col-blockquote) / 0.3)`,
          color: `rgb(var(--dd-col-blockquote))`,
        },

        figcaption: {
          color: `rgb(var(--dd-col-light-text))`,
        },

        "*:not(a, blockquote, thead th, figcaption) > code": {
          color: `rgb(var(--dd-col-code))`,
        },

        pre: {
          color: `rgb(var(--dd-col-code))`,
        },
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
        modifiers["dd-theme"].css,
        {
          // Nesting this with a & wraps the root level .prose class in a :where()
          "--dd-layout-padding-block": "1.5rem",
          "--dd-layout-padding-inline": "clamp(1rem, 5.5vw, 2.5rem)",
          "--prose-grid-inset": "minmax(var(--dd-layout-padding-inline), 4rem)",
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
            textDecoration: "underline",
            textUnderlineOffset: "0.15em",
            textDecorationThickness: "1px",
          },

          ":where(b, strong)": {
            fontWeight: "var(--prose-strong-font-weight, 600)",
          },

          ":is(h1, h2, h3, h4, h5, h6)": {
            fontFamily: "var(--prose-headings-font-family)",
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
            borderTopWidth: "2px",
            maxWidth: "calc(var(--w-content) * 0.7)",
            justifySelf: "center",
            width: "100%",
          },

          blockquote: {
            borderInlineStartStyle: "solid",
            borderInlineStartWidth: "var(--prose-quotes-border-width)",
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

            figcaption: {
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
          },

          "pre, code": {
            fontFamily: "var(--prose-code-font-family)",
          },

          "*:not(pre) code": {
            fontWeight: "var(--prose-inline-code-font-weight, 400)",
          },

          pre: {
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
            display: "block",
            fontSize: "0.875em",
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
        },
      ],
    },
  };
};
