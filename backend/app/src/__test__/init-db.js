import { createTables } from "./db-create-tables.js";
import { insertExampleData } from "./insert-example-data.js";

await createTables();
insertExampleData();