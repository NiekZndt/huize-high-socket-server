import * as mysql from 'mysql';

export class MysqlController {
    private connection = mysql.createConnection({
        host: 'localhost', // Port 3306
        user: 'root',
        password: 'WingsChicken123',
        database: 'persons'
    });

    constructor() {
        this.connection.connect();

        this.connection.query('SELECT * FROM users', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
        });
        // this.addUser();
        // this.connection.end()
        // this.con.connect((err) => {
        //     if (err) throw err;
        //     console.log('Connected!');
        //     this.con.query("USE persons;", (err, result) => {
        //         if (err) throw err;
        //         this.con.query('SHOW users;', (err, result) => console.log("Result: ", result));
        //     });
        // });
    }

    private addUser(): void {
        const sql = `INSERT INTO users(user_id, first_name, last_name, birth_date)
                     VALUES(1, 'Piet', 'JEmoeder', '2020-10-20')`
        this.connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log('Adding user res: ', res);
        })
    }
}