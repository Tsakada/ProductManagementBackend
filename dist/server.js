"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const ws_1 = require("ws");
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = require("@apollo/server");
const ws_2 = require("graphql-ws/lib/use/ws");
const load_files_1 = require("@graphql-tools/load-files");
const express4_1 = require("@apollo/server/express4");
const schema_1 = require("@graphql-tools/schema");
const merge_1 = require("@graphql-tools/merge");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
async function startServer(typeDefs, resolvers) {
    await mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => console.log('✅ Databse connected'))
        .catch(e => console.log('❌', e));
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql'
    });
    const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
    const server = new server_1.ApolloServer({
        schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    };
                }
            },
            process.env.ENDPOINT_STATUS === 'production' ?
                (0, default_1.ApolloServerPluginLandingPageProductionDefault)({ footer: false })
                :
                    (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ footer: false })
        ]
    });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, { context: async ({ req }) => ({ req }) }));
    const PORT = process.env.PORT;
    httpServer.listen(PORT, () => {
        console.log(`🟢 http://localhost:${PORT}/graphql`);
    });
}
const resolversFiles = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './graphql/resolver'));
const typeDefsFiles = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './graphql/typeDef'));
const resolvers = (0, merge_1.mergeResolvers)(resolversFiles);
const typeDefs = (0, merge_1.mergeTypeDefs)(typeDefsFiles);
startServer(typeDefs, resolvers);
