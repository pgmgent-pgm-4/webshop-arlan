import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class WorkAsset extends Model {
		static associate(models) {
			this.belongsTo(models.Work);
		}
	}

	WorkAsset.init(
		{
			caption: DataTypes.TEXT,
			type: DataTypes.STRING,
      reference: DataTypes.STRING,
      order: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'WorkAsset',
		},
	);

	return WorkAsset;
};
