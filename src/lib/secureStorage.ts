import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

type StorageData = Record<string, unknown>;

class SecureStorageService {
  private storagePath: string;
  private keyPath: string;
  private data: StorageData;
  private encryptionKey: Buffer;

  constructor() {
    this.storagePath = path.join(app.getPath('userData'), 'secureStorage.json');
    this.keyPath = path.join(app.getPath('userData'), 'secureStorage.key');
    this.encryptionKey = this.loadOrGenerateKey();
    this.data = this.loadData();
  }

  private loadOrGenerateKey(): Buffer {
    try {
      const key = fs.readFileSync(this.keyPath);
      return key;
    } catch (error: unknown) {
      if ((error as { code?: string }).code === 'ENOENT') {
        const key = crypto.randomBytes(32);
        fs.writeFileSync(this.keyPath, key);
        return key;
      }
      throw error;
    }
  }

  private encrypt(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  private decrypt(data: string): string {
    const parts = data.split(':');
    const iv = Buffer.from(parts.shift()!, 'hex');
    const encrypted = parts.join(':');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private loadData(): StorageData {
    try {
      const encryptedData = fs.readFileSync(this.storagePath, 'utf-8');
      const decryptedData = this.decrypt(encryptedData);
      return JSON.parse(decryptedData);
    } catch (error: unknown) {
      if ((error as { code?: string }).code === 'ENOENT') {
        return {};
      }
      return {};
    }
  }

  private saveData(): void {
    const encryptedData = this.encrypt(JSON.stringify(this.data));
    fs.writeFileSync(this.storagePath, encryptedData, 'utf-8');
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

export const secureStorage = new SecureStorageService();