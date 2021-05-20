import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Payment extends Model {
		static associate(models) {
			this.belongsTo(models.User);
			this.belongsTo(models.Order);
		}
	}

	Payment.init(
		{
			data_of_payment: DataTypes.DATE
		},
		{
			sequelize,
			modelName: 'Payment',
		},
	);

	return Payment;
};
