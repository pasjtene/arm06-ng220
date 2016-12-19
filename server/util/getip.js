var os = require('os');
var interfaces = os.networkInterfaces();
var ips = [];
console.log(interfaces);

console.log("###############");
console.log("###############\n");

for(var k in interfaces) {  
  for(var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if(address.family === 'IPv4' && !address.internal) {
      ips.push(address.address);
      console.log(k +': '+address.address);
    }
  }
}

console.log('\n');

console.log(ips);
