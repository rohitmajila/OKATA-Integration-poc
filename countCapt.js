
let jsonData
let countryValue
let capitalValue
window.onload = function networkCall() {
  let dropdown = document.getElementById("locality-dropdown");
  dropdown.length = 0;
  let defaultOption = document.createElement('option');
  defaultOption.text = "Choose Country";
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  let capitalDropdown = document.getElementById("capital-dropdown");
  capitalDropdown.length = 0;
  let defaulCapitaltOption = document.createElement('option');
  defaulCapitaltOption.text = "Choose Capital";
  capitalDropdown.add(defaulCapitaltOption);
  capitalDropdown.selectedIndex = 0;

  let url = "http://127.0.0.1:5500/countryCityData.json";
  fetch(url).then(res => res.json()).then(data => {
    let newData = "";
    let capitalData = ""
    data.forEach((data) => {
      newData = document.createElement("option");
      newData.text = data.country
      dropdown.add(newData)

      capitalData = document.createElement("option")
      capitalData.text = data.city
      capitalDropdown.add(capitalData)
    })
    jsonData = data

  })
}

const displayCapital = (dataValue) => {
  let capital = "";
  let capitalIndex;
  let countryArray = []

  jsonData.forEach((data) => {
    countryArray.push(data.country)
  });

  countryArray.map((value, index) => {
    if (value == dataValue) {
      capitalIndex = index
    }
  });

  jsonData.map((value, index) => {
    if (index == capitalIndex) {
      capital = value
    }
  })
  document.getElementById("capital-dropdown").value = capital.city
  capitalValue = capital.city
  countryValue = capital.country
}

const displayState = (dataValue) => {
  let country = "";
  let countryIndex;
  let cityArray = []

  jsonData.forEach((data) => {
    cityArray.push(data.city)
  });

  cityArray.map((value, index) => {
    if (value == dataValue) {
      countryIndex = index
    }
  });

  jsonData.map((value, index) => {
    if (index == countryIndex) {
      country = value
    }
  })
  document.getElementById("locality-dropdown").value = country.country
  capitalValue = country.city
  countryValue = country.country
}

const addColumnRight = () => {
  let tableRef = document.getElementById("table");
  for (let i = 0; i < tableRef.rows.length; i++) {
    createCell(tableRef.rows[i].insertCell(tableRef.rows[i].cells.length - 1), "")
  }
}

const createCell = (cell, text) => {
  let inputTag = document.createElement('input')
  let txt = document.createTextNode(text)
  inputTag.appendChild(txt)
  cell.appendChild(inputTag)

}

const addRowBelow = () => {
  let tableRef = document.getElementById("table");
  let row = tableRef.insertRow(tableRef.rows.length)
  for (let i = 0; i < tableRef.rows[0].cells.length - 1; i++) {
    createCell(row.insertCell(i - 1), "")
  }
}

const deleteRow = () => {
  let tableRef = document.getElementById("table");
  if (tableRef.rows.length > 1) {
    tableRef.deleteRow(tableRef.rows.length - 1)
  }
}

const submitData = () => {
  let tableRef = document.getElementById("table");
  let tableRow = tableRef.rows.length;
  let newArray = [];
  let tableInputArray = []
  for (let i = 0; i < tableRow; i++) {
    let inputTag = tableRef.rows.item(i).getElementsByTagName("input");

    for (j = 0; j < inputTag.length; j++) {
      let inputValue = inputTag[j].value
      tableInputArray.push(inputValue)
    }
    newArray.push(tableInputArray)
    tableInputArray = []
  }
  newArray[0].push(countryValue)
  newArray[0].push(capitalValue)
  console.log(newArray)
}