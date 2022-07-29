const vscode = require('vscode');
const REGULARS = require('./REGULARS.js');
const useSearch = require('./useSearch');
const useMenuPick = require('./useMenuPick')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	useSearch(context, REGULARS)
	useMenuPick(context, REGULARS)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
