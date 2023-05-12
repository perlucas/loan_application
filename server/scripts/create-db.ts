import { dbInstance } from '../db'

const run = async () => {

    return dbInstance().schema.createTable('company', function (table) {
        table.increments('id', { primaryKey: true });
        table.string('name');
        table.date('established_at');
    })
        .then(() => {
            return dbInstance()('company').insert([
                { name: 'Google', established_at: '1998-05-10' },
                { name: 'Netflix', established_at: '2003-10-20' },
                { name: 'Microsoft', established_at: '1994-02-05' },
            ])
        })
        .then(() => {
            return dbInstance().schema.createTable('accounting_system', function (table) {
                table.increments('id', { primaryKey: true });
                table.string('name');
            })
        })
        .then(() => {
            return dbInstance()('accounting_system').insert([
                { name: 'XERO' },
                { name: 'MYOB' },
            ])
        })
        .then(() => {
            return dbInstance().schema.createTable('loan_applications', function (table) {
                table.increments('id', { primaryKey: true });
                table.integer('accounting_system_id').references('id').inTable('accounting_system');
                table.integer('company_id').references('id').inTable('company');
                table.float('amount');
                table.float('preassessment');
                table.string('result');
            })
        })


}

run()
    .then(() => console.log('FINISHED!'))
    .catch(console.error)