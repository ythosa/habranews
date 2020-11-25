import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraintInterface,
} from 'class-validator';

// export class IsValidTags implements ValidatorConstraintInterface {
//     private tagService: ParserServiceImpl;

//     constructor(
//         @Inject('PARSER_PACKAGE') private client: ClientGrpc,
//     ) {}

//     onModuleInit() {
//         this.tagService = this.client.getService<ParserServiceImpl>(
//             'ParserService',
//         );
//     }

//     async validate(value: string[]): Promise<boolean> {
//         const validTags = this.tagService.getAllTags()

//         return value.every((t) => {
//             return validTags.includes(t);
//         });
//     }

//     defaultMessage(args: ValidationArguments) {
//         return `Invalid tags passed`;
//     }
// }
