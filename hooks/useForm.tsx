import {FormEvent, ReactElement, useCallback, useState} from "react";
import {AxiosResponse} from "axios";
import cs from "classnames";
import utilStyle from "styles/utils.module.scss";

type Field<T> = {
	label: string,
	type: "text" | "password" | "textarea",
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
	}
}

export function useForm<T>(options: useFormOptions<T>) {
	const {initFormData, fields, buttons, submit} = options;
	// 非受控
	const [formData, setFormData] = useState(initFormData);
	// initFormData = {username:'', password:''}
	// initErrors = {username: [], password: []}
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
		submit.request(formData).then((res) => {
				submit.success();
			}, (err) => {
				if (err.response && err.response.status === 422) {
					setErrors(err.response.data);
				} else if (err.response && err.response.status === 401) {
					window.alert("请先登录");
					window.location.href = "/sign_in?returnTo=" + encodeURIComponent(window.location.pathname);
				}
			}
		);
	}, [submit, formData]);
	const form = (
		<form className={utilStyle.formWrapper} onSubmit={_onSubmit}>
			{fields.map(field =>
				<div key={field.label} className={cs(utilStyle.fieldItem, field.className)}>
						<span className={utilStyle.labelText}>
							{field.label}
						</span>
					{field.type === "textarea" ?
						<textarea className={utilStyle.textarea} value={formData[field.key] as string}
											onChange={(e) => onChange(field.key, e.target.value)}/>
						:
						<input className={utilStyle.input} type={field.type} value={formData[field.key] as string}
									 onChange={(e) => onChange(field.key, e.target.value)}/>
					}
					{errors[field.key] && errors[field.key]!.length > 0 &&
            <div>
							{errors[field.key]!.join(",")}
            </div>
					}
				</div>
			)}
			<div>
				{buttons}
			</div>
		</form>
	);
	return {
		form: form,
	};
}