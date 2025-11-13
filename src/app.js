import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import createError from 'http-errors';

import expressLayouts from 'express-ejs-layouts';

import routes from './routes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import catwayRoutes from './routes/catwayRoutes.js';
import { errorHandler, notFound } from './middlewares/error.js';

// ---------- Пути для ESM ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Приложение ----------
export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Настройка EJS ----------
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Маршруты ----------
app.use('/', routes);          // index, docs, dashboard
app.use('/', authRoutes);      // login/logout
app.use('/users', userRoutes); // CRUD users
app.use('/catways', catwayRoutes); // catways + reservations

// ---------- Ошибки ----------
app.use((req, res, next) => next(createError(404)));
app.use(notFound);
app.use(errorHandler);
