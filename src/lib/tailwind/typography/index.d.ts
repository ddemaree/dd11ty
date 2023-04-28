declare function plugin(options?: Partial<{ className: string }>): {
  handler: () => void;
};

declare namespace plugin {
  const __isOptionsFunction: true;
}

export = plugin;
