export class SetWithContentEquality<T extends object> {
  private items: T[] = [];
  private getKey: (item: T) => string;

  constructor(getKey: (item: T) => string) {
    this.getKey = getKey;
  }

  clone() {
    const v = new SetWithContentEquality(this.getKey);
    v.items = [...this.items];
    return v;
  }

  add(item: T): void {
    const key = this.getKey(item);
    const index = this.items.findIndex((v) => this.getKey(v) === key);
    if (index >= 0) {
      this.items[index] = item;
    } else {
      this.items.push(item);
    }
  }

  get(key: string): T | undefined {
    const index = this.items.findIndex((v) => this.getKey(v) === key);
    if (index >= 0) return this.items[index];
    return undefined;
  }

  delete(key: string): T | undefined;
  delete(item: T): T | undefined;
  delete(item: string | T): T | undefined {
    if (typeof item === "string") {
      return this._delete(item);
    } else {
      return this._delete(this.getKey(item));
    }
  }
  private _delete(key: string): T | undefined {
    const index = this.items.findIndex((v) => this.getKey(v) === key);
    if (index >= 0) {
      const deleted = this.items.splice(index, 1);
      return deleted[0];
    }
    return undefined;
  }

  has(item: T): boolean {
    return this.items.some((existing) =>
      this.getKey(existing) === this.getKey(item)
    );
  }

  find(predicate: (v: T) => boolean) {
    return this.items.find(predicate);
  }

  get values(): T[] {
    return [...this.items];
  }

  get length(): number {
    return this.items.length;
  }
}
