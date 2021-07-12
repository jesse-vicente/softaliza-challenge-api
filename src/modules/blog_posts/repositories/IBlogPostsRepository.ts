import BlogPost from '../infra/typeorm/entities/BlogPost';

import ICreateBlogPostDTO from '../dtos/ICreateBlogPostDTO';
import IUpdateBlogPostDTO from '../dtos/IUpdateBlogPostDTO';

export default interface IBlogPostsRepository {
  create(data: ICreateBlogPostDTO): Promise<BlogPost>;

  update(id: string, data: IUpdateBlogPostDTO): Promise<BlogPost>;

  delete(id: string): Promise<number | null | undefined>;

  findAll(): Promise<BlogPost[]>;

  findById(id: string): Promise<BlogPost | undefined>;

  findBySlug(slug: string): Promise<BlogPost | undefined>;
}
