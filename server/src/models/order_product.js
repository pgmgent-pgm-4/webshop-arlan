import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class OrderProduct extends Model {
		static associate(models) {
			this.belongsTo(models.Product);
		}
	}

	OrderProduct.init(
		{
			order_id: DataTypes.UUIDV4,
			price_per_item: DataTypes.INTEGER,
			amount: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Order_product',
		},
	);

	return OrderProduct;
};
