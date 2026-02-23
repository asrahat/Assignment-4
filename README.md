## 1. What is the difference between getElementById, getElementByClassName, and querySelector / querySelectorAll?

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

