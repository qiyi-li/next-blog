import axios from 'axios';
import {withIronSessionSsr} from 'iron-session/next';
import {sessionOptions} from '../lib/session';
import {ObjectLiteral} from 'typeorm';
import {useForm} from '../hooks/useForm';
import qs from 'querystring';
import Layout from '../components/layout/layout';

type Props = {
  user: ObjectLiteral
}
const SingIn = (props: Props) => {

  const {form} = useForm({
    initFormData: {username: '', password: ''},
    fields: [
      {
        label: '用户名', type: 'text', key: 'username',
      },
      {
        label: '密码', type: 'password', key: 'password',
      }
    ],
    submit: {
      request: formData => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功');
        const query = qs.parse(window.location.search.slice(1));
        if (query.retutnTo) {
          window.location.href = query.retutnTo.toString();
        }else{
          window.location.href="/"
        }
      }
    },
    centered: true,
    buttons: <button type="submit">登录</button>
  });
  return (
    <Layout home={false} centered={true} header={<h1>登录</h1>}>
      {form}
    </Layout>
  );
};
export default SingIn;
export const getServerSideProps = withIronSessionSsr(async function getServerSideProps ({req, res,}) {
		const user = req.session.user;
    if (user === undefined) {
			// res.setHeader("location", "/sign_in");
			// res.statusCode = 302;
			// res.end();
			return {
				props: {
					user: null,
				},
			};
		}

    return {
      props: {user: req.session.user},
    };
  },
  sessionOptions);
