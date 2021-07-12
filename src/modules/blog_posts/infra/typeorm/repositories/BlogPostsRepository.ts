import { getRepository, Repository } from 'typeorm';

import IBlogPostsRepository from '@modules/blog_posts/repositories/IBlogPostsRepository';
import ICreateBlogPostDTO from '@modules/blog_posts/dtos/ICreateBlogPostDTO';
import IUpdateBlogPostDTO from '@modules/blog_posts/dtos/IUpdateBlogPostDTO';

import BlogPost from '../entities/BlogPost';

class BlogPostsRepository implements IBlogPostsRepository {
  private ormRepository: Repository<BlogPost>;

  constructor() {
    this.ormRepository = getRepository(BlogPost);
  }

  public async create({
    title,
    content,
    slug,
    status,
    user_id,
  }: ICreateBlogPostDTO): Promise<BlogPost> {
    const blogPost = this.ormRepository.create({
      title,
      content,
      slug,
      status,
      user_id,
    });

    await this.ormRepository.save(blogPost);

    return blogPost;
  }

  public async update(
    id: string,
    { title, content, slug, status }: IUpdateBlogPostDTO,
  ): Promise<BlogPost> {
    const updatedBlogPost = await this.ormRepository.save({
      id,
      title,
      content,
      slug,
      status,
    });

    return updatedBlogPost;
  }

  public async delete(id: string): Promise<number | null | undefined> {
    const { affected } = await this.ormRepository.delete(id);

    return affected;
  }

  public async findById(id: string): Promise<BlogPost | undefined> {
    const blogPost = await this.ormRepository.findOne(id);

    return blogPost;
  }

  public async findBySlug(slug: string): Promise<BlogPost | undefined> {
    const blogPost = await this.ormRepository.findOne({
      where: `slug ILIKE '${slug}%' AND status = 'published'`,
    });

    return blogPost;
  }

  public async findAll(): Promise<BlogPost[]> {
    const blogPosts = this.ormRepository.find({
      where: {
        status: 'published',
      },
    });

    return blogPosts;
  }
}

export default BlogPostsRepository;
