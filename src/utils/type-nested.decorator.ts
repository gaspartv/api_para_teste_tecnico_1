import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested, ValidationOptions } from 'class-validator';

export function TypeNested(
  typeFunction: any,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    Type(() => typeFunction),
    ValidateNested(validationOptions),
    IsObject(),
  );
}
