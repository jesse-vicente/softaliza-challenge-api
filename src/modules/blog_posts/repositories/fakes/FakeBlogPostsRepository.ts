import { uuid } from 'uuidv4';

import IBlogPostsRepository from '@modules/blog_posts/repositories/IBlogPostsRepository';
import ICreateBlogPostDTO from '@modules/blog_posts/dtos/ICreateBlogPostDTO';
import IUpdateBlogPostDTO from '@modules/blog_posts/dtos/IUpdateBlogPostDTO';

import BlogPost from '../../infra/typeorm/entities/BlogPost';

class BlogPostsRepository implements IBlogPostsRepository {
  private blogPosts: BlogPost[] = [];

  public async create({
    title,
    content,
    slug,
    status,
    user_id,
  }: ICreateBlogPostDTO): Promise<BlogPost> {
    const blogPost = new BlogPost();

    Object.assign(blogPost, {
      id: uuid(),
      title,
      content,
      slug,
      status,
      user_id,
    });

    this.blogPosts.push(blogPost);

    return blogPost;
  }

  public async update(
    id: string,
    { title, content, slug, status }: IUpdateBlogPostDTO,
  ): Promise<BlogPost> {
    const blogPostIndex = this.blogPosts.findIndex(
      blogPost => blogPost.id === id,
    );

    const blogPost = new BlogPost();

    Object.assign(blogPost, {
      title,
      content,
      slug,
      status,
    });

    this.blogPosts[blogPostIndex] = blogPost;

    return blogPost;
  }

  public async delete(id: string): Promise<number | null | undefined> {
    const blogPostIndex = this.blogPosts.findIndex(
      blogPost => blogPost.id === id,
    );

    if (!blogPostIndex) return null;

    this.blogPosts.splice(blogPostIndex, 1);

    return 1;
  }

  public async findBySlug(slug: string): Promise<BlogPost | undefined> {
    const findBlogPost = this.blogPosts.find(
      post => post.slug === slug && post.status === 'published',
    );

    return findBlogPost;
  }

  public async findById(id: string): Promise<BlogPost | undefined> {
    const findBlogPost = this.blogPosts.find(
      post => post.id === id && post.status === 'published',
    );

    return findBlogPost;
  }

  public async findAll(): Promise<BlogPost[]> {
    const blogPosts = this.blogPosts.filter(
      post => post.status === 'published',
    );

    return blogPosts;
  }
}

export default BlogPostsRepository;
