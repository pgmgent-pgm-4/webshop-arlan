import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Category extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { through: 'product_has_categories' });
		}
	}

 console.log(DataTypes.UUIDV4)

	Category.init(
		{
			name: DataTypes.STRING,
			category_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};
