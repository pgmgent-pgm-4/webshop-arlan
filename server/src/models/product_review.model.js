import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class ProductReview extends Model {
		static associate(models) {
			this.belongsTo(models.User);
			this.belongsTo(models.Product);
		}
	}

	ProductReview.init(
		{
			message: DataTypes.STRING,
			rating: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Product_reviews',
		},
	);

	return ProductReview;
};
