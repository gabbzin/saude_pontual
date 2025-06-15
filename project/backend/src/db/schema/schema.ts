import {
  pgTable, 
  serial, 
  varchar,
  text, 
  numeric, 
  date 
} from 'drizzle-orm/pg-core';


export const usuarios = pgTable('usuarios', {
    id: serial('id').primaryKey(),
    nome: varchar('nome', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    telefone: varchar('telefone', { length: 20 }),
    data_nascimento: date('data_nascimento'),
    senha: varchar('senha', { length: 255 }).notNull(),

    // Campos adicionais
    altura: numeric('altura', { precision: 3, scale: 2 }),
    peso: numeric('peso', { precision: 5, scale: 2 }),
    tipo_sanguineo: varchar('tipo_sanguineo', { length: 5 }),
    historico_de_saude: text('historico_de_saude'),
    alergias_conhecidas: text('alergias_conhecidas'),
    remedio_continuo: text('remedio_continuo'),
});