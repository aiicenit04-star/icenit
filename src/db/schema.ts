import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  linkedin: text("linkedin"),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
});

export const modules = sqliteTable("modules", {
  id: text("id").primaryKey(), // slug like 'hallazgos'
  category: text("category").notNull(), // 'analitica-avanzada', 'aplicaciones', 'apoyo-a-la-gestion'
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  metaDescription: text("meta_description").notNull(),
  description: text("description").notNull(),
});

export const moduleFeatures = sqliteTable("module_features", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  moduleId: text("module_id").notNull().references(() => modules.id),
  feature: text("feature").notNull(),
});

export const useCases = sqliteTable("use_cases", {
  id: text("id").primaryKey(), // slug like 'investigacion-de-accidente'
  title: text("title").notNull(),
  context: text("context").notNull(),
  challenge: text("challenge").notNull(),
  strategy: text("strategy").notNull(),
  results: text("results").notNull(), // JSON string or list of results
});

export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const demoRequests = sqliteTable("demo_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const jobApplications = sqliteTable("job_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  message: text("message"),
  cvUrl: text("cv_url").notNull(), // Path to uploaded file
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});
