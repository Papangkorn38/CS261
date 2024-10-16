const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));