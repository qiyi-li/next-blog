import {FormEvent, ReactElement, useCallback, useState} from "react";
import {AxiosResponse} from "axios";

type Field<T> = {
	label: string,
	type: "text" | "password" | "textarea",
	key: keyof T
}
type useFormOptions<T> = {
	initFormData: T;
	fields: Field<T>[];
	buttons: ReactElement;
	submit: {
		request: (formData: T) => Promise<AxiosResponse<T>>;
		message: string
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
				window.alert(submit.message);
			}, (err) => {
				if (err.response && err.response.status === 422) {
					setErrors(err.response.data);
				}
			}
		);
	}, [submit, formData]);
	const form = (
		<form onSubmit={_onSubmit}>
			{fields.map(field =>
				<div>
					<label>{field.label}
						{field.type === "textarea" ?
							<textarea onChange={(e) => onChange(field.key, e.target.value)}>
                {`${formData[field.key]}`}
              </textarea>
							:
							<input type={field.type} value={formData[field.key] as string}
										 onChange={(e) => onChange(field.key, e.target.value)}/>
						}
					</label>
					{errors[field.key]?.length > 0 && <div>
						{errors[field.key].join(",")}
          </div>}
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