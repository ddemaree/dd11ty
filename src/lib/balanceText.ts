/* 

Balances text blocks, making them as narrow as possible while maintaining their current height (i.e. number of lines), preventing typographic 'widows' and
'orphans' (single words on a line by themselves).

As of early 2023, native browser support for text balancing is planned but not yet implemented. See https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap

This feature can be previewed in Chrome 114+ by enabling the `Experimental Web Platform features` flag in `chrome://flags`.

For browsers that don't yet support `text-wrap`, this script uses a binary search to find the narrowest width that maintains the current height, based on
the New York Times' implementation: https://github.com/nytimes/text-balancer/


*/
export class TextBalancer {
  elements: HTMLElement[];
  resizeTimeout: ReturnType<typeof setTimeout> | null;

  static supportsNativeBalance() {
    try {
      return CSS.supports("text-wrap", "balance");
    } catch (e) {
      return false;
    }
  }

  constructor() {
    this.elements = [];
    this.resizeTimeout = null;
  }

  add(element: HTMLElement) {
    if (this.elements.includes(element)) return;
    console.log("Gonna balance ", element);
    this.elements.push(element);
  }

  remove(element: HTMLElement) {
    this.elements = this.elements.filter((e) => e !== element);
  }

  balance() {
    this.elements.forEach((element) => {
      // If the browser supports native balancing, use that instead.
      if (TextBalancer.supportsNativeBalance()) {
        // If the element already has text-wrap: balance, skip it
        // so a style attribute doesn't mess with anything
        const elemStyle = window.getComputedStyle(element);
        // @ts-ignore
        if (elemStyle.textWrap === "balance") return;

        // @ts-ignore
        element.style.textWrap = "balance";
      }
      // Otherwise, use our own implementation.
      else if (textElementIsMultipleLines(element)) {
        element.style.maxWidth = "";
        squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
      }
    });
  }

  resize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.balance();
    }, 100);
  }

  watch() {
    this.balance();

    window.addEventListener("resize", this.resize.bind(this));

    return () => {
      window.removeEventListener("resize", this.resize.bind(this));
    };
  }
}

export function balanceTextElement(element: HTMLElement) {
  if (textElementIsMultipleLines(element)) {
    element.style.maxWidth = "";
    squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
  }
}

// Make the element as narrow as possible while maintaining its current height (number of lines). Binary search.
function squeezeContainer(
  element: HTMLElement,
  originalHeight: number,
  bottomRange: number,
  topRange: number
) {
  var mid;
  if (bottomRange >= topRange) {
    element.style.maxWidth = topRange + "px";
    return;
  }
  mid = (bottomRange + topRange) / 2;
  element.style.maxWidth = mid + "px";

  if (element.clientHeight > originalHeight) {
    // we've squoze too far and element has spilled onto an additional line; recurse on wider range
    squeezeContainer(element, originalHeight, mid + 1, topRange);
  } else {
    // element has not wrapped to another line; keep squeezing!
    squeezeContainer(element, originalHeight, bottomRange + 1, mid);
  }
}

// function to see if a headline is multiple lines
// we only want to break if the headline is multiple lines
//
// We achieve this by turning the first word into a span
// and then we compare the height of that span to the height
// of the entire headline. If the headline is bigger than the
// span by 10px we balance the headline.
function textElementIsMultipleLines(element: HTMLElement) {
  let firstWordHeight;
  let elementHeight;
  let firstWord: HTMLSpanElement | null = null;

  let ORIGINAL_ELEMENT_TEXT = element.innerHTML;

  // usually there is around a 5px discrepency between
  // the first word and the height of the whole headline
  // so subtract the height of the headline by 10 px and
  // we should be good
  let HEIGHT_OFFSET = 10;

  // get all the words in the headline as
  // an array -- will include punctuation
  //
  // this is used to put the headline back together
  let elementWords = element.innerHTML.split(" ");

  // make span for first word and give it an id
  // so we can access it in le dom
  firstWord = document.createElement("span");
  firstWord.id = "element-first-word";
  firstWord.innerHTML = elementWords[0];

  // this is the entire headline
  // as an array except for first word
  //
  // we will append it to the headline after the span
  elementWords = elementWords.slice(1);

  // empty the headline and append the span to it
  element.innerHTML = "";
  element.appendChild(firstWord);

  // add the rest of the element back to it
  element.innerHTML += " " + elementWords.join(" ");

  // update the first word variable in the dom
  firstWord = document.getElementById("element-first-word");
  if (!firstWord) return false;

  firstWordHeight = firstWord.offsetHeight;
  elementHeight = element.offsetHeight;
  // restore the original element text
  element.innerHTML = ORIGINAL_ELEMENT_TEXT;

  // compare the height of the element and the height of the first word
  return elementHeight - HEIGHT_OFFSET > firstWordHeight;
}
