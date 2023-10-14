import expressApp from './app';
import Keys from './app/keys';

expressApp.server.listen({ port: Keys.PORT }, () =>
  process.stdout.write(`http://localhost:${Keys.PORT} \n`),
);
