import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import {NextPage} from 'next';
import Layout from '../../components/layout/layout';
import utilStyle from 'styles/utils.module.scss';
import {useRouter} from 'next/router';

const PostsNew: NextPage = () => {
  const router = useRouter();
  const {form} = useForm({
    showBack: true,
    initFormData: {title: '', content: ''},
    fields: [
      {label: '标题：', type: 'text', key: 'title',},
      {label: '内容：', type: 'textarea', key: 'content',},
    ],
    buttons: <button type="submit" className={utilStyle.submit}>提交</button>,
    submit: {
      request: formData => axios.post(`/api/v1/posts`, formData),
      success: async () => {
        window.alert('提交成功');
        await router.push('/posts');
      }
    },
    displayPreview: true,
  });
  return (
    <div>
      <Layout home={false}>
        {form}
      </Layout>
    </div>
  );
};
export default PostsNew;
