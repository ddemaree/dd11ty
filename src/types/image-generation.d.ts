import type { ImageResponse } from "@vercel/og";
import type { APIContext } from "astro";

export type ImageAPIRoute = (ctx: APIContext) => Promise<ImageResponse>;

declare module "react" {
  interface HTMLAttributes<T> {
    /**
     * Specify styles using Tailwind CSS classes. This feature is currently experimental.
     * If `style` prop is also specified, styles generated with `tw` prop will be overridden.
     *
     * Example:
     * - `tw='w-full h-full bg-blue-200'`
     * - `tw='text-9xl'`
     * - `tw='text-[80px]'`
     *
     * @type {string}
     */
    tw?: string;
  }
  interface SVGAttributes<T> {
    /**
     * Specify styles using Tailwind CSS classes. This feature is currently experimental.
     * If `style` prop is also specified, styles generated with `tw` prop will be overridden.
     *
     * Example:
     * - `tw='w-full h-full bg-blue-200'`
     * - `tw='text-9xl'`
     * - `tw='text-[80px]'`
     *
     * @type {string}
     */
    tw?: string;
  }
}

declare module "astro" {
  type APIRoute = (ctx: APIContext) => Promise<Response | void>;
}

export {};
