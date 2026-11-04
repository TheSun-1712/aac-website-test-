import { PrismaClient } from "@prisma/client";
import {
  readCollection,
  addItem as jsonAddItem,
  updateItem as jsonUpdateItem,
  deleteItem as jsonDeleteItem,
} from "@/lib/jsonStore";

let prismaInstance = null;
function getPrisma() {
  if (!prismaInstance) {
    try {
      prismaInstance = new PrismaClient({
        log: ["error"],
      });
    } catch (e) {
      prismaInstance = null;
    }
  }
  return prismaInstance;
}

// Table name mapping to Prisma models
const TABLE_MODELS = {
  news: "news",
  projects: "project",
  events: "event",
  publications: "publication",
  patents: "patent",
  books: "book",
  alumni: "alumni",
  startups: "startup",
  corecommittee: "coreCommittee",
  achievements: "achievement",
};

const getPrismaModel = (tableName) => {
  const modelName = TABLE_MODELS[tableName.toLowerCase()];
  if (!modelName) return null;
  const p = getPrisma();
  return p ? p[modelName] : null;
};

// Helper function to transform data for database
const transformDataForDB = (tableName, data) => {
  const lowerTable = tableName.toLowerCase();

  switch (lowerTable) {
    case "news":
      return {
        id: data._id || data.id,
        title: data.title,
        slug: data.slug?.current || data.slug,
        content: data._rawBody || data.body || data.content,
        rawBody: data._rawBody,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        categories: data.categories,
        status: data.status || "published",
        mainImageUrl: data.mainImageUrl || data.mainImage?.asset?.url,
        mainImageAltText: data.mainImageAltText || data.mainImage?.asset?.altText,
        links: data.links ? JSON.stringify(data.links) : null,
      };

    case "projects":
      return {
        id: data._id || data.id,
        title: data.title,
        slug: data.slug?.current || data.slug || data.title,
        description: data.description,
        content: data._rawBody || data.body || data.content,
        rawBody: data._rawBody,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        author: data.author,
        categories: data.categories,
        status: data.status || "active",
        names: data.names ? JSON.stringify(data.names) : null,
        mainImageUrl: data.mainImageUrl || data.mainImage?.asset?.url,
        mainImageAltText: data.mainImageAltText || data.mainImage?.asset?.altText,
        githubRepo: data.githubRepo || null,
      };

    case "events":
      return {
        id: data.id,
        title: data.event || data.title,
        slug: data.event || data.title,
        description: data.description,
        detailedDescription: data.detailedDescription,
        date: data.date,
        actualDate: data.actualDate ? new Date(data.actualDate) : null,
        location: data.location || "GRIET Campus, Hyderabad",
        organizer: data.organizer || "Advanced Academic Center",
        status: data.status || "completed",
        mainImageUrl: data.mainImageUrl || data.img,
        images: data.images ? JSON.stringify(data.images) : null,
        ctaText: data.ctaText || data.cta?.text,
        ctaLink: data.ctaLink || data.cta?.link,
        path: data.path,
      };

    case "publications":
      return {
        id: data.id || `pub-${Date.now()}`,
        title: data.title,
        abstract: data.abstract,
        publication: data.publication || data.journal,
        category: data.category,
        year: parseInt(data.year) || new Date().getFullYear(),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        authors: JSON.stringify(data.authors || []),
        image: data.image,
        downloadUrl: data.downloadUrl || data.paperLink,
        keywords: data.keywords ? JSON.stringify(data.keywords) : null,
        type: data.type || "Journal Paper",
      };

    case "patents":
      return {
        id: data.id || `patent-${Date.now()}`,
        title: data.title,
        shortTitle: data.shortTitle,
        description: data.description,
        applicationNumber: data.applicationNumber,
        patentOffice: data.patentOffice || "India",
        date: data.date ? new Date(data.date) : new Date(),
        status: data.status || "PUBLISHED ONLINE",
        category: data.category,
        color: data.color || "purple",
        inventors: JSON.stringify(data.inventors || []),
        image: data.image,
      };

    case "books":
      return {
        id: data.id || `book-${Date.now()}`,
        title: data.title,
        description: data.description,
        category: data.category,
        year: parseInt(data.year) || new Date().getFullYear(),
        cover: data.cover,
        color: data.color || "blue",
        status: data.status || "published",
        authors: JSON.stringify(data.authors || []),
      };

    case "alumni":
      return {
        id: data.Id || data.id,
        name: data.Name || data.name,
        designation: data.Designation || data.designation,
        company: data.Company || data.company,
        image: data.Image || data.image,
        graduationYear: data.graduationYear,
        department: data.department,
        status: data.status || "active",
        email: data.email,
        linkedin: data.linkedin,
        currentLocation: data.currentLocation,
        achievements: data.achievements,
        bio: data.bio,
      };

    case "startups":
      return {
        id: data.id || `startup-${Date.now()}`,
        name: data.name,
        description: data.description,
        mission: data.mission,
        category: data.category,
        color: data.color || "blue",
        status: data.status || "Active",
        establishedDate: data.establishedDate ? new Date(data.establishedDate) : new Date(),
        website: data.website,
        logo: data.logo,
        image: data.image,
        founders: JSON.stringify(data.founders || []),
      };

    case "corecommittee":
      return {
        id: data.id || `cc-${Date.now()}`,
        name: data.name,
        designation: data.designation,
        image: data.image,
        year: parseInt(data.year) || 2025,
        department: data.department,
        status: data.status || "active",
      };

    case "achievements":
      return {
        id: data.id || `achieve-${Date.now()}`,
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : new Date(),
        names: JSON.stringify(data.names || []),
        images: JSON.stringify(data.images || []),
        mainImage: data.mainImage,
        category: data.category,
        status: data.status || "published",
      };

    default:
      return data;
  }
};

// Helper to prevent database connection timeouts from stalling responses
const withTimeout = (promise, ms = 200) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("DB Timeout")), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

export default async function handler(req, res) {
  const { params } = req.query;
  const [tableName, id] = params || [];

  if (!tableName) {
    return res.status(400).json({ error: "Table name is required" });
  }

  const tableKey = tableName.toLowerCase();
  const model = getPrismaModel(tableKey);

  switch (req.method) {
    case "GET": {
      // 1. Try Prisma if available (with fast 200ms timeout fallback)
      if (model) {
        try {
          if (id) {
            const item = await withTimeout(model.findUnique({ where: { id } }), 200);
            if (item) return res.status(200).json({ data: item });
          } else {
            const items = await withTimeout(model.findMany({ orderBy: { createdAt: "desc" } }), 200);
            if (items && items.length > 0) {
              return res.status(200).json({ data: items });
            }
          }
        } catch (dbErr) {
          // Fast fall through to local JSON store
        }
      }

      // 2. Reliable File-backed JSON store
      const localItems = readCollection(tableKey);
      if (id) {
        const found = localItems.find((i) => i.id === id || i._id === id);
        if (!found) return res.status(404).json({ error: "Item not found" });
        return res.status(200).json({ data: found });
      }
      return res.status(200).json({ data: localItems });
    }

    case "POST": {
      const body = req.body || {};
      let createdPrisma = null;

      // 1. Attempt Prisma if available (with 400ms timeout)
      if (model) {
        try {
          const transformed = transformDataForDB(tableKey, body);
          createdPrisma = await withTimeout(model.create({ data: transformed }), 400);
        } catch (e) {
          // Continue to JSON store
        }
      }

      // 2. Always persist to JSON store
      const savedItem = jsonAddItem(tableKey, body);
      return res.status(201).json({ data: createdPrisma || savedItem });
    }

    case "PUT": {
      if (!id) return res.status(400).json({ error: "ID is required for updates" });
      const body = req.body || {};
      let updatedPrisma = null;

      if (model) {
        try {
          const transformed = transformDataForDB(tableKey, body);
          updatedPrisma = await model.update({
            where: { id },
            data: { ...transformed, updatedAt: new Date() },
          });
        } catch (e) {
          // Continue to JSON store
        }
      }

      const updatedItem = jsonUpdateItem(tableKey, id, body);
      if (!updatedItem && !updatedPrisma) {
        return res.status(404).json({ error: "Item not found" });
      }
      return res.status(200).json({ data: updatedPrisma || updatedItem });
    }

    case "DELETE": {
      if (!id) return res.status(400).json({ error: "ID is required for deletion" });

      if (model) {
        try {
          await model.delete({ where: { id } });
        } catch (e) {
          // Continue to JSON store
        }
      }

      jsonDeleteItem(tableKey, id);
      return res.status(200).json({ message: "Item deleted successfully" });
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
