import { Client } from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export const blogPages = async () => {
  if (process.env.NOTION_DATABASE_ID === undefined)
    throw new Error("Database ID not present in environment.");

  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response;
};
