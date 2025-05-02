import * as log from "@std/log";
import { config } from "@/utils/config.ts";

log.setup({
    handlers: {
        console: new log.ConsoleHandler("DEBUG", {
            formatter: log.formatters.jsonFormatter,
        }),
    },
    loggers: {
        default: {
            level: config.logging.level,
            handlers: ["console"],
        },
    },
});

export const logger = log.getLogger();
