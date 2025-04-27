interface Session {
    user: {
      id: string;
      name: string;
      email: string | null;
      companyId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    companyId: string | null;
  }