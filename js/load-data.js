let parseXML = async (responseText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(responseText, "application/xml");

  console.log(xml);

  let forecastElement = document.querySelector("#library");
  forecastElement.innerHTML = "";

  let timeArr = xml.querySelectorAll("book");

  let jsonFile = await loadJson();

  timeArr.forEach((book) => {
    let BookAuthor = book.querySelector("Book-Author").textContent;
    let BookTitle = book.querySelector("Book-Title").textContent;
    let YearOfPublication = book.querySelector(
      "Year-Of-Publication"
    ).textContent;
    let imgURL_M =  getImage(jsonFile, book.querySelector("ISBN").textContent);

    let plantilla = `
      <div class="col-lg-2 mb-2 text-center">
        <div class="card border-0 rounded-0">
          <div class="card-image">
            <img src="${imgURL_M}" alt="blog-img" class="img-fluid">
          </div>
        </div>
        <div class="card-body text-capitalize">
          <div class="card-meta fs-6">
            <span class="meta-date"> ${BookAuthor} </span>
            <span class="meta-category">/ <a href="blog.html"> ${YearOfPublication} </a></span>
          </div>
          <h4 class="card-title">
            <a href="buy.html"> ${BookTitle} </a>
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
    console.log(responseJSON);
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

loadContent();
