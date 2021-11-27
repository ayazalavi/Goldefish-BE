import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { parse } from 'path/posix';

@ValidatorConstraint({ name: 'DateValidator', async: false })
export class DateValidator implements ValidatorConstraintInterface {
    validate(date: string, args: ValidationArguments) {
      let parseddate = new Date(date);
     // console.log(parseddate.getTime(), parseddate.getTime().toString() !== 'NaN', parseddate.getTime() < (new Date()).getTime())
      return parseddate.getTime().toString() !== 'NaN' && parseddate.getTime() < (new Date()).getTime(); 
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Invalid date';
  }
}