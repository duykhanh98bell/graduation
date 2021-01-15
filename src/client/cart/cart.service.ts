import { Injectable, Redirect } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CategoryProduct,
  CategoryProductDocument,
} from 'src/admin/category-product/entities/category-product.entity';
import {
  Category,
  CategoryDocument,
} from 'src/admin/category/entities/category.entity';
import {
  Product,
  ProductDocument,
} from 'src/admin/product/entities/product.entity';
import { Sale, SaleDocument } from 'src/admin/sale/entities/sale.entity';
import { VariantValueDocument } from 'src/admin/variant-value/entities/variant-value.entity';
import { VariantDocument } from 'src/admin/variant/entities/variant.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
    @InjectModel(CategoryProduct.name)
    private CategoryProductModel: Model<CategoryProductDocument>,
    @InjectModel('Variant')
    private VariantModel: Model<VariantDocument>,
    @InjectModel('VariantValue')
    private VariantValueModel: Model<VariantValueDocument>,
    @InjectModel(Sale.name)
    private SaleModel: Model<SaleDocument>,
  ) {}

  async addNewCart(req: any, res: any, CreateCartDto) {
    if (CreateCartDto.size == null || CreateCartDto.color == null) {
      req.session.message = {
        type: 'danger',
        message: 'Chọn size và màu đi bạn',
      };
      res.redirect('back');
    } else {
      await this.ProductModel.findById(
        CreateCartDto.id,
        function (err, product) {
          if (err) {
            return res.redirect('/');
          }
          if (typeof req.session.cart == 'undefined') {
            // Khi chưa có sản phẩm nào trong giỏ
            req.session.cart = [];
            CreateCartDto.quantity = +CreateCartDto.quantity;
            CreateCartDto.price = +CreateCartDto.price;
            req.session.totalCart = +CreateCartDto.quantity;
            req.session.cart.push(CreateCartDto);
          } else {
            // Cập nhật lại giỏ
            const cart = req.session.cart;
            let newItem = true;
            req.session.totalCart += +CreateCartDto.quantity;
            for (let i = 0; i < cart.length; i++) {
              if (cart[i] != null) {
                if (
                  cart[i].id == CreateCartDto.id &&
                  cart[i].color == CreateCartDto.color &&
                  cart[i].size == CreateCartDto.size
                ) {
                  cart[i].quantity =
                    +cart[i].quantity + +CreateCartDto.quantity;
                  cart[i].price = +cart[i].price;
                  newItem = false;
                  break;
                }
              }
            }
            if (newItem) {
              // Thêm sản phẩm vào giỏ
              CreateCartDto.quantity = +CreateCartDto.quantity;
              CreateCartDto.price = +CreateCartDto.price;
              req.session.priceSale = 0;
              cart.push(CreateCartDto);
            }
          }
          res.redirect('/cart');
        },
      );
    }
    return;
  }

  async findNav() {
    const [categoryParent, cateProducts] = await Promise.all([
      this.CategoryModel.find({ parent_id: null, nav_active: true }),
      this.CategoryProductModel.find().populate('category_id'),
    ]);
    return {
      categoryParent,
      cateProducts,
    };
  }

  async deleteItem(id: string, color: string, size: string, req, res) {
    const cart = await req.session.cart;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != null) {
        if (
          cart[i].id == id &&
          cart[i].color == color &&
          cart[i].size == size
        ) {
          req.session.totalCart -= cart[i].quantity;
          delete cart[i];
        }
      }
    }
    req.session.message = {
      type: 'danger',
      message:
        'Nhập lại mã giảm giá sau khi thay đổi giỏ hàng, để đảm bảo mã được áp dụng',
    };
    req.session.priceSale = 0;
    res.redirect('/cart');
  }

  async minus(req, res) {
    const cart = await req.session.cart;
    const id = await req.body.id;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != null) {
        if (
          cart[i].id == id &&
          cart[i].color == req.body.color &&
          cart[i].size == req.body.size
        ) {
          cart[i].quantity--;
          req.session.totalCart--;
        }
        if (cart[i].quantity == 0) {
          delete cart[i];
        }
      }
    }
    req.session.priceSale = 0;
    res.redirect('/cart');
  }

  async plus(req, res) {
    const cart = await req.session.cart;
    const id = await req.body.id;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != null) {
        if (
          cart[i].id == id &&
          cart[i].color == req.body.color &&
          cart[i].size == req.body.size
        ) {
          cart[i].quantity++;
          req.session.totalCart++;
        }
      }
    }
    req.session.priceSale = 0;
    res.redirect('/cart');
  }

  async quantity(req, res) {
    const cart = await req.session.cart;
    const id = await req.body.id;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != null) {
        if (
          cart[i].id == id &&
          cart[i].color == req.body.color &&
          cart[i].size == req.body.size
        ) {
          if (req.body.quantity > 0) {
            req.session.totalCart += +req.body.quantity - cart[i].quantity;
            cart[i].quantity = +req.body.quantity;
          } else {
            req.session.message = {
              type: 'danger',
              message: 'Số lượng lớn hơn 0 nhé bạn :)))',
            };
            res.redirect('/cart');
          }
        }
      }
    }
    req.session.priceSale = 0;
    res.redirect('/cart');
  }

  async applySale(req, res, createSaleDto) {
    // Khi chưa apply
    req.session.priceSale = 0;
    req.session.percentSale = 0;
    if (req.body.subtotal == 0) {
      req.session.message = {
        type: 'danger',
        message: 'Bạn cần mua hàng trước khi nhập mã',
      };
      res.redirect('/cart');
    }
    const sale = await this.SaleModel.findOne({ code: createSaleDto.code });
    if (sale) {
      const total = (req.body.subtotal * (100 - sale.percent)) / 100;
      req.session.priceSale = +total;
      req.session.percentSale = +sale.percent;

      req.session.message = {
        type: 'success',
        message: 'Áp dụng thành công',
      };
      res.redirect('/cart');
    } else {
      req.session.message = {
        type: 'danger',
        message: 'Áp dụng không thành công',
      };
      res.redirect('/cart');
    }
  }

  async checkWH(req: any, res: any) {
    const cart = await req.session.cart;
    if (req.body.total == 0) {
      req.session.message = {
        type: 'danger',
        message: 'Giỏ hàng rỗng',
      };
      res.redirect('back');
    }

    req.session.total = req.body.total;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i] != null) {
        const variantValueSize = await this.VariantValueModel.find()
          .populate({
            path: 'value_id',
            match: { value: cart[i].size },
          })
          .populate({
            path: 'variant_id',
            match: { product_id: cart[i].id },
          });
        const variantValueColor = await this.VariantValueModel.find()
          .populate({
            path: 'value_id',
            match: { value: cart[i].color },
          })
          .populate({
            path: 'variant_id',
            match: { product_id: cart[i].id },
          });

        for (let index = 0; index < variantValueSize.length; index++) {
          const element = variantValueSize[index];
          if (element.variant_id != null && element.value_id != null) {
            const next = { nextCheckout: 0 };
            for (let c = 0; c < variantValueColor.length; c++) {
              const elementC = variantValueColor[c];
              if (elementC.variant_id != null && elementC.value_id != null) {
                if (
                  JSON.stringify(element.variant_id._id) ==
                  JSON.stringify(elementC.variant_id._id)
                ) {
                  if (cart[i].quantity > +element.variant_id.quantity) {
                    next.nextCheckout = 1;
                    if (next.nextCheckout) {
                      req.session.message = {
                        type: 'danger',
                        message:
                          cart[i].name +
                          ' || Màu: ' +
                          cart[i].color +
                          ' || Cỡ: ' +
                          cart[i].size +
                          ' || Số lượng còn ' +
                          element.variant_id.quantity,
                      };
                      res.redirect('/cart');
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    res.redirect('/checkout');
  }
}
