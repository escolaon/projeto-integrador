import { rmSync } from 'fs';

try {
    rmSync('./database/database.db');
    console.log('File database.db removed');
} catch (e) {
    console.log('File database.db not found');
}

try {
    rmSync('./database/00_schema.sql');
    console.log('File 00_schema.sql removed');
} catch (e) {
    console.log('File 00_schema.sql not found');
}

try {
    rmSync('./database/database.db-journal');
    console.log('File database.db-journal removed');
} catch (e) {
    console.log('File database.db-journal not found');
}