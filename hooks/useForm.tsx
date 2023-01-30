import {FormEvent, ReactElement, useCallback, useState} from 'react';
import {AxiosResponse} from 'axios';
import cs from 'classnames';
import utilStyle from 'styles/utils.module.scss';
import {marked} from 'marked';
import _ from 'lodash';

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T,
  className?: string
}
type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactElement;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success: () => void;
  },
  displayPreview?: boolean,
  centered?: boolean
}

export function useForm<T>(options: useFormOptions<T>) {
  const {initFormData, fields, buttons, submit, displayPreview, centered} = options;
  // 非受控
  const [isDisplayPreview, setDisplayPreview] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData[key] !== undefined) { // 为了严谨
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback((key: keyof T, value: any) => {
    setFormData({...formData, [key]: value});
  }, [formData]);
  const _onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    !_.isEmpty(formData) ?
      submit.request(formData).then((res) => {
          submit.success();
        }, (err) => {
          if (err.response && err.response.status === 422) {
            setErrors(err.response.data);
          } else if (err.response && err.response.status === 401) {
            window.alert('请先登录');
            window.location.href = '/sign_in?returnTo=' + encodeURIComponent(window.location.pathname);
          }
        }
      ) : window.alert('请输入内容后再提交');
  }, [submit, formData]);
  const form = (
    <form className={utilStyle.formWrapper} onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.label} className={cs(utilStyle.fieldItem, field.className, centered ? utilStyle.centered : '')}>
						<span className={utilStyle.labelText}>
							{field.label}
						</span>
          {field.type === 'textarea' ?
            <div className={utilStyle.textareaWrapper}>
							<textarea className={utilStyle.textarea} value={formData[field.key] as string}
                        style={{width: isDisplayPreview ? '50%' : '100%'}}
                        onChange={(e) => onChange(field.key, e.target.value)}/>
              {isDisplayPreview && <div className={cs(utilStyle.displayWrapper, 'markdown-body')}
                                        dangerouslySetInnerHTML={{__html: marked.parse((formData[field.key] as string))}}></div>}
            </div>
            :
            <div className={utilStyle.inputWrapper}>
              <input className={utilStyle.input} type={field.type} value={formData[field.key] as string}
                     onChange={(e) => onChange(field.key, e.target.value)}/>
              {errors[field.key] && errors[field.key]!.length > 0 &&
                <div className={utilStyle.error}>
                  {errors[field.key]!.join(',')}
                </div>
              }
            </div>
          }

        </div>
      )}
      <div className={utilStyle.buttonWrapper}>
        {buttons}
        {displayPreview ? <button type={'button'}
                                  onClick={() => setDisplayPreview(!isDisplayPreview)}>{isDisplayPreview ? '收起' : '预览'}</button> : ''}
      </div>
    </form>
  );
  return {
    form: form,
  };
}
