const vscode = require('vscode');
const REGULARS = require('./REGULARS.js');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	REGULARS.forEach(({ title, rule },  index) => {
		// 注册命令：将命令ID绑定到扩展中的处理程序函数
		let disposable = vscode.commands.registerCommand(`extension.rule${index}`, () => {
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const { selections } = editor;

				editor.edit(editBuilder => {
					selections.forEach(selection => {
						const { start, end } = selection;
						const range = new vscode.Range(start, end);
						editBuilder.replace(range, String(rule));
					});
				});
				// 操作成功时，消息窗口提示
				vscode.window.showInformationMessage(`已插入正则: ${title}`);
			} else {
				// 操作错误时，消息窗口提示
				vscode.window.showWarningMessage('regular-set: 只有在编辑文本的时候才可以使用!');
			}
		});

		context.subscriptions.push(disposable);
	});
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
