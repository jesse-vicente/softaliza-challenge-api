import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';
import BlogPost from '../infra/typeorm/entities/BlogPost';

import IBlogPostsRepository from '../repositories/IBlogPostsRepository';

@injectable()
class ListBlogPostsService {
  constructor(
    @inject('BlogPostsRepository')
    private blogPostsRepository: IBlogPostsRepository,
  ) {}

  public async execute(): Promise<BlogPost[]> {
    const blogPosts = await this.blogPostsRepository.findAll();

    return classToClass(blogPosts);
  }
}

export default ListBlogPostsService;
