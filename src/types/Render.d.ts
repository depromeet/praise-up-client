import 'matter-js';

declare module 'matter-js' {
  export interface Mouse {
    mousedown(e?: Event): void;
    mouseup(e?: Event): void;
    mousemove(e?: Event): void;
    mousewheel(e?: Event): void;
  }
  export interface IBodyRenderOptions {
    text?: { content: string; color?: string; size?: number; family?: string };
  }
}
