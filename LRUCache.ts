class ListNode<K, V> {
    key: K;
    value: V;
    prev: ListNode<K, V> | null;
    next: ListNode<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache<K, V> {
    capacity: number;
    map: Map<K, ListNode<K, V>>;
    head: ListNode<K, V> | null;
    tail: ListNode<K, V> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    remove(node: ListNode<K, V>) {
        if (node.prev !== null) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next !== null) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }

    addToHead(node: ListNode<K, V>) {
        node.next = this.head;
        node.prev = null;

        if (this.head !== null) {
            this.head.prev = node;
        }

        this.head = node;

        if (this.tail === null) {
            this.tail = node;
        }
    }

    get(key: K): V | -1 {
        if (this.map.has(key)) {
            const node = this.map.get(key)!;

            this.remove(node);
            this.addToHead(node);

            return node.value;
        }

        return -1;
    }

    put(key: K, value: V): void {
        if (this.map.has(key)) {
            const node = this.map.get(key)!;
            node.value = value;

            this.remove(node);
            this.addToHead(node);
        } else {
            const node = new ListNode(key, value);

            this.map.set(key, node);
            this.addToHead(node);

            if (this.map.size > this.capacity) {
                const nodeToRemove = this.tail!;

                this.remove(nodeToRemove);
                this.map.delete(nodeToRemove.key);
            }
        }
    }
}

const cache = new LRUCache<string, { name: string, age: number }>(100);

cache.put('Elijah', { name: 'Elijah Koulaxis', age: 22 });
cache.put('Takis', { name: 'Takis idk', age: 25 });

console.log(cache.get('Elijah')); // {name: 'Elijah Koulaxis', age: 22}
console.log(cache.get('Takis')); // {name: 'Takis idk', age: 25}
