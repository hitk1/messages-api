import 'dotenv/config'

import 'reflect-metadata'
import 'express-async-errors'
import '@shared/containers'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import { notFoundApiRoutes } from './middlewares/not-found'
import { globalErrorHandling } from './middlewares/global-errors'
import { apiRoutes } from '@infra/routes/api.routes'

const api = express()

api.use(cors())
api.use(helmet())
api.disable('x-powered-by')

api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use(morgan('dev'))
api.use('/', apiRoutes)

api.use(notFoundApiRoutes)
api.use(globalErrorHandling as any)

export { api }