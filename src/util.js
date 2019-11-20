// json文件数据的读写
var fs = require("fs");
var fileSaver = require("./FileSaver");
var filename = "./assets/data/house.json";
export const getDataByJson1 = function () {
  console.log("getDataByJson1");
  return new Promise((resolve, reject) => {
    $.ajax({
      url:filename,
      type:"GET",
      dataType:"json",
      success:function (data) {
        console.log("house1",data);
        resolve(data);
      },
      fail:function (error) {
        console.log("house-error",error);
        reject(error);
      }
    })
  })
}

export  const getDataByJson2 = function() {
  console.log("getDataByJson2");
  return new Promise((resolve, reject) => {
    $.getJSON(filename,"",function (data) {
      console.log("house2",data);
      resolve(data);
    });
  })
}

export const nodeReadJson = function() {
  var result = JSON.parse(fs.readFileSync(filename));
  console.log("house-node",result);
}

export const writeDataInJson = function(data) {
  if(fs.existsSync(filename)){
    // var dir = fs.readdirSync(filename);//文件夹读取，可错做循环执行
    console.log("read",data);
    fs.writeFileSync(filename,data);
  }
}

export const writeJson = function(data) {
  if(data) {
    console.log("writeJson",data);
    var file = new File([data], filename, { type: "text/plain;charset=utf-8" });
    fileSaver.saveAs(file);
  }
}
