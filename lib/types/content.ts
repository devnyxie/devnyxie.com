import { ZodObject, ZodPipe } from "zod";

export type schemaType = ZodObject | ZodPipe<any, any>;

type t_content_config_item = {
  source: string;
  schema: schemaType;
};

type t_content_config = {
  pages: {
    [key: string]: t_content_config_item;
  };
  content: {
    [key: string]: t_content_config_item;
  };
};

export default t_content_config;
