import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Middleware para validação de dados usando Zod schemas
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the request body
      const validatedData = schema.parse(req.body);
      
      // Replace req.body with validated and transformed data
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Dados de entrada inválidos',
          errors: validationErrors,
        });
        return;
      }

      // Unexpected error
      console.error('Validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
};

/**
 * Middleware para validação de query parameters
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.query);
      req.query = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Parâmetros de consulta inválidos',
          errors: validationErrors,
        });
        return;
      }

      console.error('Query validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
};

/**
 * Middleware para validação de parâmetros da URL
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.params);
      req.params = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Parâmetros da URL inválidos',
          errors: validationErrors,
        });
        return;
      }

      console.error('Params validation middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
      });
    }
  };
};