import "./index.pug"
function log(str: string): string { 
	return str
}

$("main .example .jquery").html(log("logger"))