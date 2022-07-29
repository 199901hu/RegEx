const { debug } = require('console');
const vscode = require('vscode');

function useMenuPick(context, REGULARS) {
    
		// 注册命令：将命令ID绑定到扩展中的处理程序函数
	let disposable = vscode.commands.registerCommand('RegEx.ruleMenu', () => {
		vscode.window.showQuickPick(REGULARS.map(({title,rule,examples}) => {
			return {
				label: title,
                rule: String(rule),
                detail: `例如: ${examples.join(' 或 ')}`
			}
		}),
		{
            placeHolder: '请输入关键字'
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
				});/^[^\u4E00-\u9FA5]*$/
                
				// 操作成功时，消息窗口提示
				vscode.window.showInformationMessage(`正则插入成功: ${title}`);
			} else {
				// 操作错误时，消息窗口提示
				vscode.window.showWarningMessage('此处不允许使用');
			}
				})
			});
			debugger
				console.log(editor.options);

	context.subscriptions.push(disposable);
}

module.exports = useMenuPick


































