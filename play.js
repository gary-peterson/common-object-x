//play.js

//OKAY
//const {} = require('./src/Objectx');



const {Toolsx} = require('./src/Toolsx');

const
    tool = Toolsx.current(),
    log = console.log;

let r;
log('hello');
log(tool != null);
r = tool.coerceFloat('25.5');
log(`${typeof r} -- ${r}`);
r = tool.coerceFloat('oops');
log(`${typeof r} -- ${r}`);
log(`isUndefined(undefined): ${tool.isUndefined(undefined)}`);
log(`isUndefined(null): ${tool.isUndefined(null)}`);
log(`isWhitespace(' '): ${tool.isWhitespace(' ')}`);
log(`isWhitespace(' z'): ${tool.isWhitespace(' z')}`);


