// Alternative YAML parsing using js-yaml

import fs from "fs";
import yaml from "js-yaml";
import { ZodObject, ZodType } from "zod";
import { schemaType } from "../types/content";

export function parseYamlFile(filePath: string, schema: schemaType) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = yaml.load(fileContent);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid YAML data in ${filePath}: ${parsed.error.message}`
      );
    }
    return parsed.data;
  } catch (error) {
    throw new Error(`Failed to parse YAML file ${filePath}: ${error}`);
  }
}
