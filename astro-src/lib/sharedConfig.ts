/* 
This file exists as a workaround for Astro's bizarre structure.
Attempting to import my site's `astro.config` causes some build issues,
and some properties in there need to be accessible for e.g. URL generation
or Markdown rendering.
*/
import { remarkEmbeds } from "./remarkEmbed";
import { remarkReadingTime } from "./remarkReadingTime";

export const remarkPlugins = [remarkEmbeds, remarkReadingTime];

export const shikiConfig = {
  theme: "css-variables",
  wrap: true,
};

export const markdown = {
  shikiConfig,
  remarkPlugins,
};

// TODO: Make this configurable w/ an env var
export const site = "https://demaree.me/";
