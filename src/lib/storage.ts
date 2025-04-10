import { app } from 'electron';
import fs from 'fs';
import path from 'path';

type StorageData = Record<string, unknown>;

class StorageService {
  private storagePath: string;
  private data: StorageData;

  constructor() {
    this.storagePath = path.join(app.getPath('userData'), 'storage.json');
    this.data = this.loadData();
  }

  private loadData(): StorageData {
    try {
      const rawData = fs.readFileSync(this.storagePath, 'utf-8');
      return JSON.parse(rawData);
    } catch (error: unknown) {
      if ((error as { code?: string }).code === 'ENOENT') {
        return {};
      }
      return {};
    }
  }

  private saveData(): void {
    fs.writeFileSync(this.storagePath, JSON.stringify(this.data), 'utf-8');
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    return this.data[key] as T ?? defaultValue;
  }

  public set(key: string, value: unknown): void {
    this.data[key] = value;
    this.saveData();
  }

  public delete(key: string): void {
    delete this.data[key];
    this.saveData();
  }

  public clear(): void {
    this.data = {};
    this.saveData();
  }
}

export const storage = new StorageService();
