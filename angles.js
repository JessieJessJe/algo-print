const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

//seoul
const lat = math.mapRange(37.5,-180,180,-10,10);
const lng = math.mapRange(127,-180,180,-10,10);

//lisbon
// const lat = math.mapRange(378.723,-180,180,-10,10);
// const lng = math.mapRange(-9.14,-180,180,-10,10);

//nyc
// const lat = math.mapRange(40.7,-180,180,-10,10);
// const lng = math.mapRange(-74,-180,180,-10,10);

//beijing
// const lat = math.mapRange(39.9,-180,180,-10,10);
// const lng = math.mapRange(116.4,-180,180,-10,10);

const mylat = math.mapRange(40.7,-180,180,-10,10);
const mylng = math.mapRange(-74,-180,180,-10,10);




var ZirkonBold = new FontFace('ZirkonBold', 'url(assets/GT-Zirkon-Bold-Trial.otf)');
var ZirkonLight = new FontFace('ZirkonLight', 'url(assets/GT-Zirkon-Ultra-Light-Trial.otf)');

const settings = {
	dimensions: 'a1',
	pixelsPerInch: 300,
	
};

let manager;

let text = 'ANGLES';
let fontSize = 200;
let fontFamily = 'HELVETICA';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const nameCanvas = document.createElement('canvas');
const nameContext = nameCanvas.getContext('2d');


const sketch = ({ context, width, height }) => {
	
	const cell = 160;

	const cols = Math.floor(width * 1.5 / cell);
	const rows = Math.floor(height  * 1.5 / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	nameCanvas.width  = 2000;
	nameCanvas.height = 2000;

	return ({ context, width, height }) => {


		typeContext.fillStyle = 'black';
		typeContext.fillRect(0, 0, cols, rows);

		fontSize = cols * 0.24;

		typeContext.fillStyle = 'white';
		typeContext.font = `${fontSize}px ${fontFamily}`;
		typeContext.textBaseline = 'top';

		const metrics = typeContext.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		const tx = (cols - mw) * 0.1 - mx;
		const ty = (rows - mh) * 0.5 - my;


		//type to be traced
		typeContext.save();
		typeContext.fillStyle = 'white'
		
		typeContext.translate(tx, ty);
		
		typeContext.beginPath();
		typeContext.rect(mx, my, mw, mh);
		typeContext.stroke();

		
		typeContext.fillText(text, 0, 0);
		typeContext.restore();

		const typeData = typeContext.getImageData(0, 0, cols, rows).data;
		
		//----others

		nameContext.fillStyle = 'yellow'
		nameContext.font ='1000px Helvetica';
		nameContext.textBaseline = 'top';
		nameContext.textAlign = 'left';
		nameContext.fillText('LL', 100, 100);

		//-----

		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		context.drawImage(typeCanvas, 0, 0);

		context.drawImage(nameCanvas, 0, 0);

		drawAngles(numCells, cols, typeData, cell, context, 1000, -1800);

		drawAngles(numCells, cols, typeData, cell, context, -4000, 700);

		drawStars(100, context, width, height)

		drawRect(context, width, height, 50)

		//--creating name grid


		// nameCanvas.width  = 1000;
		// nameCanvas.height = 1000;

		// nameContext.fillStyle = 'yellow'
		// nameContext.font ='1000px Helvetica';
		// nameContext.textBaseline = 'middle';
		// nameContext.textAlign = 'center';
		// nameContext.fillText('Laurel Schwult', 100, 100);

		const nameData = nameContext.getImageData(0, 0, 1000, 1000).data;
		console.log(nameData)


		//end of name grid
	};
};

function drawRect(context, width, height,scale){

	const rows = Math.floor(height / 6);

	for (let j = 0; j < 6; j++) {

		context.save();

		context.translate(width/6, j*rows);
		context.translate(rows/3, rows/2)
		context.translate(mylat,mylng);

		context.beginPath(); 
		context.strokeStyle = 'white';
		context.lineWidth = 200;

		// context.moveTo(-mylat*scale,-mylng*scale);
		context.moveTo(0,0);
		context.lineTo(lat*scale,lng*scale);
		
		context.stroke();


		context.restore();
	}

}

function drawStars(cell, context, width, height){

	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {

		context.save();

		const size = randomSize(i * cell,j * cell);
		context.fillRect(i * cell, j * cell, size, size);	
			
		context.restore();
		}
	}

}


function drawAngles(numCells, cols, typeData, cell, context, myX = 0, myY = 0){

	for (let i = 0; i < numCells; i++) {
		const col = i % cols;
		const row = Math.floor(i / cols);

		const x = col * cell;
		const y = row * cell;

		const r = typeData[i * 4 + 0];
		// const g = typeData[i * 4 + 1];
		// const b = typeData[i * 4 + 2];
		// const a = typeData[i * 4 + 3];

		const isrow = isRow(r, row);


		context.fillStyle = 'white';

		context.save();
		context.translate(x+myX, y+myY);
		context.translate(cell * 0.5, cell * 0.5);

		let scale2 = Math.floor(Math.random() * 20)

		if (isrow ){
			context.beginPath(); 

			context.strokeStyle = 'white';
			context.lineWidth = 5;
			context.moveTo(200,0);
			context.lineTo(-50,0);
			// context.arc(0, 0, 20, 10, Math.PI/4);
			context.stroke();
		}

		if (isrow && randomPick ){
				context.beginPath(); 

				context.strokeStyle = 'white';
				context.lineWidth = 5;
				context.moveTo(0,-250);
				context.lineTo(0,250);
				
				context.stroke();
			}

			if (isRowRow(r) ){
				context.beginPath(); 

				context.strokeStyle = 'white';
				context.lineWidth = 25;

				context.translate(mylat,mylng);

				// context.moveTo(-mylat*scale2,-mylng*scale2);
				context.moveTo(0,0);
				context.lineTo(lat*scale2,lng*scale2);
				
				context.stroke();

			}
			
		
		context.restore();

	}
}

const randomPick = () => {
	return random.pick([true,false,false,false]);
}

const randomSize = (x,y)=>{

	const n = random.noise3D(x, y, 0.01, 1);
	const scale = math.mapRange(n, -1, 1, 0, 5);

	return scale
	
}

const isRow = (v,row) => {
	// if (v < 50) return '';
	// if (v < 100) return '.';
	// if (v < 150) return '-';
	if (v > 150){
		return random.pick([true,false]);
} else {
	return false
}

};

const isRowRow = (v) => {
	// if (v < 50) return '';
	// if (v < 100) return '.';
	// if (v < 150) return '-';
	if (v > 150){
		return true;
} else {
	return false
}

};

 
const onKeyUp = (e) => {
	text = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);


async function start(){

	ZirkonBold.load().then(function(font){
		document.fonts.add(font);
	})

	ZirkonLight.load().then(function(font){
		document.fonts.add(font);
	})
	
	manager = await canvasSketch(sketch, settings);
};


start();





/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

const start = async () => {
	const img = await loadMeSomeImage(url);
	console.log('image width', img.width);
	console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/
