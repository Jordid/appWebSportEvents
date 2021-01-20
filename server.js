const express = require('express');

const app = express();

app.use(express.static('./dist/portal-eventos-web'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/portal-eventos-web/' }),
);

app.listen(process.env.PORT || 8080);