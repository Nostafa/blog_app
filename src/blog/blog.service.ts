import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindOperator, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(Blog) private repo: Repository<Blog>) {}

  async create(blog: CreateBlogDto): Promise<Blog> {
    const post = this.repo.create(blog);
    return this.repo.save(post);
  }

  async findAll(): Promise<Blog[]> {
    return this.repo.find();
  }

  async findById(id: number | FindOperator<number>): Promise<Blog | undefined> {
    const entinty = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!entinty) {
      throw new HttpException('Not Found', HttpStatus.BAD_REQUEST);
    }
    return entinty;
  }

  async update(id: number, attrs: Partial<Blog>): Promise<Blog> {
    const post = await this.findById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    Object.assign(post, attrs);
    return this.repo.save(post);
  }

  async remove(id: number): Promise<Blog> {
    const post = await this.findById(id);
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return this.repo.remove(post);
  }
}
