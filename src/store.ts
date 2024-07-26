export class Store {
    store: Map<string, string>;
    expireTimes: Map<string, number>

    constructor() {
        this.store = new Map();
        this.expireTimes = new Map();
        this.initExpirationCheck();
    }

    private initExpirationCheck() {
        setInterval(() => {
            this.checkExpiration();
        }, 1000);
    }

    private checkExpiration() {
        const now = Date.now();
        for (const [key, expireTime] of this.expireTimes.entries()) {
            if (now > expireTime) {
                this.store.delete(key);
                this.expireTimes.delete(key);
            }
        }
    }

    set(key: string, value: string, ms?: number) {
        this.store.set(key, value);

        if (!ms) {
            this.expireTimes.delete(key);
        } else {
            const value = Date.now() + ms;
            this.expireTimes.set(key, value);
        }
        return this.get(key);
    }

    get(key: string): string | null {
        return this.store.get(key) || null;
    }

    rm(key: string) {
        this.store.delete(key);
        this.expireTimes.delete(key);
        return this.get(key);
    }
}

