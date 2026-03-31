const format = (level, message, meta) => {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (meta) {
    payload.meta = meta;
  }

  return JSON.stringify(payload);
};

const logger = {
  info: (message, meta) => console.log(format('info', message, meta)),
  warn: (message, meta) => console.warn(format('warn', message, meta)),
  error: (message, meta) => console.error(format('error', message, meta)),
  stream: {
    write: (message) => {
      const trimmed = message.trim();
      if (trimmed) {
        console.log(format('http', trimmed));
      }
    },
  },
};

module.exports = logger;
