import { fork } from 'child_process';
const config = {
  NUMBER_OF_EXECUTIONS: 10
};

[...Array(config.NUMBER_OF_EXECUTIONS).keys()].forEach(() => fork('./src/app.js'));