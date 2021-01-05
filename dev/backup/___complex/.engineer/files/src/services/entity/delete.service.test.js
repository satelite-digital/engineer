const deleteService = require('./delete.service')

const context = require('./../../context')

// Unit

test('deletes target record from db', async () => {
    const ctx = {
        db : context.db,
        query : {
            select : {
                id : true
            }
        },
        target : "110e0a0e-69da-4528-a77a-1a4a02cd6882"
    }
    expect(await deleteService.deleteFromDB(ctx)).toStrictEqual({
        "id" : "110e0a0e-69da-4528-a77a-1a4a02cd6882"
    });
});