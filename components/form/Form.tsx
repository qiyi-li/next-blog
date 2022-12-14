import React from "react";

type Props = {
	fields: { label: string, type: "text" | "password" }[]
}
export const Form: React.FC<Props> = (props) => {
	const {fields} = props;
	return (
		<form>
			{fields.map((field, index) => {
					return (
						<div key={index}>
							<label>{field.label}</label>
							<input type={field.type}/>
						</div>
					);
				}
			)}
		</form>
	);
};