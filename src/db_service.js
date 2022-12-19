// async function main(){

// 	try {
//     await client.connect();

//     await client.db(config.get('mongodb.databaseName')).command({ping:1});
// 	console.log("success")
// } catch (e) {
// await client.close();
//     console.error(e);
// }
// }
// main().catch(console.error);
const config = require('config');


console.log(`${config.get('mongodb.host')}`)