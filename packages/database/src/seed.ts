import { PrismaClient, TransactionType, Currency, TransactionCategory } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Sample transaction data for seeding
const sampleTransactions = [
  // Income transactions
  { type: TransactionType.INCOME, amount: 150000, currency: Currency.ARS, category: TransactionCategory.WORK, description: 'Salario mensual', daysAgo: 30 },
  { type: TransactionType.INCOME, amount: 50000, currency: Currency.ARS, category: TransactionCategory.WORK, description: 'Freelance proyecto', daysAgo: 15 },
  { type: TransactionType.INCOME, amount: 200, currency: Currency.USD, category: TransactionCategory.WORK, description: 'Consultoría remota', daysAgo: 10 },
  { type: TransactionType.INCOME, amount: 25000, currency: Currency.ARS, category: TransactionCategory.SAVINGS, description: 'Rendimientos inversión', daysAgo: 5 },

  // Expense transactions - Current month
  { type: TransactionType.EXPENSE, amount: 45000, currency: Currency.ARS, category: TransactionCategory.FOOD, description: 'Supermercado Carrefour', daysAgo: 2 },
  { type: TransactionType.EXPENSE, amount: 15000, currency: Currency.ARS, category: TransactionCategory.FOOD, description: 'Almuerzo restaurante', daysAgo: 1 },
  { type: TransactionType.EXPENSE, amount: 8500, currency: Currency.ARS, category: TransactionCategory.SUBSCRIPTIONS, description: 'Netflix', daysAgo: 3 },
  { type: TransactionType.EXPENSE, amount: 12000, currency: Currency.ARS, category: TransactionCategory.SUBSCRIPTIONS, description: 'Spotify Premium', daysAgo: 5 },
  { type: TransactionType.EXPENSE, amount: 25000, currency: Currency.ARS, category: TransactionCategory.CAR, description: 'Combustible', daysAgo: 4 },
  { type: TransactionType.EXPENSE, amount: 18000, currency: Currency.ARS, category: TransactionCategory.LEISURE, description: 'Cine IMAX', daysAgo: 7 },
  { type: TransactionType.EXPENSE, amount: 35000, currency: Currency.ARS, category: TransactionCategory.HEALTH, description: 'Médico especialista', daysAgo: 10 },
  { type: TransactionType.EXPENSE, amount: 22000, currency: Currency.ARS, category: TransactionCategory.HOME, description: 'Supermercado limpieza', daysAgo: 8 },

  // Previous month transactions
  { type: TransactionType.EXPENSE, amount: 55000, currency: Currency.ARS, category: TransactionCategory.FOOD, description: 'Supermercado mensual', daysAgo: 35 },
  { type: TransactionType.EXPENSE, amount: 28000, currency: Currency.ARS, category: TransactionCategory.CAR, description: 'Service auto', daysAgo: 40 },
  { type: TransactionType.EXPENSE, amount: 45000, currency: Currency.ARS, category: TransactionCategory.HOME, description: 'Alquiler departamento', daysAgo: 32 },
  { type: TransactionType.EXPENSE, amount: 15000, currency: Currency.ARS, category: TransactionCategory.EDUCATION, description: 'Curso online', daysAgo: 38 },
  
  // Older transactions for chart data
  { type: TransactionType.INCOME, amount: 140000, currency: Currency.ARS, category: TransactionCategory.WORK, description: 'Salario anterior', daysAgo: 60 },
  { type: TransactionType.EXPENSE, amount: 32000, currency: Currency.ARS, category: TransactionCategory.FOOD, description: 'Compras varias', daysAgo: 65 },
  { type: TransactionType.EXPENSE, amount: 18000, currency: Currency.ARS, category: TransactionCategory.LEISURE, description: 'Salida nocturna', daysAgo: 70 },
  
  // USD transactions
  { type: TransactionType.EXPENSE, amount: 50, currency: Currency.USD, category: TransactionCategory.SUBSCRIPTIONS, description: 'Adobe Creative Cloud', daysAgo: 12 },
  { type: TransactionType.EXPENSE, amount: 25, currency: Currency.USD, category: TransactionCategory.EDUCATION, description: 'Udemy courses', daysAgo: 20 },

  // USDT transactions
  { type: TransactionType.INCOME, amount: 100, currency: Currency.USDT, category: TransactionCategory.SAVINGS, description: 'Trading profit', daysAgo: 18 },
  { type: TransactionType.EXPENSE, amount: 30, currency: Currency.USDT, category: TransactionCategory.MISCELLANEOUS, description: 'Crypto fees', daysAgo: 14 },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'juanignaciodelossantos01@gmail.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'juanignaciodelossantos01@gmail.com',
      password: await bcrypt.hash(`${process.env.ADMIN_USER_PASS || 'defaultpass123'}`, 10),
    },
  });

  console.log(`✅ Admin user created/updated: ${adminUser.email}`);

  // Create sample transactions
  console.log('💰 Creating sample transactions...');
  
  for (const transactionData of sampleTransactions) {
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - transactionData.daysAgo);
    
    await prisma.transaction.create({
      data: {
        type: transactionData.type,
        amount: transactionData.amount,
        currency: transactionData.currency,
        category: transactionData.category,
        description: transactionData.description,
        authorId: adminUser.id,
        createdAt,
        updatedAt: createdAt,
      },
    });
  }

  console.log(`✅ Created ${sampleTransactions.length} sample transactions`);

  // Show summary
  const totalIncome = sampleTransactions
    .filter(t => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + (t.currency === Currency.ARS ? t.amount : 0), 0);
  
  const totalExpenses = sampleTransactions
    .filter(t => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + (t.currency === Currency.ARS ? t.amount : 0), 0);

  console.log('\n📊 Seed Summary (ARS):');
  console.log(`   Income: $${totalIncome.toLocaleString()}`);
  console.log(`   Expenses: $${totalExpenses.toLocaleString()}`);
  console.log(`   Balance: $${(totalIncome - totalExpenses).toLocaleString()}`);
  console.log('\n🎉 Database seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
