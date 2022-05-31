import "app-module-path/cwd";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { start as runTestServer } from 'server';

let mongod;

export async function mochaGlobalSetup() {
    mongod = await MongoMemoryServer.create();
    await runTestServer({uri: mongod.getUri(), debug: false});
}

export async function mochaGlobalTeardown() {
    await mongod.stop();
    process.exit(0);
}