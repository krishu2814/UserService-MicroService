const AppError = require('./error-handler');
const { StatusCodes } = require('http-status-codes');

/**
 * Client Side Error
 * Bad Request
 */
class ValidationError extends AppError {
    constructor(error) {
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });

        // Calls the constructor of AppError
        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;

/*
SequelizeValidationError {
  name: 'SequelizeValidationError',
  errors: [
    { message: 'Email must be unique' },
    { message: 'Password cannot be null' }
  ]
}
*/

/**
Request
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Sequelize throws error
  ↓
ValidationError
  ↓
Global error handler
  ↓
Client (400 Bad Request)
 */