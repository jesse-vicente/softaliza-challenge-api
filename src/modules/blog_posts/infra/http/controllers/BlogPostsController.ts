import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListBlogPostsService from '@modules/blog_posts/services/ListBlogPostsService';
import CreateBlogPostService from '@modules/blog_posts/services/CreateBlogPostService';
import UpdateBlogPostService from '@modules/blog_posts/services/UpdateBlogPostService';
import DeleteBlogPostService from '@modules/blog_posts/services/DeleteBlogPostService';
import FindBySlugService from '@modules/blog_posts/services/FindBySlugService';

export default class BlogPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBlogPosts = container.resolve(ListBlogPostsService);

    const blogPosts = await listBlogPosts.execute();

    return response.json(blogPosts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { title, content, slug, status } = request.body;

    const createBlogPost = container.resolve(CreateBlogPostService);

    const blogPost = await createBlogPost.execute({
      title,
      content,
      slug,
      status,
      user_id,
    });

    return response.json(blogPost);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { id } = request.params;
    const { title, content, slug, status } = request.body;

    const updateBlogPost = container.resolve(UpdateBlogPostService);

    const blogPost = await updateBlogPost.execute(id, user_id, {
      title,
      content,
      slug,
      status,
    });

    return response.json(blogPost);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { id } = request.params;

    const deleteBlogPost = container.resolve(DeleteBlogPostService);

    await deleteBlogPost.execute(id, user_id);

    return response.status(200).json({ message: 'Post successfully removed.' });
  }

  public async findBySlug(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { slug } = request.params;

    const findBySlug = container.resolve(FindBySlugService);

    const blogPost = await findBySlug.execute(slug);

    return response.json(blogPost);
  }
}
