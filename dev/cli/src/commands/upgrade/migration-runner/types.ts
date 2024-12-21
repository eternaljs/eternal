export interface MigrationContext {
    framework: string;           // e.g., "next.js", "express"
    runtime: string;             // e.g., "node", "browser"
    adapterName: string;         // Adapter in use, e.g., "@eternal-js/auth-adapter"
    adapterVersion: string;      // Adapter version
  }
  
  export interface MigrationFile {
    sourceCode: string;
    filePath: string;
  }
  