export default (sequelizeInstance, Sequelize) => {
    return sequelizeInstance.define('user', {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
        type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });
}