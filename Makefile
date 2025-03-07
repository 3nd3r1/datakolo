
c2p:
	code2prompt . --include="*.js,*.ts,*.tsx,*.jsx" -o .prompt
	cat .prompt | xsel --clipboard
