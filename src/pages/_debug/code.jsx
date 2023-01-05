import shiki from "shiki";
import Highlight, { defaultProps } from "prism-react-renderer";

export default function CodeTestPage({ html, codeSample }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Highlight {...defaultProps} code={codeSample} language="jsx">
        {(highlight) => <pre>CODE</pre>}
      </Highlight>
    </div>
  );
}

export async function getServerSideProps() {
  const highlighter = await shiki.getHighlighter({ theme: "nord" });

  const codeSample = `export default function SamplePage({ greeting = "Hello!" }) {
    return (
      <div>{greeting}</div>
    )
  }`;

  const html = highlighter.codeToHtml(codeSample, { lang: "jsx" });

  return {
    props: {
      html,
      codeSample,
    },
  };
}
