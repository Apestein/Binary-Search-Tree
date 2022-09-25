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

  return { root, find }
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
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
console.log(tree.find(9))

//prettyPrint(tree.root)
