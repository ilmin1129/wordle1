const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let time;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center;position:absolute; top:40vh; left:45Vw;background-color:white; width:200px; height:100px;";

    document.body.appendChild(div);
    clearInterval(time);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
  };
  const handleEnterkey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = block.innerText;
      const 정답_글자 = 정답[i];
      if (letter === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#67B360";
      } else if (정답.includes(letter)) block.style.background = "#D6BE52";
      else block.style.background = "#797F7F";
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      if (index !== 0) index -= 1;
    }
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (event.key === "Enter") {
      handleEnterkey();
    } else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index = index + 1;
    }
    if (index === 5) return;

    if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
    }
  };

  const satrtTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeDiv = document.querySelector(".time");
      timeDiv.innerText = `${분.padStart(2, "0")} :${초.padStart(2, "0")}`;
    }

    time = setInterval(setTime, 1000);
  };

  satrtTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
