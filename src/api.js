import axios from "axios";
import "./setting";

export default {
  login: (mail, password) => {
    const request = {
      mail: mail,
      password: password
    };

    fetch("http://localhost:8081/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(response => {
        if (response.status == 500) {
          throw "No data in Database";
        }
        return response.json();
      })
      .then(reader => {
        console.log(reader.name);
        console.log(reader.id);
        return reader;
      })
      .catch(error => {
        console.log(error);
      });
  },

  resetLogin: (mail, name) => {
    axios
      .post("http://localhost:8081/resetLogin", {
        mail: mail,
        name: name
      })
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  },
  newLogin: (mail, name, password) => {
    const request = {
      mail: mail,
      name: name,
      password: password
    };

    fetch("http://localhost:8081/newLogin", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
      .then(response => {
        if (response.status == 500) {
          throw "Error in Database";
        } else if (response.status == 501) {
          throw "Mail is already registered";
        }
        return response.json();
      })
      .then(reader => {
        console.log("登録に成功しました");
        return reader;
      })
      .catch(error => {
        console.log(error);
        // return error;
      });
  }
};
