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


}

run()
    .then(() => console.log('FINISHED!'))
    .catch(console.error)