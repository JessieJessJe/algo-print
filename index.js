
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

var mylat = map(-89,-90,90,-10,10);
var mylng = map(0,-180,180,-10,10);
var myloc = "South Pole"

let myLoc = [{
    'id': 'seoul',
    'city': 'Seoul, Korea',
    'lat': map(37.5,-90,90,-10,10),
    'lng': map(127,-180,180,-10,10),
    'speaker':'Yehwan Song'
},{
    'id': 'lisbon',
    'city': 'Lisbon, Portugal',
    'lat': map(37.8723,-90,90,-10,10),
    'lng': map(-9.14,-180,180,-10,10),
    'speaker':'Braulio Amado'
},{
    'id': 'newyork',
    'city': 'New York, United States',
    'lat': map(40.7,-90,90,-10,10),
    'lng': map(-74,-180,180,-10,10),
    'speaker':'Laurel Schwulst'
},{
    'id': 'beijing',
    'city': 'Beijing, China',
    'lat': map(39.9,-90,90,-10,10),
    'lng': map(116.4,-180,180,-10,10),
    'speaker':'Ronald Tau'
}]


//setting default poster to Laurel's
let lat=map(40.7,-90,90,-10,10), lng=map(-74,-180,180,-10,10), speaker='Laurel Schwulst', city='New York, United States';
document.getElementById('newyork').checked = true;


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


context.fillStyle = 'rgb(200, 0, 0)';
context.fillRect(10, 10, 50, 50);

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const nameCanvas = document.createElement('canvas');
const nameContext = nameCanvas.getContext('2d');

document.getElementById('canvas').appendChild(typeCanvas); 
document.getElementById('canvas').appendChild(nameCanvas); 

//once customized location submitted
// function setMyLocation(){
//     let mylat0 = parseFloat(document.getElementById('mylat').value)
//     let mylng0 = parseFloat(document.getElementById('mylng').value)

//     mylat = map(mylat0,-180,180,-10,10);
//     mylng = map(mylng0,-180,180,-10,10);

//     context.clearRect(0, 0, width, height);

//     console.log('submit',mylat)
//     start()
// }

async function searchMyLocation(){
    let q = document.getElementById('mylocation').value;
    myloc = q;
    let query = 'https://nominatim.openstreetmap.org/search?q=' + q + '&format=geojson';

    console.log('query', query)

   fetch(query)
    .then((resp) => resp.json())
    .then((d) => { 
        
        mylat = map(d.features[0].geometry.coordinates[1],-90,90,-10,10);
        mylng = map(d.features[0].geometry.coordinates[0],-180,180,-10,10);

        console.log(d.features[0].geometry.coordinates)
        console.log('updatelatlng', mylat, mylng)

        context.clearRect(0, 0, width, height);
        start();
    })
    

}


//switch between designers
function whichLocation(id){

    myLoc.forEach((d)=>{
        if (d.id == id){
            lat = d.lat;
            lng = d.lng;
            speaker = d.speaker;
            city = d.city
        }
    })

    document.querySelectorAll('.designerRadio').forEach( (s) => {
        // s.setAttribute("checked", "false");
        s.checked = false;
    }) 
    document.getElementById(id).checked = true;

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

		drawRect(context, width, height, 40)

        drawSmallCanvas(mylat,mylng,lat,lng, myloc, city);

		//end of name grid
	
};

function drawSmallCanvas(mylat,mylng,lat,lng, myloc, city){


    const smallcanvas = document.getElementById('smallcanvas');
    const smallcontext = smallcanvas.getContext('2d');

    smallcontext.scale(dpr, dpr)

    smallcontext.fillStyle = "#d3d3d3";
    smallcontext.fillRect(0, 0, smallcanvas.width, smallcanvas.height);

    

    mylat = map(mylat,-10,10, 0, smallcanvas.height);
    mylng = map(mylng,-10,10, 0, smallcanvas.width);

    lat = map(lat,-10,10, 0, smallcanvas.height);
    lng = map(lng,-10,10, 0, smallcanvas.width);

    city = city.split(',')[0].trim();

    let latunit = smallcanvas.height / 180;
    for (let j=0; j<180; j++){

        if (j%10 == 1){

            smallcontext.strokeStyle = 'black';
            smallcontext.lineWidth = 0.1;
            smallcontext.beginPath();
            smallcontext.moveTo(0, j*latunit);
            smallcontext.lineTo(smallcanvas.width,j*latunit)
            smallcontext.stroke();
        }

    }

    let lngunit = smallcanvas.width / 360;
    for(let i=0; i<360; i++){

        if (i%10 == 1){

            smallcontext.strokeStyle = 'black';
            smallcontext.lineWidth = 0.1;
            smallcontext.beginPath();
            smallcontext.moveTo(i*lngunit, 0)
    
            // smallcontext.moveTo(0, 0)
            smallcontext.lineTo(i*lngunit, smallcanvas.height)
            smallcontext.stroke();

        }

    }

    console.log(lngunit, latunit);

    smallcontext.save()
    // smallcontext.translate(smallcanvas.width/2, 0 )

    smallcontext.beginPath();
    smallcontext.strokeStyle = 'white';
    smallcontext.lineWidth = 30;
    smallcontext.moveTo(mylng, smallcanvas.height - mylat);
    smallcontext.lineTo(lng, smallcanvas.height - lat);
    smallcontext.stroke();

    smallcontext.fillStyle = 'black';
    smallcontext.font =`10px ZirkonLight`;
    smallcontext.textAlign = "center";
    smallcontext.fillText(myloc, mylng, smallcanvas.height - mylat);
    smallcontext.fillRect(mylng, smallcanvas.height - mylat, 5,5)
    smallcontext.fillRect(lng, smallcanvas.height - lat, 5,5)
    smallcontext.fillText(city, lng, smallcanvas.height - lat);

    smallcontext.restore();

    // nameContext.font =`${titleSize}px ZirkonBold`;
    // nameContext.fillText(speaker, 0, 0);

}

function drawRect(context, width, height,scale){

	const rows = Math.floor(height / 6);

	for (let j = 0; j < 6; j++) {

		context.save();

		context.translate(width/6, j*rows - rows);
		context.translate(rows/3, rows/2)
		// context.translate(mylat,mylng);

		context.beginPath(); 
		context.strokeStyle = 'white';
		context.lineWidth = 200;

		context.moveTo(mylng*scale, rows - mylat*scale);
		// context.moveTo(0,0);
		context.lineTo(lng*scale, rows - lat*scale);
		
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

				// context.translate(mylat,mylng);
                // context.moveTo(0,0);

				context.moveTo(mylng*scale2, cell + cell * 0.5 - mylat*scale2);
			
				context.lineTo(lng*scale2, cell + cell * 0.5- lat*scale2);
				
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
