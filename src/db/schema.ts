import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  linkedin: text("linkedin"),
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
});

export const modules = pgTable("modules", {
  id: text("id").primaryKey(), // slug like 'hallazgos'
  category: text("category").notNull(), // 'analitica-avanzada', 'aplicaciones', 'apoyo-a-la-gestion'
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  metaDescription: text("meta_description").notNull(),
  description: text("description").notNull(),
});

export const moduleFeatures = pgTable("module_features", {
  id: serial("id").primaryKey(),
  moduleId: text("module_id").notNull().references(() => modules.id),
  feature: text("feature").notNull(),
});

export const useCases = pgTable("use_cases", {
  id: text("id").primaryKey(), // slug like 'investigacion-de-accidente'
  title: text("title").notNull(),
  context: text("context").notNull(),
  challenge: text("challenge").notNull(),
  strategy: text("strategy").notNull(),
  results: text("results").notNull(), // List of results split by \n
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const demoRequests = pgTable("demo_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  position: text("position").notNull(),
  message: text("message"),
  cvUrl: text("cv_url").notNull(), // Path or Base64 Data URL
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
