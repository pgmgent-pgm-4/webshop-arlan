import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
	class Product extends Model {
		static associate(models) {
			this.belongsToMany(models.Category, { through: 'product_has_categories' });
			this.hasMany(models.Favorite);
			
		}
	}

	Product.init({
  id: {
   type: DataTypes.TEXT,
   primaryKey: true,
   autoIncrement: false
  }
	}, {
		sequelize,
		modelName: 'Product',
	});

	return Product;
};
