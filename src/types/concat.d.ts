declare module 'concat' {
  function concat(files: string[]): Promise<string>;
  export = concat;
}
