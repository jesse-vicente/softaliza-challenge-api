import { container } from 'tsyringe';

import '@modules/users/providers';

import IBlogPostsRepository from '@modules/blog_posts/repositories/IBlogPostsRepository';
import BlogPostsRepository from '@modules/blog_posts/infra/typeorm/repositories/BlogPostsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IBlogPostsRepository>(
  'BlogPostsRepository',
  BlogPostsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
