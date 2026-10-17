const list = document.querySelector("#list");
const message = document.querySelector("#message");

function addItem(book) {
  const li = document.createElement("li");
const author = book.author_name ? book.author_name[0] : "Unknown author";
li.textContent = book.title + " – " + author + " ";  const save = document.createElement("button");
       save.textContent = "Save";
       save.addEventListener("click", function () {
         console.log("save", book.title);
          readingList.push(book);
          renderReadingList();
       });
       li.append(save);
  list.append(li);
}

// A JavaScript object: lives in your code
const book = { title: 'Dune', year: 1965 };
console.log(JSON.stringify({ title: 'Dune' }))

const form = document.querySelector("#search-form");
const input = document.querySelector("#query");

async function getBooks(query) {
  message.textContent = "Searching...";
  const url = "https://openlibrary.org/search.json?limit=10&q=" + encodeURIComponent(query);
  console.log("fetching", url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    list.textContent = "";
    data.docs.forEach(function (book) {
      let author = "Unknown author";
       if(book.author_name) {
      author = book.author_name[0]
      addItem(book);
      }

      addItem(book);
      addItem(book.title + " — " + author);
      
    });
    message.textContent = "Found " + data.docs.length + " books";
    if (data.docs.length === 0) {
      message.textContent = "No books found";
    }
  } catch (error) {
    console.log("something went wrong:", error);
    message.textContent = "Couldn't reach the library. Check your connection.";
  }
}
const readingListElement = document.querySelector("#reading-list");
    const readingList = [];

    function renderReadingList() {
      readingListElement.textContent = "";
      readingList.forEach(function (book, index) {
        const li = document.createElement("li");
        li.textContent = book.title + " ";

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", function () {
          readingList.splice(index, 1);
          renderReadingList();
        });

        li.append(remove);
        readingListElement.append(li);
      });
    }

form.addEventListener("submit", function (event) {
  event.preventDefault();
  getBooks(input.value);
});


