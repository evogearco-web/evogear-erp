import { Currency, CustomerStatus, CustomerTag, CustomerType, FollowUpType, PrismaClient, ProductAttachmentType, ProductCategory, ProductStatus, ProductType, QuotationStatus, SalesOrderStatus, SupplierOrderStatus } from '@prisma/client';
const prisma = new PrismaClient();

const calc = (unitCostRmb:number, exchangeRate:number, sellingPriceSgd:number) => {
  const unitCostSgd = unitCostRmb / exchangeRate;
  const grossProfitPerUnit = sellingPriceSgd - unitCostSgd;
  const grossMarginPercentage = sellingPriceSgd === 0 ? 0 : (grossProfitPerUnit / sellingPriceSgd) * 100;
  return { unitCostSgd, grossProfitPerUnit, grossMarginPercentage };
};

async function main() {
  await prisma.productActivity.deleteMany(); await prisma.productAttachment.deleteMany(); await prisma.productSizeVariant.deleteMany(); await prisma.productPriceTier.deleteMany();
  await prisma.customerActivity.deleteMany(); await prisma.customerFollowUp.deleteMany(); await prisma.customerAttachment.deleteMany(); await prisma.customerNote.deleteMany();
  await prisma.payment.deleteMany(); await prisma.shipment.deleteMany(); await prisma.supplierOrderItem.deleteMany(); await prisma.supplierOrder.deleteMany(); await prisma.salesOrderItem.deleteMany(); await prisma.salesOrder.deleteMany(); await prisma.quotationItem.deleteMany(); await prisma.quotation.deleteMany(); await prisma.product.deleteMany(); await prisma.supplier.deleteMany(); await prisma.customer.deleteMany();

  const customer = await prisma.customer.create({data:{contactName:'Ms. Cheryl Lim',companyName:'Northpoint Secondary School',email:'cheryl@northpoint.edu.sg',phone:'+65 81232211',customerType:CustomerType.SCHOOL,status:CustomerStatus.ACTIVE,tags:[CustomerTag.FREQUENT_BUYER],deliveryAddressLine1:'12 Northpoint Ave',deliveryPostalCode:'760012',deliveryCountry:'Singapore'}});
  await prisma.customerFollowUp.create({data:{customerId:customer.id,title:'Ask for artwork',type:FollowUpType.ASK_FOR_ARTWORK,dueDate:new Date(Date.now()+86400000)}});

  const supplier = await prisma.supplier.create({data:{name:'Shenzhen Promo Goods Ltd',contactName:'Chen Rong',email:'hello@promogoods.cn',phone:'+86 755 77669988',country:'China',currency:Currency.RMB,address:'Nanshan District, Shenzhen'}});

  const productsInput = [
    ['Mousepad 400x900mm', ProductType.MOUSEPAD, ProductCategory.MOUSEPADS, 18, 5, 8.9, 100, 'pcs'],
    ['Mousepad 300x800mm RGB', ProductType.RGB_MOUSEPAD, ProductCategory.MOUSEPADS, 26, 5, 14.5, 100, 'pcs'],
    ['Custom Dry-fit Shirt Black M', ProductType.DRY_FIT_SHIRT, ProductCategory.APPAREL, 19, 5, 9.9, 50, 'pcs'],
    ['Custom Hoodie Navy L', ProductType.HOODIE, ProductCategory.APPAREL, 45, 5, 23.5, 30, 'pcs'],
    ['Custom Lanyard 20mm', ProductType.LANYARD, ProductCategory.ACCESSORIES, 2.8, 5, 1.8, 300, 'pcs'],
    ['Microfiber Towel 35x75cm', ProductType.MICROFIBER_TOWEL, ProductCategory.TOWELS, 8.5, 5, 5.8, 100, 'pcs'],
    ['Name Tent 30x10cm', ProductType.NAME_TENT, ProductCategory.STATIONERY, 3.6, 5, 2.5, 100, 'pcs'],
    ['Custom Socks', ProductType.CUSTOM_SOCKS, ProductCategory.APPAREL, 12.5, 5, 7.8, 100, 'pairs']
  ] as const;

  const created = [] as any[];
  for (const [productName, productType, category, unitCostRmb, exchangeRate, sellingPriceSgd, moq, unit] of productsInput) {
    const c = calc(unitCostRmb, exchangeRate, sellingPriceSgd);
    const product = await prisma.product.create({data:{productName,productType,category,supplierId:supplier.id,supplierName:supplier.name,supplierPhone:supplier.phone,supplierContactName:supplier.contactName,supplierEmail:supplier.email,supplierCountry:supplier.country,description:`${productName} production variant`,status:ProductStatus.ACTIVE,costCurrency:Currency.RMB,unitCostRmb,exchangeRate,unitCostSgd:c.unitCostSgd,sellingPriceSgd,grossProfitPerUnit:c.grossProfitPerUnit,grossMarginPercentage:c.grossMarginPercentage,moq,unit}});
    created.push(product);
  }

  const tierProduct = created[0];
  await prisma.productPriceTier.createMany({data:[
    (()=>{const c=calc(15,5,8.9);return{productId:tierProduct.id,minQuantity:100,unitCostRmb:15,exchangeRate:5,unitCostSgd:c.unitCostSgd,sellingPriceSgd:8.9,grossProfitPerUnit:c.grossProfitPerUnit,grossMarginPercentage:c.grossMarginPercentage};})(),
    (()=>{const c=calc(13.5,5,8.4);return{productId:tierProduct.id,minQuantity:300,unitCostRmb:13.5,exchangeRate:5,unitCostSgd:c.unitCostSgd,sellingPriceSgd:8.4,grossProfitPerUnit:c.grossProfitPerUnit,grossMarginPercentage:c.grossMarginPercentage};})()
  ]});

  await prisma.productSizeVariant.createMany({data:[{productId:created[2].id,size:'M'},{productId:created[2].id,size:'L'},{productId:created[3].id,size:'L'}]});
  await prisma.productAttachment.create({data:{productId:tierProduct.id,fileName:'mousepad-size-chart.pdf',fileUrl:'/uploads/products/mousepad-size-chart.pdf',mimeType:'application/pdf',sizeBytes:150000,attachmentType:ProductAttachmentType.SIZE_CHART_PDF,description:'Size chart placeholder'}});
  await prisma.productActivity.create({data:{productId:tierProduct.id,type:'PRODUCT_CREATED',description:'Product created from seed'}});

  const quotation = await prisma.quotation.create({data:{quotationNumber:'Q-2026-0001',customerId:customer.id,status:QuotationStatus.SENT,currency:Currency.SGD,exchangeRate:0.2,subtotal:1000,shippingCost:100,totalCost:1100,totalSellingPrice:1800,grossProfit:700,grossMargin:38.89,validUntil:new Date('2026-12-31')}});
  const salesOrder = await prisma.salesOrder.create({data:{salesOrderNumber:'SO-2026-0001',quotationId:quotation.id,customerId:customer.id,status:SalesOrderStatus.CONFIRMED,orderDate:new Date(),totalSellingPrice:1800}});
  await prisma.quotationItem.create({data:{quotationId:quotation.id,productId:tierProduct.id,description:'Mousepad run',quantity:200,unitCost:3,lineCost:600,unitSellingPrice:9,lineSellingPrice:1800}});
  await prisma.salesOrderItem.create({data:{salesOrderId:salesOrder.id,productId:tierProduct.id,description:'Mousepad run',quantity:200,unitSellingPrice:9,lineSellingPrice:1800}});
  await prisma.supplierOrder.create({data:{supplierOrderNumber:'PO-2026-0001',supplierId:supplier.id,salesOrderId:salesOrder.id,status:SupplierOrderStatus.ORDERED,currency:Currency.RMB,exchangeRate:0.2,subtotalForeignCurrency:3000,subtotalSgd:600,shippingCostSgd:120,totalCostSgd:720}});
}
main().finally(async()=>prisma.$disconnect());
