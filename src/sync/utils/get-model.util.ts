import { model } from 'mongoose';

export function getModel<T>(modelName: string) {
  return model<T>(modelName);
}
