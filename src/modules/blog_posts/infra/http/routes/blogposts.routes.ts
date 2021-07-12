import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import BlogPostsController from '../controllers/BlogPostsController';

const blogPostsRouter = Router();

const blogPostsController = new BlogPostsController();

blogPostsRouter.use(ensureAuthenticated);

blogPostsRouter.get('/', blogPostsController.index);
blogPostsRouter.get('/:slug', blogPostsController.findBySlug);

blogPostsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
      slug: Joi.string().required(),
      status: Joi.string().required(),
    },
  }),
  blogPostsController.create,
);

blogPostsRouter.patch('/:id', blogPostsController.update);
blogPostsRouter.delete('/:id', blogPostsController.delete);

export default blogPostsRouter;
