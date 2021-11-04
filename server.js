const PORT = Process.env.PORT || 3000;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');



















app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});