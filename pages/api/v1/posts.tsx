import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {sessionOptions} from 'lib/session';
import {withIronSessionApiRoute} from 'iron-session/next';
import {AppDataSource} from '../../../src/data-source';
import {emptyValidate} from '../../../lib/helper';

const Posts: NextApiHandler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'application/json');
  if (req.method === 'POST') {
    const {title, content} = req.body;
    // TODO
    const [hasError, errors] = emptyValidate({title, content});
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = req.session?.user;
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    if (!AppDataSource.isInitialized) await AppDataSource.initialize();
    const postRepository = AppDataSource.getRepository('Post');
    // @ts-ignore
    post.author = user;
    const p = await postRepository.save(post);
    res.json(p);
  }
};
export default withIronSessionApiRoute(Posts, sessionOptions);
