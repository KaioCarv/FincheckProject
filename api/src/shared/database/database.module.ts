import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BankAccountsRepository } from './repositories/bank-account.repositories';
import { CategoriesRepository } from './repositories/categories.repositories copy';
import { TransactionsRepository } from './repositories/transactions.repositories ';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
