function Node(data) {
  return { data, left: null, right: null }
}

function Tree(arr) {
  const root = buildTree(arr, 0, arr.length - 1)

  function find(value, node = root) {
    if (node === null) return null

    if (node.data === value) return node

    if (node.data < value) return find(value, node.right)
    else return find(value, node.left)
  }

  function findPrev(value, node = root, preNode = null) {
    if (node === null) return null

    if (node.data === value) return preNode

    if (node.data < value) return findPrev(value, node.right, node)
    else return findPrev(value, node.left, node)
  }

  function insert(value, node = root) {
    if (!root) root = new Node(value)

    if (!node.left && !node.right) {
      if (value < node.left) {
        node.left = new Node(value)
        return
      } else {
        node.right = new Node(value)
        return
      }
    }

    if (value < node.data) node = node.left
    else node = node.right

    insert(value, node)
  }

  function deleteNode(value) {
    let node = find(value)
    if (node.left && node.right) {
      let nextLargest = node.right
      while (nextLargest.left) {
        nextLargest = nextLargest.left
      }
      console.log(nextLargest)
      let previousNode = findPrev(nextLargest.data)
      node.data = nextLargest.data
      if (nextLargest.right) node.right = nextLargest.right
      if (previousNode !== node) previousNode.left = null
    } else if (node.left || node.right) {
      if (node.left) node.data = node.left.data
      else node.data = node.right.data
      node.left = null
      node.right = null
    } else {
      let previousNode = findPrev(value)
      if (previousNode.left && previousNode.left.data === value)
        previousNode.left = null
      else previousNode.right = null
    }
  }

  return { root, find, findPrev, insert, deleteNode }
}

function buildTree(arr, start, end) {
  arr.sort((a, b) => a - b)
  const uniqueArr = [...new Set(arr)]

  if (start > end) return null
  let mid = parseInt((start + end) / 2)
  let root = new Node(uniqueArr[mid])

  root.left = buildTree(uniqueArr, start, mid - 1)
  root.right = buildTree(uniqueArr, mid + 1, end)

  return root
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

//const tree = Tree([20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85])
const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
tree.deleteNode(2)
prettyPrint(tree.root)
