const sql = require('sql.js');
const db = new sql.Database();
const createSql = `create table user (
	username text,
	area text
);`;
db.run(createSql);

async function getUsers() {
	let res = db.exec("SELECT * FROM user;");
	let {columns=[],values=[]} = res[0]||{};
	return values.map(e=>{
		let obj = {};
		columns.forEach((f,i)=>{
			obj[f] = e[i];
		});
		return obj;
	})
}

async function insertUser(name,from) {
	let addSql =`INSERT INTO user VALUES ('${name}', '${from}');`;
	return db.exec(addSql);
}

module.exports={getUsers,insertUser};
