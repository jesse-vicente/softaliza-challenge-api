import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBlogPostsRepository from '../repositories/IBlogPostsRepository';
import IUpdateBlogPostDTO from '../dtos/IUpdateBlogPostDTO';

import BlogPost from '../infra/typeorm/entities/BlogPost';

@injectable()
class UpdateBlogPostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BlogPostsRepository')
    private blogPostsRepository: IBlogPostsRepository,
  ) {}

  public async execute(
    id: string,
    user_id: string,
    { title, content, slug, status }: IUpdateBlogPostDTO,
  ): Promise<BlogPost> {
    const user = await this.usersRepository.findById(user_id);
    const blogPost = await this.blogPostsRepository.findById(id);

    if (!user) {
      throw new AppError('Only authenticated users can edit posts.');
    }

    if (!blogPost) {
      throw new AppError('Post not found.');
    }

    if (user.id !== blogPost.user_id) {
      throw new AppError('You can only edit your own posts.', 403);
    }

    const updatedBlogPost = await this.blogPostsRepository.update(id, {
      title,
      slug,
      content,
      status,
    });

    return updatedBlogPost;
  }
}

export default UpdateBlogPostService;
