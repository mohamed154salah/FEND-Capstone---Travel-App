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

  var formurl = document.getElementById("zip").value;
  console.log(formurl);

  console.log("::: Form Submitted :::");

  postData("http://localhost:8080/api", { url: formurl }).then(function (res) {
    document.getElementById("date").innerHTML = `${res.geonames[0].countryName}`;
    document.getElementById("content").innerHTML = `${res.geonames[0].lat}`;
    document.getElementById("temp").innerHTML = `${res.geonames[0].lng}`;
  });
}

export { handleSubmit };
