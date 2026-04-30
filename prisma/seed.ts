import { PrismaClient, Currency, PaymentStatus, PaymentType, QuotationStatus, SalesOrderStatus, ShipmentStatus, SupplierOrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.supplierOrderItem.deleteMany();
  await prisma.supplierOrder.deleteMany();
  await prisma.salesOrderItem.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.customer.deleteMany();

  const [customerA, customerB] = await Promise.all([
    prisma.customer.create({ data: { companyName: 'Northpoint Student Union', contactName: 'Alicia Tan', email: 'alicia@northpoint.edu.sg', phone: '+65 9123 4567', address: '12 Northpoint Ave, Singapore', notes: 'Orders seasonal event merchandise.' } }),
    prisma.customer.create({ data: { companyName: 'Peakline Corporate Pte Ltd', contactName: 'Daniel Goh', email: 'daniel@peakline.com.sg', phone: '+65 9876 5432', address: '81 Robinson Road, Singapore', notes: 'Needs quarterly staff welcome kits.' } })
  ]);
  const [supplierA, supplierB] = await Promise.all([
    prisma.supplier.create({ data: { name: 'Guangzhou Apex Apparel Co', contactName: 'Liu Wei', email: 'sales@apexapparel.cn', phone: '+86 20 8888 1234', country: 'China', currency: Currency.RMB, address: 'Baiyun District, Guangzhou', notes: 'Main supplier for custom apparel.' } }),
    prisma.supplier.create({ data: { name: 'Shenzhen Promo Goods Ltd', contactName: 'Chen Rong', email: 'hello@promogoods.cn', phone: '+86 755 7766 9988', country: 'China', currency: Currency.RMB, address: 'Nanshan District, Shenzhen', notes: 'Specializes in accessories and swag.' } })
  ]);
  const products = await Promise.all([
    prisma.product.create({ data: { name: 'Custom Dry-fit Shirt', category: 'Apparel', description: 'Sublimated quick-dry tee', supplierId: supplierA.id, costCurrency: Currency.RMB, costPrice: 18.5, sellingPrice: 15, moq: 100, unit: 'pcs', weightKg: 0.2 } }),
    prisma.product.create({ data: { name: 'Custom Hoodie', category: 'Apparel', description: 'Cotton fleece hoodie with print', supplierId: supplierA.id, costCurrency: Currency.RMB, costPrice: 48, sellingPrice: 42, moq: 50, unit: 'pcs', weightKg: 0.6 } }),
    prisma.product.create({ data: { name: 'Custom Lanyard', category: 'Accessories', description: 'Polyester neck lanyard', supplierId: supplierB.id, costCurrency: Currency.RMB, costPrice: 3.2, sellingPrice: 1.8, moq: 300, unit: 'pcs', weightKg: 0.03 } }),
    prisma.product.create({ data: { name: 'Custom Mousepad', category: 'Desk Items', description: 'Rubber base mousepad', supplierId: supplierB.id, costCurrency: Currency.RMB, costPrice: 7.5, sellingPrice: 5.6, moq: 200, unit: 'pcs', weightKg: 0.12 } }),
    prisma.product.create({ data: { name: 'Microfiber Towel', category: 'Sports', description: 'Quick-dry microfiber towel', supplierId: supplierA.id, costCurrency: Currency.RMB, costPrice: 9.8, sellingPrice: 8.2, moq: 150, unit: 'pcs', weightKg: 0.15 } })
  ]);
  const quotation = await prisma.quotation.create({ data: { quotationNumber: 'Q-2026-0001', customerId: customerA.id, status: QuotationStatus.SENT, currency: Currency.SGD, exchangeRate: 0.19, subtotal: 2640, shippingCost: 280, totalCost: 2920, totalSellingPrice: 4100, grossProfit: 1180, grossMargin: 28.78, validUntil: new Date('2026-06-15'), items: { create: [ { productId: products[0].id, description: 'Custom Dry-fit Shirt for orientation', quantity: 200, unitCost: 3.52, unitSellingPrice: 8.5, lineCost: 704, lineSellingPrice: 1700 }, { productId: products[2].id, description: 'Event lanyard with buckle', quantity: 400, unitCost: 0.61, unitSellingPrice: 2.2, lineCost: 244, lineSellingPrice: 880 } ] } } });
  const salesOrder = await prisma.salesOrder.create({ data: { salesOrderNumber: 'SO-2026-0001', quotationId: quotation.id, customerId: customerA.id, status: SalesOrderStatus.CONFIRMED, orderDate: new Date('2026-04-20'), expectedDeliveryDate: new Date('2026-05-22'), totalSellingPrice: 4100, items: { create: [ { productId: products[0].id, description: 'Custom Dry-fit Shirt for orientation', quantity: 200, unitSellingPrice: 8.5, lineSellingPrice: 1700 }, { productId: products[2].id, description: 'Event lanyard with buckle', quantity: 400, unitSellingPrice: 2.2, lineSellingPrice: 880 } ] } } });
  const supplierOrder = await prisma.supplierOrder.create({ data: { supplierOrderNumber: 'PO-2026-0001', supplierId: supplierA.id, salesOrderId: salesOrder.id, status: SupplierOrderStatus.ORDERED, currency: Currency.RMB, exchangeRate: 0.19, subtotalForeignCurrency: 4050, subtotalSgd: 769.5, shippingCostSgd: 230, totalCostSgd: 999.5, items: { create: [ { productId: products[0].id, description: 'Custom Dry-fit Shirt bulk run', quantity: 200, unitCostForeignCurrency: 18.5, lineCostForeignCurrency: 3700 }, { productId: products[4].id, description: 'Microfiber Towel add-on', quantity: 50, unitCostForeignCurrency: 7, lineCostForeignCurrency: 350 } ] } } });
  await prisma.shipment.create({ data: { supplierOrderId: supplierOrder.id, shippingMethod: 'Air Freight', trackingNumber: 'EVG2026AIR001', weightKg: 52.4, boxCount: 8, costSgd: 230, status: ShipmentStatus.IN_TRANSIT } });
  await prisma.payment.create({ data: { salesOrderId: salesOrder.id, amount: 2050, currency: Currency.SGD, paymentType: PaymentType.DEPOSIT, status: PaymentStatus.PARTIALLY_PAID, dueDate: new Date('2026-05-05'), paidDate: new Date('2026-04-25') } });

  console.log(`Seeded customers: ${customerA.companyName}, ${customerB.companyName}`);
}

main().finally(async () => prisma.$disconnect());
