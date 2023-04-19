class ListNode {
  key: number;
  value: number;
  prev: ListNode | null;
  next: ListNode | null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  capacity: number;
  map: Map<number, ListNode>;
  head: ListNode | null;
  tail: ListNode | null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }

  private remove(node: ListNode) {
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

  private addToHead(node: ListNode) {
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

  get(key: number): number {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;

      this.remove(node);
      this.addToHead(node);

      return node.value;
    }

    return -1;
  }

  put(key: number, value: number): void {
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

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // Output: 1
cache.put(3, 3);
console.log(cache.get(2)); // Output: -1
cache.put(4, 4);
console.log(cache.get(1)); // Output: -1
console.log(cache.get(3)); // Output: 3
console.log(cache.get(4)); // Output: 4
