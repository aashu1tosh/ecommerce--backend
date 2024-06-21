import chalk from 'chalk';
import { DotenvConfig } from '../config/env.config';
import { Logger } from '../config/logger.config';
import { Environment } from '../constant/enum';

const log = console.log;

class Print {
    static error(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.bgRed(message));
        else Logger.error(message);
    }

    static info(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.green(message));
        else Logger.info(message);
    }

    static warn(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.yellow(message));
        else Logger.warn(message);
    }

    static debug(message: string): void {
        if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT)
            log(chalk.blue(message));
        else Logger.debug(message);
    }
}

export default Print;
