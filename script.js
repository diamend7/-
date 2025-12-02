class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // Вставка елемента
    insert(key) {
        if (!this.root) {
            this.root = new Node(key);
            return;
        }
        let current = this.root;
        while (true) {
            if (key < current.key) {
                if (!current.left) {
                    current.left = new Node(key);
                    break;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = new Node(key);
                    break;
                }
                current = current.right;
            }
        }
    }

    // Симетричний обхід (Inorder)
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.key);
            this.inorder(node.right, result);
        }
        return result;
    }

    // Прямий обхід (Preorder)
    preorder(node = this.root, result = []) {
        if (node) {
            result.push(node.key);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
        }
        return result;
    }

    // Зворотний обхід (Postorder)
    postorder(node = this.root, result = []) {
        if (node) {
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.key);
        }
        return result;
    }
}

const variant11 = [41, 52, 47, 65, 95, 38, 15, 50, 99];
const bst = new BST();

console.log("Вхідна послідовність:", variant11);

variant11.forEach(num => bst.insert(num));

console.log("Inorder:", bst.inorder());
console.log("Preorder:", bst.preorder());
console.log("Postorder:", bst.postorder());
