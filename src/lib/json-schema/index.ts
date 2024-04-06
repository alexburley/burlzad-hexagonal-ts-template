import { Type as T, TSchema } from '@sinclair/typebox'

export const Nullable = <Type extends TSchema>(schema: Type) =>
  T.Union([schema, T.Null()])
