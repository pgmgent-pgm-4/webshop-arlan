import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.hasMany(models.Product);
		}
	}

	Category.init({
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
	}, {
		sequelize,
		modelName: 'Category',
	});

	return Category;
};
