import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			this.belongsToMany(models.Category, { through: 'product_has_categories' });
		}
	}

	Product.init({
		name: DataTypes.STRING,
		product_id: DataTypes.UUIDV4,

	}, {
		sequelize,
		modelName: 'Product',
	});

	return Product;
};
