import {NextApiHandler} from "next";
import {AppDataSource} from "src/data-source";
import {User} from "../../../src/entity/User";
import md5 from "md5";

const Users: NextApiHandler = async (req, res) => {
	const {username = "", password, passwordConfirmation} = req.body;
	if (!AppDataSource.isInitialized) await AppDataSource.initialize();
	res.setHeader("Content-Type", "application/json; charset=utf-8");

	const userRepository = AppDataSource.getRepository("User");
	const user = new User();
	user.username = username;
	user.username = username;
	user.passwordConfirmation = passwordConfirmation;
	user.password = password;
	await user.validate();
	const [hasError,errors]=user.hasErrors()

	if (hasError) {
		res.statusCode = 422;
		res.write(JSON.stringify(errors));
	} else {
		const u = await userRepository.save(user);
		res.statusCode = 200;
		res.write(JSON.stringify(u));
	}
	res.end();
};
export default Users;