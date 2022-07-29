const { debug } = require('console');
const vscode = require('vscode');

function useMenuPick(context, REGULARS) {
    
		// 注册命令：将命令ID绑定到扩展中的处理程序函数
	let disposable = vscode.commands.registerCommand('extension.ruleMenu', () => {
		vscode.window.showQuickPick(REGULARS.map(({title,rule,examples}) => {
			return {
				label: title,
                rule: String(rule),
                detail: `例如: ${examples.join(' 或 ')}`
			}
		}),
		{
            placeHolder: '请输入关键词'
        }).then(item => {
			if (!item) return
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const ruleString = String(item.rule);
                const title = item.label;
				const { selections } = editor;
				editor.edit(editBuilder => {
					selections.forEach(selection => {
						const { start, end } = selection;
						const range = new vscode.Range(start, end);
						editBuilder.replace(range, ruleString);
					});
				});
                
				// 操作成功时，消息窗口提示
				vscode.window.showInformationMessage(`已插入正则: ${title}`);
			} else {
				// 操作错误时，消息窗口提示
				vscode.window.showWarningMessage('regular-set: 只有在编辑文本的时候才可以使用!');
			}
				})
			});
			debugger
				console.log(editor.options);

	context.subscriptions.push(disposable);
}

module.exports = useMenuPick


































