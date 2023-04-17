declare module "colorthief" {
  export type RGBColor = [number, number, number];
  export default class ColorThief {
    static getColor(imageUrl: string): number[] | PromiseLike<number[]>;
    // getColor: (img: HTMLImageElement | null, quality: number = 10) => RGBColor;
    // getPalette: (
    //   img: HTMLImageElement | null,
    //   colorCount: number = 10,
    //   quality: number = 10
    // ) => RGBColor[];
  }
}
