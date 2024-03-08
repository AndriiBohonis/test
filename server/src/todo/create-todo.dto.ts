import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from './todo-status.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  status: TodoStatus;

  @ApiProperty({
    title: 'your todo',
  })
  @IsNotEmpty()
  @IsString()
  todo: string;
}
