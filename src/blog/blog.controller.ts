import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './blog.entity';
import { UpdateBlogDto } from './dto/update-blog';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  //************************************************************************************************************************************ */

  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({
    status: 201,
    description: 'Create a new blog',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @Post()
  async createBlog(@Body() body: CreateBlogDto): Promise<Blog> {
    const post = await this.blogService.create(body);
    return post;
  }
  //************************************************************************************************************************************ */

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'All Data list',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Post1',
          },
          content: {
            type: 'string',
            example: 'this is a post description',
          },
          author: {
            type: 'string',
            example: 'Mustafa',
          },
        },
      },
    },
  })
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }
  //************************************************************************************************************************************ */

  @Get(':id')
  @ApiOperation({ summary: 'Get podt by Id post' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Get podt by Id post',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogService.findById(id);
  }
  //************************************************************************************************************************************ */

  @Put(':id')
  @ApiOperation({ summary: 'update post' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() atter: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.update(id, atter);
  }
  //************************************************************************************************************************************ */

  @Delete(':id')
  @ApiOperation({ summary: 'delete post' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted successfully',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Post1',
        },
        content: {
          type: 'string',
          example: 'this is a post description',
        },
        author: {
          type: 'string',
          example: 'Mustafa',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  delete(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogService.remove(id);
  }
}
