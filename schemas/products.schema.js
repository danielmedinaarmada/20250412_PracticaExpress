import joi from 'joi';

const id = joi.string().uuid();

const name = joi.string().min(3).max(15).messages({
  'string.base': 'El nombre debe ser un string',
  'string.min': 'El nombre debe tener almenos 3 carácteres',
  'string.max': 'El nombre debe tener maximo 15 carácteres',
  'string.empty': 'El nombre es requerido',
});

const description = joi.string().min(5).max(55).messages({
  'string.base': 'La descripción debe ser un string',
  'string.min': 'La descripción debe tener almenos 5 carácteres',
  'string.max': 'La descripción debe tener maximo 55 carácteres',
  'string.empty': 'La descripción es requerido',
});

const image = joi.string().uri().messages({
  'string.uri': 'La imagen debe ser una URL valida',
});

const price = joi.number().integer().min(30).positive().messages({
  'number.base': 'El precio debe ser un número',
  'number.integer': 'El precio debe ser un valor entero',
  'number.min': 'El precio debe ser mayor a 30',
  'number.positive': 'El precio debe ser un valor positivo',
  'number.empty': 'Debe tener un precio',
});

const isBlock = joi.boolean().messages({
  'boolean.base': 'Debe ser un valor verdadero (true) o falso (false)',
});

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  price: price.required(),
  isBlock: isBlock.required(),
});

const updateProductSchema = joi.object({
  name,
  description,
  image,
  price,
  isBlock,
});

const getProductSchema = joi.object({
  id: id.required(),
})


export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
}
