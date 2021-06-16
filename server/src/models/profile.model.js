import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Profile extends Model {
		static associate(models) {
			this.belongsTo(models.User);
		}
	}

	Profile.init(
		{
			firstname: {
				type: DataTypes.TEXT
			},
			lastname: {
				type: DataTypes.TEXT
			},
			date_of_birth: {
				type: DataTypes.DATE
			},
			orders: DataTypes.NUMBER


		},
		{
			sequelize,
			modelName: 'Profile',
		},
	);

	return Profile;
};
