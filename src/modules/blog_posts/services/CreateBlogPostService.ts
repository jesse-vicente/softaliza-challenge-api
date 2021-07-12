import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateBlogPostDTO from '../dtos/ICreateBlogPostDTO';

import BlogPost from '../infra/typeorm/entities/BlogPost';
import IBlogPostsRepository from '../repositories/IBlogPostsRepository';

@injectable()
class CreateBlogPostService {
  constructor(
    @inject('BlogPostsRepository')
    private blogPostsRepository: IBlogPostsRepository,
  ) {}

  public async execute({
    title,
    content,
    slug,
    status,
    user_id,
  }: ICreateBlogPostDTO): Promise<BlogPost> {
    // Verifica se o status informado é válido
    if (!['draft', 'published'].includes(status)) {
      throw new AppError('Invalid post status.');
    }

    const blogPostWithSlug = await this.blogPostsRepository.findBySlug(slug);

    // Verifica se o slug já está sendo utilizado
    if (blogPostWithSlug) {
      throw new AppError('A post with this is slug already exists.');
    }

    const blogPost = await this.blogPostsRepository.create({
      title,
      content,
      slug,
      status,
      user_id,
    });

    return blogPost;
  }
}

export default CreateBlogPostService;
