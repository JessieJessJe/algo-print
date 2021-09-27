// const canvasSketch = require('canvas-sketch');
// const random = require('canvas-sketch-util/random');
// const math = require('canvas-sketch-util/math');

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

let myLoc = [{
    'id': 'seoul',
    'city': 'Seoul, Korea',
    'lat': map(37.5,-180,180,-10,10),
    'lng': map(127,-180,180,-10,10),
    'speaker':'Yehwan Song'
},{
    'id': 'lisbon',
    'city': 'Lisbon, Portugal',
    'lat': map(378.723,-180,180,-10,10),
    'lng': map(-9.14,-180,180,-10,10),
    'speaker':'Braulio Amado'
},{
    'id': 'newyork',
    'city': 'New York, United States',
    'lat': map(40.7,-180,180,-10,10),
    'lng': map(-74,-180,180,-10,10),
    'speaker':'Laurel Schwulst'
},{
    'id': 'beijing',
    'city': 'Beijing, China',
    'lat': map(39.9,-180,180,-10,10),
    'lng': map(116.4,-180,180,-10,10),
    'speaker':'Ronald Tau'
}]

//seoul
// const lat = map(37.5,-180,180,-10,10);
// const lng = map(127,-180,180,-10,10);


//lisbon
// const lat = math.mapRange(378.723,-180,180,-10,10);
// const lng = math.mapRange(-9.14,-180,180,-10,10);

//nyc
// const lat = math.mapRange(40.7,-180,180,-10,10);
// const lng = math.mapRange(-74,-180,180,-10,10);

//beijing
// const lat = math.mapRange(39.9,-180,180,-10,10);
// const lng = math.mapRange(116.4,-180,180,-10,10);

let mylat = map(40.7,-180,180,-10,10),
    mylng = map(-74,-180,180,-10,10);

let lat=map(40.7,-180,180,-10,10), lng=map(-74,-180,180,-10,10), speaker='Laurel Schwulst', city='New York, United States';



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

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//setting up the canvas for print-ready in A1 size----
const dpr = window.devicePixelRatio;

const dpi = 300;
let a1w = 23.39;
let a1h = 33.11; //inches

canvas.width = a1w * dpi * dpr;
canvas.height = a1h * dpi * dpr;
context.scale(dpr, dpr);

//end of sizing------------------------------


const width = canvas.width;
const height = canvas.height;

console.log(width, height)

context.fillStyle = 'rgb(200, 0, 0)';
context.fillRect(10, 10, 50, 50);

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const nameCanvas = document.createElement('canvas');
const nameContext = nameCanvas.getContext('2d');

document.getElementById('canvas').appendChild(typeCanvas); 
document.getElementById('canvas').appendChild(nameCanvas); 

//once customized location submitted
function setMyLocation(){
    let mylat0 = parseFloat(document.getElementById('mylat').value)
    let mylng0 = parseFloat(document.getElementById('mylng').value)

    mylat = map(mylat0,-180,180,-10,10);
    mylng = map(mylng0,-180,180,-10,10);

    context.clearRect(0, 0, width, height);

    console.log('submit',mylat)
    start()
}

//once chose another designer
function whichLocation(id){

    myLoc.forEach((d)=>{
        if (d.id == id){
            lat = d.lat;
            lng = d.lng;
            speaker = d.speaker;
            city = d.city
        }
    })

    context.clearRect(0, 0, width, height);
    start();

}


function sketch(){
	
	const cell = 160;

	const cols = Math.floor(width * 1.5 / cell);
	const rows = Math.floor(height  * 1.5 / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	nameCanvas.width  = width;
	nameCanvas.height = height;

	


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
    	let rr = Math.floor(height / 6);
        let titleSize = 200

        nameContext.save()

            nameContext.translate(width/20, width/15);
            // nameContext.translate(0, rr/2)

            nameContext.fillStyle = 'white'
            nameContext.textBaseline = 'top';
            nameContext.textAlign = 'left';

            nameContext.font =`${titleSize}px ZirkonBold`;
            nameContext.fillText(speaker, 0, 0);
            nameContext.fillText(city, 0, rr);

            nameContext.font =`${titleSize * 1.5}px ZirkonBold`;
            nameContext.fillText('ANGLES', 12 * (width/20), titleSize*1.2 + rr);

            nameContext.font =`${titleSize}px ZirkonLight`;
            nameContext.fillText('Artist, Designer, Educator', 0, titleSize*1.2);
            nameContext.fillText('October 12 at Noon', 0, titleSize*1.2 + rr);

            nameContext.font =`${titleSize*1.5}px ZirkonLight`;
            nameContext.fillText('Perspectives', 12 * (width/20), 2*titleSize*1.5 + rr);
            nameContext.fillText('in Design', 12 * (width/20), 2*titleSize*1.5+titleSize*1.6 + rr);

            

        nameContext.restore()

        

     

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
        
        if (getRandom(0.6)){
            const size = randomSize(i * cell,j * cell);
            context.fillRect(i * cell, j * cell, size, size);	
        }

			
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

function getRandom(p) {

    if (Math.random()>p){ return true} else {return false};

}


const randomPick = () => {
	// return random.pick([true,false,false,false]);
    return getRandom(0.75);
}

const randomSize = (x,y)=>{

	// const n = random.noise3D(x, y, 0.01, 1);
    const n = Math.random();

    const scale = map(n, 0, 1, 1, 10);
   
	return scale
	
}

const isRow = (v,row) => {
	// if (v < 50) return '';
	// if (v < 100) return '.';
	// if (v < 150) return '-';
	if (v > 150){
		// return random.pick([true,false]);
        return getRandom(0.5);
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

 
// const onKeyUp = (e) => {
// 	text = e.key.toUpperCase();
// 	manager.render();
// };

// document.addEventListener('keyup', onKeyUp);


async function start(){

	ZirkonBold.load().then(function(font){
		document.fonts.add(font);

        ZirkonLight.load().then(function(font){
            document.fonts.add(font);

            sketch();

        })

	})


	
	
};


start();


function download() {
    const downloadUrl = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.setAttribute("download", `Angles_EventPoster_${speaker}`);
    a.click();
  }

// document.getElementById('seoul').onclick = whichLocation(this.id);
// document.getElementById('beijing').onclick = whichLocation(this.id);
// document.getElementById('newyork').onclick = whichLocation(this.id);
// document.getElementById('lisbon').onclick = whichLocation(this.id);
