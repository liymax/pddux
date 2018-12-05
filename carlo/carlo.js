const carlo = require('carlo');
const path = require('path');
const {insertUser,getUsers}=require("./dbsql");

(async () => {
	// Launch the browser.
	const app = await carlo.launch();

	// Terminate Node.js process on app window closing.
	app.on('exit', () => process.exit());

	// Tell carlo where your web files are located.

	app.serveFolder(path.resolve(__dirname,"../dist"));

	// Expose 'env' function in the web environment.
	await app.exposeFunction('env', ()=> process.env);
	await app.exposeFunction('insertUser', insertUser);
	await app.exposeFunction('getUsers', getUsers);

	// Navigate to the main page of your app.
	await app.load('index.html');
})();
