import axios from 'axios';
import {useForm} from '../../hooks/useForm';
import {NextPage} from 'next';
import Layout from '../../components/layout/layout';
import utilStyle from 'styles/utils.module.scss';

const PostsNew: NextPage = () => {
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
      success: () => {
        window.alert('提交成功');
        window.location.href = '/posts';
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
