function handleSubmit(event) {
  event.preventDefault();
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const DAt = await response.json();
      console.log("Data received:", DAt);
      return DAt;
    } catch (error) {
      console.log("error", error);
    }
  };
  if (document.getElementById("c").value != 0) {
    document.getElementsByClassName(
      "city"
    )[0].innerHTML = document.getElementById("c").value;
    document.getElementsByClassName(
      "city"
    )[1].innerHTML = document.getElementById("c").value;
    var formurl = document.getElementById("c").value;
  } else {
    alert("you should enter city");
  }
  const getDays = (dat, dates) => {
    var Difference_In_Time = dates.getTime() - dat.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    return Difference_In_Days + 1 + " days";
  };
  let n = new Date();
  let depart = new Date(document.getElementById("departing").value);
  let k = depart.getFullYear();
  let b = depart.getMonth() + 1;
  let r = depart.getDate();
  document.getElementById("date").innerHTML = b + "/" + r + "/" + k;

  let retur = new Date(document.getElementById("finish").value);

  document.getElementById("durate").innerHTML = getDays(depart, retur);

  document.getElementById("remainingDays").innerHTML = getDays(n, depart);

  console.log(formurl);
  var county;
  console.log("::: Form Submitted :::");

  postData("http://localhost:8080/api", { url: formurl }).then(function (res) {
    document.getElementsByClassName(
      "country"
    )[0].innerHTML = `${res.geonames[0].countryName}`;
    document.getElementsByClassName(
      "country"
    )[1].innerHTML = `${res.geonames[0].countryName}`;

    /* document.getElementById("content").innerHTML = `${res.geonames[0].lat}`;
    document.getElementById("temp").innerHTML = `${res.geonames[0].lng}`; */
    county = `${res.geonames[0].countryName}`;
    console.log(county);

    postData("http://localhost:8080/country", { con:county }).then(function (
      res
    ) {
      let arr=res;
      console.log(`${arr[0].region}`);
      document.getElementById("region").innerHTML = `${arr[0].region}`;
      document.getElementById("currencies").innerHTML = `${arr[0].currencies[0].name}`;
      document.getElementById("languages").innerHTML = `${arr[0].languages[0].name}`;
      document.getElementById("flag").src = `${arr[0].flag}`;
    });

    postData("http://localhost:8080/weatherbit", {
      url: formurl,
      con: county,
    }).then(function (res) {
      document.getElementById(
        "high"
      ).innerHTML = `${res.data[0].max_temp}&#8451;`;
      document.getElementById(
        "low"
      ).innerHTML = `${res.data[0].low_temp}&#8451;`;
      document.getElementById(
        "cloud"
      ).innerHTML = `${res.data[0].weather.description}`;
    });
  });
  postData("http://localhost:8080/pixabay", { url: formurl }).then(function (
    res
  ) {
    document.getElementById("ph").src = `${res.hits[0].webformatURL}`;
  });


}

export { handleSubmit };
