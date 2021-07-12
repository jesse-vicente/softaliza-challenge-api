import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IBlogPostsRepository from '../repositories/IBlogPostsRepository';

@injectable()
class DeleteBlogPostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BlogPostsRepository')
    private blogPostsRepository: IBlogPostsRepository,
  ) {}

  public async execute(
    id: string,
    user_id: string,
  ): Promise<number | null | undefined> {
    const user = await this.usersRepository.findById(user_id);
    const blogPost = await this.blogPostsRepository.findById(id);

    if (!user) {
      throw new AppError('Only authenticated users can delete posts.');
    }

    if (!blogPost) {
      throw new AppError('Post not found.');
    }

    if (user.id !== blogPost.user_id) {
      throw new AppError('You can only delete your own posts.', 403);
    }

    const affected = await this.blogPostsRepository.delete(id);

    if (!affected) {
      throw new AppError('Post could not be deleted.');
    }

    return affected;
  }
}

export default DeleteBlogPostService;
