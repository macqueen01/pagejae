module.exports = (sequelize, DataType) => {
    return sequelize.define('message', {
        message : {
            type : DataType.TEXT,
            allowNull : true,
        }, name : {
            type : DataType.STRING(200),
            allowNull : false,
            unique : true
        }
    }, {
        timestamps : true,
        charset: "utf8",
        collate: "utf8_general_ci"
    })
}