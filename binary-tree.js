'use strict';
function root(data)
{
	this.data = data
	this.left =  null
	this.right = null
}

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		if (this.root == null)
			this.root = new root(data);
		else
			this.node_position(this.root, data);
	}

	node_position(element, data) {
		var dir = (data < element.data) ? 'left' : 'right';
		if(element[dir] == null)
			element[dir] = new Node(data);
		else
			this.node_position(element[dir], data);
	}

	contains(data) {
		var temp = this.root;
		while(1) {
			if(temp == null)
				return false;
			if(temp.data == data)
				return true;
			else
				temp = (data < temp.data) ? temp.left : temp.right;
		}
	}

	remove(data) {
		var temp = this.root;
		var prev = null;
		while(1) {
			if(temp == null)
				return;
			if(temp.data == data) {
				if(temp == this.root) {
					this.remove_root();
					return;
				}
				var dir = (prev.data > temp.data) ? 'left' : 'right';
				this.remove_node(prev, dir, temp);
				return;
			}
			else {
				prev = temp;
				temp = (data < temp.data) ? temp.left : temp.right;
			}
		}
	}

	remove_root() {
		var temp_left = this.root.left;
		if(temp_left == null) {
			this.root = this.root.right;
			return;
		}
		else {
			while(temp_left.right != null)
				temp_left = temp_left.right;
			temp_left.right = this.root.right;
			this.root = temp_left;
			return;
		}
	}

	remove_node(prev, dir, node) {
		var temp_right = node.right;
		if(temp_right == null) {
			prev[dir] = node.left;
			return;
		}
		else {
			while(temp_right.left != null)
				temp_right = temp_right.left;
			prev[dir] = temp_right;
			temp_right.left = node.left;
			return;
		}
	}

	size() {
		this.elements_count = 0;
		if(this.root)
			this.size_counter(this.root);
		return this.elements_count;
	}

	size_counter(element){
		this.elements_count++;
		if(element.right)
			this.size_counter(element.right);
		if(element.left)
			this.size_counter(element.left);
	}	

	isEmpty() {
		return (this.root == null) ? true: false;
	}
}
