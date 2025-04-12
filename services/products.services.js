import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

class ProductsServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: Number(faker.commerce.price()),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProducto = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProducto);
    return newProducto;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async getOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound("El producto no se encuentra");
    }
    if (product.isBlock) {
      throw boom.conflict("El producto se encuentra bloqueado");
    }
    return product;
  }

  async update(id, change) {
    const index = this.products.findIndex((prod) => prod.id === id);
    if (index === -1) throw boom.notFound("El producto no se encuentra")
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...change,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((prod) => prod.id === id);
    if(index === -1) throw boom.notFound("El producto no se encuentra")
    const product = this.products[index];
    this.products.splice(index, 1);
    return {
      id,
      ...product,
    };
  }
}

export default ProductsServices;
