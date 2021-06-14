import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class User extends Model {
		static associate(models) {
			this.hasOne(models.Profile);
		}
	}

	User.init(
		{
			username: DataTypes.STRING,
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
