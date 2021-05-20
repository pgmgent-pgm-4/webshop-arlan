import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
		}
	}

	User.init(
		{
			userName: DataTypes.STRING,
			password: DataTypes.STRING,
      email: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);

	return User;
};
