export interface ConfigInterface {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
  };
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  settings: {
    grain: boolean;
    gradient: boolean;
    pages: {
      title: string;
      path: string;
      meta_description: string | undefined;
    }[];
    header: {
      brand: {
        format: "name" | "avatar";
        text?: string;
      };
      fixed: boolean;
      themeSwitcher?: boolean;
    };
    footer: {
      themeSwitcher?: boolean;
    };
    socialLinks: {
      name?: string;
      url: string;
    }[];
  };
}
