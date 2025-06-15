import {
  pgTable, 
  serial, 
  varchar,
  integer, 
  timestamp,
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

export const consultas = pgTable('consultas', {
    id: serial('id').primaryKey(),
    usuario_id: integer('usuario_id').references(() => usuarios.id),
    nome: varchar('nome', { length: 255 }).notNull(),
    idade: integer('idade').notNull(),
    peso: numeric('peso', { precision: 5, scale: 2 }).notNull(),
    altura: numeric('altura', { precision: 5, scale: 2 }).notNull(),
    tipo_sanguineo: varchar('tipo_sanguineo', { length: 5 }).notNull(),
    historico_de_saude: text('historico_de_saude').notNull(),
    area_medica_desejada: varchar('area_medica_desejada', { length: 255 }).notNull(),
    data_e_hora: timestamp('data_e_hora').notNull(),
    motivo: text('motivo').notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

export const consultas_pet = pgTable('consultas_pet', {
    id: serial('id').primaryKey(),
    usuario_id: integer('usuario_id').references(() => usuarios.id),
    nome_pet: varchar('nome_pet', { length: 255 }).notNull(),
    especie: varchar('especie', { length: 100 }).notNull(),
    raca: varchar('raca', { length: 100 }),
    sexo: varchar('sexo', { length: 50 }),
    esterilizacao: varchar('esterilizacao', { length: 50 }),
    cor: varchar('cor', { length: 100 }),
    peso_pet: numeric('peso_pet', { precision: 5, scale: 2 }),
    identificacao_pet: varchar('identificacao_pet', { length: 255 }),
    historico_saude_pet: text('historico_saude_pet'),
    motivo_consulta_pet: text('motivo_consulta_pet').notNull(),
    data_e_hora: timestamp('data_e_hora').notNull(),
    created_at: timestamp('created_at').defaultNow(),
});

export const profissionais = pgTable('profissionais', {
    id: serial('id').primaryKey(),
    nome: varchar('nome', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    senha: varchar('senha', { length: 255 }).notNull(),
    especialidade: varchar('especialidade', { length: 255 }),
    crm: varchar('crm', { length: 50 }).unique(),
    created_at: timestamp('created_at').defaultNow(),
});