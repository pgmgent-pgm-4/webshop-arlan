import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Order extends Model {
		static associate(models) {
			this.belongsTo(models.User);
		}
	}

	Order.init(
		{
			date: DataTypes.DATE,
			price: DataTypes.NUMBER,
			order_value: DataTypes.NUMBER,
			status: DataTypes.TEXT,

		},
		{
			sequelize,
			modelName: 'Order',
		},
	);

	return Order;
};
