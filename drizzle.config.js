/** @type {import('drizzle-kit').Config} */

export default {
  schema: "./src/lib/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://gendb_owner:IWqsz1AE9PDt@ep-late-grass-a1y2ob7l.ap-southeast-1.aws.neon.tech/gendb?sslmode=require",
  },
};
