import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../todo-status.enum';

export class UpdateTodoDto {
  @ApiProperty({})
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
