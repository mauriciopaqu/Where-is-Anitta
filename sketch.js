let gameState = "startScreen"; // Initial state
let message = "Ricky! Did you find Anita?: Yes (A) or No (D)";
let img1, img2, img3, img4, img5, img6, pic6, img7, startImg, levelTwoImg;
let restartButton, startButton, continueButton;
let fadeAmount = 0;
let isFading = false;
let invalidInputMessage = "";
let bgMusic, screamSound; // Background and scream audio
let musicPlaying = false; // Track if the music is playing
let screamPlayed = false; // Track if the scream has already played

function preload() {
  soundFormats('mp3', 'ogg'); // Use both formats for compatibility
  
  img1 = loadImage("pic1.jpg");
  img2 = loadImage("pic2.jpg");
  img3 = loadImage("pic3.jpg");
  img4 = loadImage("pic4.jpg");
  img5 = loadImage("pic3.jpg");
  img6 = loadImage("pic5.png");
  pic6 = loadImage("pic6.jpg");
  img7 = loadImage("pic7.jpg");
  startImg = loadImage("ryan.png");
  levelTwoImg = loadImage("anita.jpg");
  
  // Load background and scream sound effects
  bgMusic = loadSound("bgmusic.mp3");
  screamSound = loadSound("scream1.mp3");
}

function setup() {
  createCanvas(400, 400);
  textSize(18);
  
  restartButton = createButton("Restart");
  restartButton.position(10, 10);
  restartButton.mousePressed(goToStart);
  restartButton.hide();
  
  startButton = createButton("Start Game");
  startButton.position(width / 2 - 50, height / 2 + 50);
  startButton.mousePressed(startGame);
  
  continueButton = createButton("Continue to Level 2");
  continueButton.position(width - 120, 10);
  continueButton.mousePressed(startLevelTwo);
  continueButton.hide();
}

function draw() {
  background(0);

  if (isFading) {
    fadeAmount += 10;
    if (fadeAmount >= 255) {
      isFading = false;
      fadeAmount = 0;
    }
  }

  stroke(0);
  strokeWeight(2);
  fill(255);

  if (gameState === "startScreen") {
    fadeImage(startImg);
    textAlign(CENTER, CENTER);
    text("", width / 2, height / 2 - 50);
    startButton.show();
  } else if (gameState === "levelTwoScreen") {
    fadeImage(levelTwoImg);
    textAlign(CENTER, CENTER);
    text("Level 2: Dinner Time!", width / 2, height / 2 - 50);
    continueButton.html("Start");
    continueButton.show();
  } else if (gameState === "levelThreeScreen") {
    fadeImage(img5);
    textAlign(CENTER, BOTTOM);
    text("Grab an item:\nCandle lamp (A) or pillow (D)", width / 2, height - 10);
  } else if (gameState === "candleLampSelected") {
    fadeImage(img6);
    textAlign(CENTER, BOTTOM);
    text("Throw lamp?\nYes (A) | No (D)", width / 2, height - 10);
  } else if (gameState === "burningDown") {
    fadeImage(pic6);
    textAlign(CENTER, BOTTOM);
    text(
      "Everything is burning down.\nYou need to jump off the window,\n" +
        "but there's a puzzle locking it\n" +
        "his eyes were free like the sea...\n Press 1, 2, 3, 4 or 5",
      width / 2,
      height - 10
    );
  } else if (gameState === "pillowSelected") {
    fadeImage(img4);
    textAlign(CENTER, BOTTOM);
    text("Silly girl wanted to play games", width / 2, height - 10);
  } else if (gameState === "anitaSafe") {
    fadeImage(img7);
    textAlign(CENTER, BOTTOM);
    text(
      "Anita broke a leg, but survived.\nPolice arrived. She’s safe and the couple died.",
      width / 2,
      height - 10
    );
  } else if (gameState === "pic7Screen") {
    fadeImage(img7);
    textAlign(CENTER, BOTTOM);
    text("Police arrived due to the smoke.\nThere are no survivors", width / 2, height - 10);

    // Play the scream sound only once when entering this screen
    if (!screamPlayed) {
      screamSound.play();
      screamPlayed = true;
    }
  } else {
    startButton.hide();

    if (gameState === "No") fadeImage(img2);
    else if (gameState === "Sleeping") fadeImage(img3);
    else if (gameState === "on the table") fadeImage(img4);
    else fadeImage(img1);

    textAlign(CENTER, BOTTOM);
    text(message, width / 2, height - 10);

    if (invalidInputMessage !== "") {
      fill(255, 0, 0);
      text(invalidInputMessage, width / 2, height - 30);
    }
  }

  if (gameState !== "startScreen") restartButton.show();
  else restartButton.hide();
}

function fadeImage(img) {
  tint(255, 255 - fadeAmount);
  image(img, 0, 0, width, height);
  noTint();
}

function keyPressed() {
  invalidInputMessage = "";

  if (gameState === "start") {
    if (key === 'A' || key === 'a') {
      gameState = "Yes";
      message = "Where is she?:\nSleeping (A) | on the table (D)";
      isFading = true;
    } else if (key === 'D' || key === 'd') {
      gameState = "No";
      message = "YOU USELESS!\nSHE ESCAPED!!!";
      isFading = true;
    } else {
      invalidInputMessage = "Please press 'A' or 'D'";
    }
  } else if (gameState === "Yes") {
    if (key === 'A' || key === 'a') {
      gameState = "Sleeping";
      message = "Great, bring her down for dinner.";
      isFading = true;
      continueButton.show();
    } else if (key === 'D' || key === 'd') {
      gameState = "on the table";
      message = "Oh, darling!\nThank you, I was starving";
      isFading = true;
    } else {
      invalidInputMessage = "Please press 'A' or 'D'";
    }
  } else if (gameState === "levelThreeScreen") {
    if (key === 'A' || key === 'a') {
      gameState = "candleLampSelected";
    } else if (key === 'D' || key === 'd') {
      gameState = "pillowSelected";
      message = "Silly girl wanted to play with fire";
    } else {
      invalidInputMessage = "Please press 'A' or 'D'";
    }
  } else if (gameState === "candleLampSelected") {
    if (key === 'A' || key === 'a') {
      gameState = "burningDown";
    } else if (key === 'D' || key === 'd') {
      gameState = "pillowSelected";
    } else {
      invalidInputMessage = "Please press 'A' or 'D'";
    }
  } else if (gameState === "burningDown") {
    if (key === '5') {
      gameState = "anitaSafe";
    } else if (['1', '2', '3', '4'].includes(key)) {
      gameState = "pic7Screen";
      isFading = true;
    } else {
      invalidInputMessage = "Please press a number between 1 and 5";
    }
  }
}

function startGame() {
  gameState = "start";
  message = "Ricky! Did you find Anita?:\nYes (A) | No (D)?";

  if (!musicPlaying) {
    bgMusic.loop();
    musicPlaying = true;
  }
}

function startLevelTwo() {
  if (continueButton.html() === "Start") {
    gameState = "levelThreeScreen";
    continueButton.hide();
  } else {
    gameState = "levelTwoScreen";
    continueButton.html("Start");
  }
}

function goToStart() {
  gameState = "startScreen";
  startButton.show();
  continueButton.hide();
  fadeAmount = 0;
  isFading = false;
  message = "Ricky! Did you find Anita?: Yes (A) or No (D)";
  screamPlayed = false; // Reset scream state
}
