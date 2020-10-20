let i = 0;

const timedCount = ()=> {
  i = i + 1;
  postMessage(i);
  setTimeout("timedCount()",500);
};

timedCount(); 