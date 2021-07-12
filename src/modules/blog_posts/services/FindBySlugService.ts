import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import BlogPost from '../infra/typeorm/entities/BlogPost';

import IBlogPostsRepository from '../repositories/IBlogPostsRepository';

@injectable()
class FindBySlugService {
  constructor(
    @inject('BlogPostsRepository')
    private blogPostsRepository: IBlogPostsRepository,
  ) {}

  public async execute(slug: string): Promise<BlogPost> {
    const blogPost = await this.blogPostsRepository.findBySlug(slug);

    if (!blogPost) {
      throw new AppError('No posts were found.');
    }

    return classToClass(blogPost);
  }
}

export default FindBySlugService;
