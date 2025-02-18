import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  constructor(
    enumType: T,
    private allowUndefined = true,
  ) {
    super(enumType);
  }

  override async transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (this.allowUndefined && value === undefined) {
      return value;
    }

    return super.transform(value, metadata);
  }
}
