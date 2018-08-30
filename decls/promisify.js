declare module 'es6-promisify' {
  declare function exports<TArg0, TResult>(
    fn : (
      arg0: TArg0,
      cb: (err: ?Error, res: TResult) => void
    ) => void
  ): (arg0: TArg0) => Promise<TResult>

  declare function exports<TArg0, TArg1, TResult>(
    fn : (
      arg0: TArg0,
      arg1: TArg1,
      cb: (err: ?Error, res: TResult) => void
    ) => void
  ): (arg0: TArg0, arg1: TArg1) => Promise<TResult>
}
