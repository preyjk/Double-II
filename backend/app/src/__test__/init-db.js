import { createTables } from "./db-create-tables.js";
import { insertExampleData } from "./insert-example-data.js";

createTables();
await new Promise(resolve => setTimeout(resolve, 1000));
insertExampleData();