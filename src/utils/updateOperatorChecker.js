const operatorChecker = (ph) => {
 const regMyTel = /^(09|\+?959)6(8|9)\d{7}$/;
 const regMpt = /^(09|\+?959)(5\d{6}|4\d{7,8}|2\d{6,8}|3\d{7,8}|6\d{6}|8\d{6}|7\d{7}|9(0|1|9)\d{5,6}|2[0-4]\d{5}|5[0-6]\d{5}|8[13-7]\d{5}|3[0-369]\d{6}|34\d{7}|4[1379]\d{6}|73\d{6}|91\d{6}|25\d{7}|26[0-5]\d{6}|40[0-4]\d{6}|42\d{7}|45\d{7}|89[6789]\d{6}|)$/;
 const regOdo = /^(09|\+?959)9(5|7|6)\d{7}$/;
 const regTelenor = /^(09|\+?959)7([5-9])\d{7}$/;
 const regMec = /^(093|\+?9593)(0|1|2|3|6)\d{6}$/g;
 // 093(0|1|2|3|6)\\d{6}
 let phoneNumber = 0;
 if (ph.length > 11) {
  phoneNumber = ph.substr(0, ph.length - 1);
 } else {
  phoneNumber = ph;
 }

 if (phoneNumber.match(regMyTel)) {
  return 1;
 } if (phoneNumber.match(regMpt)) {
  return 2;
 } if (phoneNumber.match(regOdo)) {
  return 3;
 } if (phoneNumber.match(regTelenor)) {
  return 4;
 } if (phoneNumber.match(regMec)) {
  return 5;
 }
 return 0;
};

export default operatorChecker;
