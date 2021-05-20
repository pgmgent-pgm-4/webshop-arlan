import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Tag extends Model {
		static associate(models) {
			this.belongsToMany(models.Work, {
				through: 'WorkTag',
			});
		}
	}

	Tag.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Tag',
		},
	);

	return Tag;
};
