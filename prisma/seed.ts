import { Currency, CustomerStatus, CustomerTag, CustomerType, FollowUpType, PrismaClient, QuotationStatus, SalesOrderStatus, SupplierOrderStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.customerActivity.deleteMany(); await prisma.customerFollowUp.deleteMany(); await prisma.customerAttachment.deleteMany(); await prisma.customerNote.deleteMany();
  await prisma.payment.deleteMany(); await prisma.shipment.deleteMany(); await prisma.supplierOrderItem.deleteMany(); await prisma.supplierOrder.deleteMany(); await prisma.salesOrderItem.deleteMany(); await prisma.salesOrder.deleteMany(); await prisma.quotationItem.deleteMany(); await prisma.quotation.deleteMany(); await prisma.product.deleteMany(); await prisma.supplier.deleteMany(); await prisma.customer.deleteMany();

  const school = await prisma.customer.create({data:{contactName:'Ms. Cheryl Lim',companyName:'Northpoint Secondary School',email:'cheryl@northpoint.edu.sg',phone:'+65 8123 2211',customerType:CustomerType.SCHOOL,status:CustomerStatus.ACTIVE,tags:[CustomerTag.REQUIRES_FOLLOW_UP,CustomerTag.FREQUENT_BUYER],deliveryAddressLine1:'12 Northpoint Ave',deliveryPostalCode:'760012',deliveryCountry:'Singapore',billingAddressLine1:'12 Northpoint Ave',billingPostalCode:'760012',billingCountry:'Singapore',notes:'Orders orientation merchandise yearly.'}});
  const b2c = await prisma.customer.create({data:{contactName:'Jason Tan',companyName:'',email:'jason.tan@email.com',phone:'+65 9001 7788',customerType:CustomerType.B2C_CUSTOMER,status:CustomerStatus.LEAD,tags:[CustomerTag.PRICE_SENSITIVE],deliveryAddressLine1:'55 Bedok North St 3',deliveryPostalCode:'460055',deliveryCountry:'Singapore',notes:'Interested in custom mousepads for gaming group.'}});

  await prisma.customerNote.create({data:{customerId:school.id,content:'Requested updated quotation for sports day towels + shirts.'}});
  await prisma.customerFollowUp.create({data:{customerId:b2c.id,title:'Ask for artwork',description:'Need final logo in PNG',type:FollowUpType.ASK_FOR_ARTWORK,dueDate:new Date(Date.now()+86400000*2)}});
  await prisma.customerActivity.createMany({data:[
    {customerId:school.id,type:'CUSTOMER_CREATED',description:'Customer created from seed.'},
    {customerId:school.id,type:'CUSTOMER_NOTE_ADDED',description:'Initial note added.'},
    {customerId:b2c.id,type:'CUSTOMER_CREATED',description:'B2C mousepad customer added.'}
  ]});

  const supplier = await prisma.supplier.create({data:{name:'Guangzhou Apex Apparel Co',contactName:'Liu Wei',email:'sales@apexapparel.cn',phone:'+86 20 8888 1234',country:'China',currency:Currency.RMB,address:'Baiyun District, Guangzhou'}});
  const product = await prisma.product.create({data:{name:'Custom Dry-fit Shirt',category:'Apparel',description:'Sublimated quick-dry tee',supplierId:supplier.id,costCurrency:Currency.RMB,costPrice:18.5,sellingPrice:24,moq:100,unit:'pcs',weightKg:0.2}});
  const quotation = await prisma.quotation.create({data:{quotationNumber:'Q-2026-0001',customerId:school.id,status:QuotationStatus.SENT,currency:Currency.SGD,exchangeRate:0.19,subtotal:1200,shippingCost:180,totalCost:1380,totalSellingPrice:2200,grossProfit:820,grossMargin:37.27,validUntil:new Date('2026-06-15')}});
  const salesOrder = await prisma.salesOrder.create({data:{salesOrderNumber:'SO-2026-0001',quotationId:quotation.id,customerId:school.id,status:SalesOrderStatus.CONFIRMED,orderDate:new Date('2026-04-20'),totalSellingPrice:2200}});
  await prisma.quotationItem.create({data:{quotationId:quotation.id,productId:product.id,description:'School dri-fit shirt',quantity:200,unitCost:3.52,unitSellingPrice:11,lineCost:704,lineSellingPrice:2200}});
  await prisma.salesOrderItem.create({data:{salesOrderId:salesOrder.id,productId:product.id,description:'School dri-fit shirt',quantity:200,unitSellingPrice:11,lineSellingPrice:2200}});
  await prisma.supplierOrder.create({data:{supplierOrderNumber:'PO-2026-0001',supplierId:supplier.id,salesOrderId:salesOrder.id,status:SupplierOrderStatus.ORDERED,currency:Currency.RMB,exchangeRate:0.19,subtotalForeignCurrency:3700,subtotalSgd:703,shippingCostSgd:190,totalCostSgd:893}});
}
main().finally(async()=>prisma.$disconnect());
