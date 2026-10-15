// Stack implemented using an array (JavaScript Array).
// The end of the array is the top of the stack.
const MAX_SIZE = 10;
const stack = [];

const pushInput = document.getElementById("pushValue");
const stackView = document.getElementById("stackView");
const statusMessage = document.getElementById("status");
const sizeLabel = document.getElementById("sizeLabel");
const topLabel = document.getElementById("topLabel");
const topPointer = document.getElementById("topPointer");

function showStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = type;
}

function readInteger() {
  const raw = pushInput.value.trim();

  if (raw === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isSafeInteger(value) ? value : null;
}

function push(value) {
  if (stack.length >= MAX_SIZE) {
    return false;
  }

  stack.push(value);
  return true;
}

function pop() {
  if (stack.length === 0) {
    return { success: false, value: null };
  }

  return { success: true, value: stack.pop() };
}

function peek() {
  if (stack.length === 0) {
    return null;
  }

  return stack[stack.length - 1];
}

// Redraws the stack after every operation.
// Array index 0 is at the bottom; the last element is at the top.
function render() {
  stackView.replaceChildren();
  sizeLabel.textContent = `Size: ${stack.length}`;
  topLabel.textContent = `Top: ${stack.length ? stack[stack.length - 1] : "None"}`;
  topPointer.hidden = stack.length === 0;

  if (stack.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "The stack is empty.";
    stackView.appendChild(empty);
    return;
  }

  for (let index = 0; index < stack.length; index++) {
    const item = document.createElement("div");
    const isTop = index === stack.length - 1;
    item.className = isTop ? "stack-item top-item" : "stack-item";
    item.textContent = isTop
      ? `${stack[index]}  ← TOP`
      : String(stack[index]);
    stackView.appendChild(item);
  }
}

document.getElementById("pushBtn").addEventListener("click", () => {
  const value = readInteger();

  if (value === null) {
    showStatus("Enter a valid whole-number value to push.", "error");
    return;
  }

  if (!push(value)) {
    showStatus(`Stack overflow: the stack can hold at most ${MAX_SIZE} items.`, "error");
    return;
  }

  pushInput.value = "";
  pushInput.focus();
  render();
  showStatus(`Pushed ${value} onto the stack.`, "success");
});

document.getElementById("popBtn").addEventListener("click", () => {
  const result = pop();

  if (!result.success) {
    showStatus("Stack underflow: cannot pop from an empty stack.", "error");
    render();
    return;
  }

  render();
  showStatus(`Popped ${result.value} from the top of the stack.`, "success");
});

document.getElementById("peekBtn").addEventListener("click", () => {
  const value = peek();

  if (value === null) {
    showStatus("The stack is empty. There is no top element to peek at.", "error");
    return;
  }

  showStatus(`Top element is ${value}. It was not removed.`, "success");
});

document.getElementById("displayBtn").addEventListener("click", () => {
  render();
  showStatus(
    stack.length
      ? `Displayed the stack with ${stack.length} item(s).`
      : "The stack is empty."
  );
});

document.getElementById("clearBtn").addEventListener("click", () => {
  stack.length = 0;
  render();
  showStatus("Stack cleared successfully.", "success");
});

render();
