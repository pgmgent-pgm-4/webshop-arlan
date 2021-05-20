import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { through: 'product_has_categories' });

		}
	}

	Category.init(
		{
			name: DataTypes.STRING,
			category_id: DataTypes.UUIDV4
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};
