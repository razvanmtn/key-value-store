import express, { Request, Response , Application } from 'express';
import { Store } from './store';

const PORT = process.env.PORT || 3000;

const store = new Store();

const app: Application = express();
app.use(express.text());

app.get('/:key', (req: Request, res: Response) => {
    const value = store.get(req.params.key);

    if (!value) {
        return res.status(404).send('Key not found!');
    }

    res.setHeader('content-type', 'text/plain');
    res.send(value);
});

app.post('/:key', (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send('Invalid value!');
        return;
    }

    const ms = Number(req.query.ms);
    const value = store.set(req.params.key, req.body, ms);

    res.setHeader('content-type', 'text/plain');
    res.status(201).send(value);
});

app.delete('/:key', (req: Request, res: Response) => {
    store.rm(req.params.key)
    res.status(202).send();
});

app.get('/', (_: Request, res: Response) => res.send('up-and-running'));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

