import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order_product extends Model {
		static associate(models) {
			this.belongsTo(models.Product)

		}
	}

	Order_product.init(
		{
			order_id: DataTypes.UUIDV4,
			price_per_item: DataTypes.INTEGER,
			amount: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Order_product',
		},
	);

	return Order_product;
};
