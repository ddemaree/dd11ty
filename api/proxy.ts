export const config = {
  runtime: "edge", // this is a pre-requisite
  // regions: ["iad1"], // only execute this function on iad1
};

const BASE_URL = "https://davids-trendy-site-662663.webflow.io/";

export default async (req: Request) => {
  const url = new URL(req.url);

  let path = "/";
  if (url.searchParams.has("path")) {
    path = `/${url.searchParams.get("path")}`;
  }

  const wfUrl = new URL(path, BASE_URL);

  console.log(wfUrl.toString());

  const wfResponse = await fetch(wfUrl.toString());

  if (wfResponse.status < 400) {
    let html = await wfResponse.text();

    html = html.replaceAll(/href=\"\/([^"]+)"/g, 'href="/wf/$1"');

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } else {
    console.log(wfResponse.statusText);
  }

  return new Response(`Hello, from ${req.url} I'm now an Edge Function!`);
};
