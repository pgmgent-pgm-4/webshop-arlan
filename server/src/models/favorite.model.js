import { Model, DataTypes } from 'sequelize';


export default (sequelize) => {
	class Favorite extends Model {
		static associate(models) {
			this.belongsTo(models.User);
			this.belongsTo(models.Product);
		}
	}

	Favorite.init(
		{
		},
		{
			sequelize,
			modelName: 'Favorite',
		},
	);

	return Favorite;
};
