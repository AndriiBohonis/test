import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './todo-status.enum';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findByStatus(status: TodoStatus): Promise<Todo[]> {
    return this.todoRepository.find({ where: { status: status } });
  }

  async create(todo: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async updateStatus(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { status } = updateTodoDto;
    const options: FindOneOptions<Todo> = {
      where: { id },
      order: { id: 'ASC' },
    };
    const todo = await this.todoRepository.findOne(options);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.status = status;
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
