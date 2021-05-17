import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Tag extends Model {
		static associate(models) {
			this.belongsToMany(models.Product, { through: 'ProductTag' });
		}
	}

	Tag.init({
		name: DataTypes.STRING,
	}, {
		sequelize,
		modelName: 'Tag',
	});

	return Tag;
};
