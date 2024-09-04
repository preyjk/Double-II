import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GP Appointment API',
            version: '1.0.0',
            description: 'API to manage appointments with doctors',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
            {
                url: 'https://api.gpbooking.icu',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/controller/**/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
const filePath = './openapi.json';

fs.writeFileSync(filePath, JSON.stringify(openapiSpecification, null, 2), 'utf-8');

console.log(`openapi spec written to ${filePath}`);