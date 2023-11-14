let parseXML = async (responseText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");
  let forecastElement = document.querySelector("#library");
  forecastElement.innerHTML = "";

  let timeArr = xml.querySelectorAll("book");

  let jsonFile = await loadJson();

  timeArr.forEach((book) => {
    let Publisher = book.querySelector("Publisher").textContent;
    let BookAuthor = book.querySelector("Book-Author").textContent;
    let BookTitle = book.querySelector("Book-Title").textContent;
    let YearOfPublication = book.querySelector(
      "Year-Of-Publication"
    ).textContent;
    let imgURL_M = getImage(jsonFile, book.querySelector("ISBN").textContent);

    let plantilla = `
      <div class="col-lg-2 mb-2 text-center book">
        <div class="card border-0 rounded-0">
          <div class="card-image">
            <img src="${imgURL_M}" alt="blog-img" class="img-fluid">
          </div>
        </div>
        <div class="card-body text-capitalize">
          <div class="card-meta fs-6">
            <span class="meta-date author"> ${BookAuthor} </span>
            <span class="meta-category">/ <a href="blog.html" class="year"> ${YearOfPublication} </a>/ </span>
            <span class="meta-date publisher"> ${Publisher} </span>
          </div>
          <h4 class="card-title">
            <a href="buy.html" class="title"> ${BookTitle} </a>
          </h4>
        </div>
      </div>`;

    forecastElement.innerHTML += plantilla;
  });
};

let loadJson = async () => {
  let URL =
    "https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json";
  try {
    let response = await fetch(URL);
    let responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error("Error al cargar el JSON:", error);
    return null;
  }
};

let getImage = (jsonBooks, isbn) => {
  let imageURL_M;
  jsonBooks.forEach((books) => {
    if (books.ISBN == isbn) {
      imageURL_M = books["Image-URL-M"];
    }
  });
  return imageURL_M;
};

let loadContent = async (event) => {
  try {
    let url =
      "https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml";

    let response = await fetch(url);
    let responseText = await response.text();

    await parseXML(responseText);
  } catch (error) {
    console.log(error);
  }
};

const button = document.querySelector(".btn");
button.addEventListener("click", () => {
  const data = document.querySelectorAll("#library .book");
  let text = document.getElementById("newsletter1").value.toLowerCase();
  data.forEach(function (book) {
    let title = book.querySelector(".title").textContent;
    let author = book.querySelector(".author").textContent;
    let year = book.querySelector(".year").textContent;
    let publisher = book.querySelector(".publisher").textContent;

    if (
      !(
        title.toLowerCase().includes(text) ||
        author.toLowerCase().includes(text) ||
        year.toString().includes(text) ||
        publisher.toLowerCase().includes(text)
      )
    ) {
      book.classList.add("hide");
    } else {
      book.classList.remove("hide");
    }
  });
});

loadContent();
