import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import express from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { useServer } from 'graphql-ws/lib/use/ws'
import { loadFilesSync } from '@graphql-tools/load-files'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault
} from '@apollo/server/plugin/landingPage/default'
// import { backupDatabase } from './config/backup'

//@Appollo server 4 with subscription
async function startServer(typeDefs: any, resolvers: any) {

	await mongoose.connect(process.env.MONGO_URI)
		.then(() => console.log('✅ Databse connected'))
		.catch(e => console.log('❌', e))


	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const app = express()
	const httpServer = createServer(app)
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/graphql'
	})
	const serverCleanup = useServer({ schema }, wsServer)
	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						}
					}
				}
			},
			process.env.ENDPOINT_STATUS === 'production' ?
				ApolloServerPluginLandingPageProductionDefault({ footer: false })
				:
				ApolloServerPluginLandingPageLocalDefault({ footer: false })
		]
	})

	await server.start()
	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		express.json(),
		bodyParser.json(),
		expressMiddleware(server, { context: async ({ req }) => ({ req }) }),
	)

	const PORT = process.env.PORT
	httpServer.listen(PORT, () => {
		// backupDatabase()
		console.log(`🟢 http://localhost:${PORT}/graphql`)
	})
}

const resolversFiles = loadFilesSync(path.join(__dirname, './graphql/resolver'))
const typeDefsFiles = loadFilesSync(path.join(__dirname, './graphql/typeDef'))

const resolvers = mergeResolvers(resolversFiles)
const typeDefs = mergeTypeDefs(typeDefsFiles)

startServer(typeDefs, resolvers)