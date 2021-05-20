import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product_review extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { through: 'product_has_categories' });
			this.belongsTo(models.User);
			this.belongsTo(models.Product);
		}
	}

	Product_review.init(
		{
			message: DataTypes.STRING,
			rating: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Product_reviews',
		},
	);

	return Product_review;
};
