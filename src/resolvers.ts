import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface BookArgs {
  id: string;
  author: string;
  title: string;
  year?: number;
}

export const resolvers = {
  Query: {
    books: async () => await prisma.book.findMany(),
    book: async (_: unknown, { id }: { id: string }) => 
      await prisma.book.findUnique({ where: { id: parseInt(id) } }),
  },
  Mutation: {
    addBook: async (_: unknown, { author, title, year }: BookArgs) => {
      return await prisma.book.create({
        data: { author, title, year: year || 0 },
      });
    },
    
    updateBook: async (_: unknown, { id, ...data }: BookArgs) => {
      return await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
          ...(data.author && { author: data.author }),
          ...(data.title && { title: data.title }),
          ...(data.year && { year: data.year }),
        },
      });
    },
    
    deleteBook: async (_: unknown, { id }: { id: string }) => {
      return await prisma.book.delete({ where: { id: parseInt(id) } });
    },
    
    addTestBooks: async () => {
      const testBooks = [
        { author: 'Лев Толстой', title: 'Война и мир', year: 1869 },
        { author: 'Фёдор Достоевский', title: 'Преступление и наказание', year: 1866 },
        { author: 'Антон Чехов', title: 'Вишнёвый сад', year: 1904 },
      ];
      
      return await prisma.$transaction(
        testBooks.map(book => prisma.book.create({ data: book }))
      );
    },
  },
};