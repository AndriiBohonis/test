import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoFilter, TodoStatus } from './todo-status.enum';
import { CreateTodoDto } from './create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':status')
  async findByStatus(
    @Param('status') status: TodoFilter & TodoStatus,
  ): Promise<Todo[]> {
    if (status === 'all') {
      return this.todoService.findAll();
    } else {
      return this.todoService.findByStatus(status);
    }
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateStatus(+id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.todoService.delete(+id);
    return { message: 'Todo deleted successfully' };
  }
}
