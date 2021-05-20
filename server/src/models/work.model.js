import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Work extends Model {
		static associate(models) {
			this.belongsTo(models.Category);
			this.hasMany(models.WorkAsset, { as: 'assets'});
		}
	}

	Work.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: 'Work',
		},
	);

	return Work;
};
