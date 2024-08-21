import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Ecommerce API by Aashutosh',
        description: 'API Documentation',
        version: '1.0.0',
    },
    components: {
        securitySchemes: {
            Authorization: {
                type: 'apiKey',
                in: 'header',
                description:
                    'All requests to the API should contain an Authorization header with your API Token : NOTE [Add Bearer before token] ',
                name: 'Authorization',
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:8000/api/v1',
            description: 'Development server',
        },
        {
            url: '',
            description: 'Production server',
        },
    ],
}

const options = {
    swaggerDefinition,
    apis: ['src/swagger/**/*.ts'],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
