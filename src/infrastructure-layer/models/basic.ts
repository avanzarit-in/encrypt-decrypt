
module.exports = (sequelize, DataTypes) => {

    var Channel = sequelize.define('channel', {
        channel_sid: { 
            allowNull: false,
            type:DataTypes.STRING, 
            primaryKey: true,
            field: 'id'
        },
        account_sid: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'sid'
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'name'
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
            field: 'description'
        },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'createdat'
        },
        date_updated: {
            type: DataTypes.DATE,
            field: 'updatedat'
        },
        updated_by: {
            type: DataTypes.STRING,
            field: 'updatedby'
        }
    }, 
    {
        schema: 'CrmDB',
        tableName: 'channel'
    });
    
    return Channel;
    
};