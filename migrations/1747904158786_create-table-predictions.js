exports.up = (pgm) => {
    pgm.createTable('predictions', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'users(id)',
            onDelete: 'cascade',
        },
        image_path: {
            type: 'TEXT',
            notNull: true,
        },
        predicted_label: {
            type: 'TEXT',
            notNull: true,
        },
        raw_prediction: {
            type: 'TEXT',
        },
        created_at: {
            type: 'timestamp',
            default: pgm.func('current_timestamp'),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('predictions');
};
