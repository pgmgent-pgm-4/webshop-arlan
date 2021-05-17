import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			this.belongsTo(models.Category);
			this.belongsToMany(models.Tag, { through: 'ProductTag' });
		}
	}

	Product.init({
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		price: DataTypes.FLOAT,
	}, {
		sequelize,
		modelName: 'Product',
	});

	return Product;
};
