## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### 🔹getElementById()
- Selects one element using its **id**.
- Returns a single element.
```JavaScript Code:
const id = document.getElementById('id')
```

### 🔹getElementsByClassName()
- Selects elements using **class name**
- It can selects multiple elements
- It also returns an HTMLCollection.
```JavaScript code
const items = doucment.getElementsByClassName('item')
```

### 🔹querySelector()
- It selects first matching element.
- We can also use it for CSS selector.
```JavaScript
const item = document.querySelector('.item')
const item = document.querySelector('#item')
```

### 🔹querySelectorAll()
- It selects all matching elements
- It returns a NodeList
- We can also use it for CSS selector.
```javascript
const items = document.querySelectorAll(".item");
```

## 2. How do you create and insert a new element into the DOM?

### Step-1: First of all create an element
```JavaScript Code:
const div = document.createElement('div');
```
### Step-2: Then add content
```JavaScript Code:
div.innerText = "Web Development";
```
### Step-3: Now Insert this new div into DOM using appendChild()
```JavaScript Code:
document.body.appnedChild(div);
```

## 3. What is Event Bubbling? And how does it work?

- Event is called when you click on a child element, the event run first of all on its element, then it goes up to its parent, then to the parent's parent,

```html Code:
    <div id="parentsParent">
        <div id="parent">
            <button id="child">click</button>
        </div>
    </div>
```

## 4. What is Event Delegation in JavaScript? Why is it useful?

- Event Delegation means One parent that controls all children
- we add one event listener to their parent and this event listener handle everything from there.

## What is the difference between preventDefault() and stopPropagation() methods?

### 🔹 preventDefault()
- it prevent the default browser action.

```JavaScript Code: 
e.preventDefault();
```

### 🔹stopPropagation()
- it prevent the event from bubbling to parent elements.

```JavaScript Code:
 e.stopPropagation()
```