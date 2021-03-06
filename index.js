var myPageSize = 'a1';

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

var mylat = map(-89,-90,90,-10,10);
var mylng = map(0,-180,180,-10,10);
var myloc = "South Pole"

let myLoc = [{
    'id': 'seoul',
    'city': 'Seoul, Korea',
    'lat': map(37.5,-90,90,-10,10),
    'lng': map(127,-180,180,-10,10),
    'speaker':'Yehwan Song',
    'intro':`Anti-user-friendlygt/indieweb`
},{
    'id': 'lisbon',
    'city': 'Lisbon, Portugal',
    'lat': map(37.8723,-90,90,-10,10),
    'lng': map(-9.14,-180,180,-10,10),
    'speaker':'Braulio Amado',
    'intro':'BAD STUDIO'
},{
    'id': 'newyork',
    'city': 'New York, United States',
    'lat': map(40.7,-90,90,-10,10),
    'lng': map(-74,-180,180,-10,10),
    'speaker':'Laurel Schwulst',
    'intro':'Fruitful School'
},{
    'id': 'beijing',
    'city': 'Beijing, China',
    'lat': map(39.9,-90,90,-10,10),
    'lng': map(116.4,-180,180,-10,10),
    'speaker':'Ronald Tau',
    'intro':'meat.studio'
}]


//setting default poster to Laurel's
let lat=map(40.7,-90,90,-10,10), lng=map(-74,-180,180,-10,10), speaker='Laurel Schwulst', city='New York, United States', intro='Fruitful School';
document.getElementById('newyork').checked = true;


var ZirkonBold = new FontFace('ZirkonBold', 'url(assets/GT-Zirkon-Bold-Trial.otf)');
var ZirkonLight = new FontFace('ZirkonLight', 'url(assets/GT-Zirkon-Ultra-Light-Trial.otf)');

const settings = {
	dimensions: 'a1',
	pixelsPerInch: 300,
	
};


let text = 'ANGLES';
let fontSize = 200;
let fontFamily = 'HELVETICA';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;


function posterSize(page){


    //setting up the canvas for print-ready in A1 size----
    // const dpr = window.devicePixelRatio;

    const dpr = 1;
    const dpi = 300;
    let w,h;

    if (page =='a1'){
            
    w = 23.39;
    h = 33.11; //inches
    } else {
            
    w = 8.25;
    h = 11.75; //a4

    }

    // const dpi = 300;
    // let a1w = 23.39;
    // let a1h = 33.11; //inches
    //14034 19866

    
    // let a1w = 8.25;
    // let a1h = 11.75; //inches


    canvas.width = w * dpi * dpr;
    canvas.height = h * dpi * dpr;
    context.scale(dpr, dpr);

    //end of sizing------------------------------

}


function resizeDouble(newPageSize){
    if (newPageSize == 'a4'){
        return 2
    }else{
        return 1
    }
}

function resize(number, newPageSize){
    if (newPageSize == 'a4'){
        
        return (number/23.39)*8.25;

    } else {
        return number
    }
}

function sketch(pageSize){
	
    posterSize(pageSize);


    width = canvas.width;
    height = canvas.height;


        // context.fillStyle = 'rgb(200, 0, 0)';
        // context.fillRect(10, 10, 50, 50);

        const typeCanvas = document.createElement('canvas');
        const typeContext = typeCanvas.getContext('2d');

        const nameCanvas = document.createElement('canvas');
        const nameContext = nameCanvas.getContext('2d');

        document.getElementById('canvas').appendChild(typeCanvas); 
        document.getElementById('canvas').appendChild(nameCanvas); 

	const cell = resize(160,pageSize) 

	const cols = Math.floor(width * 1.5 / cell) 
	const rows = Math.floor(height  * 1.5 / cell) 
	const numCells = cols * rows;

    console.log('a4', cols, rows, cell)
    console.log('a1', Math.floor(14034 * 1.5 / 160),  Math.floor(19866  * 1.5 / 160) )

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
		
		// typeContext.beginPath();
		// typeContext.rect(mx, my, mw, mh);
		// typeContext.stroke();

		
		typeContext.fillText(text, 0, 0);
		typeContext.restore();

		const typeData = typeContext.getImageData(0, 0, cols, rows).data;
		
		//----others
    	let rr = Math.floor(height / 6);
        let titleSize = resize(200,pageSize)

        nameContext.save()

            nameContext.translate(resize(width/20,pageSize), resize(height/15,pageSize));
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
            nameContext.fillText(intro, 0, titleSize*1.2);
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

		// context.drawImage(typeCanvas, 0, 0);

		context.drawImage(nameCanvas, 0, 0);

		drawAngles(numCells, cols, typeData, cell, context, resize(1000,pageSize), resize(-1800,pageSize), pageSize);

		drawAngles(numCells, cols, typeData, cell, context, resize(-4000, pageSize), resize(700,pageSize), pageSize)

		drawStars(resize(100, pageSize), context, width, height, pageSize)

		drawRect(context, width, height, resize(40,pageSize), pageSize)

        drawSmallCanvas(mylat,mylng,lat,lng, myloc, city);

		//end of name grid
	
};

function drawSmallCanvas(mylat,mylng,lat,lng, myloc, city){


    const smallcanvas = document.getElementById('smallcanvas');
    const smallcontext = smallcanvas.getContext('2d');

    // smallcontext.scale(dpr, dpr)

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

function drawRect(context, width, height, scale, pageSize){

	const rows = Math.floor(height / 6);

	for (let j = 0; j < 6; j++) {

		context.save();

		context.translate(width/6, j*rows - rows);
		context.translate(rows/3, rows/2)
		// context.translate(mylat,mylng);

		context.beginPath(); 
		context.strokeStyle = 'white';
		context.lineWidth = resize(200, pageSize);

		context.moveTo(mylng*scale, rows - mylat*scale);
		// context.moveTo(0,0);
		context.lineTo(lng*scale, rows - lat*scale);
		
		context.stroke();


		context.restore();
	}

}

function drawStars(cell, context, width, height, pageSize){

	const cols = Math.floor(width  / cell) ;
	const rows = Math.floor(height / cell) ;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {

		context.save();
        
        if (getRandom(0.6)){
            const size = randomSize(i * cell, j * cell, pageSize);
            context.fillRect(i * cell, j * cell, size, size);	
        }

			
		context.restore();
		}
	}

}


function drawAngles(numCells, cols, typeData, cell, context, myX = 0, myY = 0, pageSize){


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

        // context.fillRect(x, y,20,20)

		context.save();
		context.translate(x+myX, y+myY);
		context.translate(cell * 0.5, cell * 0.5);

		let scale2 = resize(Math.floor(Math.random() * 20),pageSize)

		if (isrow ){
			context.beginPath(); 

			context.strokeStyle = 'white';
			context.lineWidth = resize(5,pageSize);
			// context.moveTo(resize(200,pageSize),0);
			// context.lineTo(resize(-50,pageSize),0);

            context.moveTo(resize(100,pageSize),0);
			context.lineTo(resize(-50,pageSize),0);
			// context.arc(0, 0, 20, 10, Math.PI/4);
			context.stroke();
		}

		if (isrow && randomPick ){
				context.beginPath(); 

				context.strokeStyle = 'white';
				context.lineWidth = resize(5,pageSize);;
				context.moveTo(0,resize(-100,pageSize));
				context.lineTo(0,resize(150,pageSize));
				
				context.stroke();
			}

			if (isRowRow(r) ){
				context.beginPath(); 

				context.strokeStyle = 'white';
				context.lineWidth = resize(25,pageSize);

				// context.translate(mylat,mylng);
                // context.moveTo(0,0);

				context.moveTo(mylng*scale2, (cell + cell * 0.5 - mylat*scale2));
			
				context.lineTo(lng*scale2, (cell + cell * 0.5- lat*scale2));
				
				context.stroke();

                // console.log('draw',  x + myX+ mylng*scale2, y+ myY + cell + cell * 0.5 - mylat*scale2)

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

const randomSize = (x,y, pageSize)=>{

	// const n = random.noise3D(x, y, 0.01, 1);
    const n = Math.random();

    const scale = map(n, 0, 1, resize(1, pageSize), resize(10,pageSize));
    // const scale = map(n, 0, 1, 1, 10);
   
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


async function start(pageSize){

	ZirkonBold.load().then(function(font){
		document.fonts.add(font);

        ZirkonLight.load().then(function(font){
            document.fonts.add(font);

            sketch(pageSize);

        })

	})	
	
};


start('a1');


function download() {

    const downloadUrl = canvas.toDataURL();

    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save(`Angles_Poster_${myPageSize}_${speaker}.pdf`);

    // const a = document.createElement("a");
    // a.href = downloadUrl;
    // a.setAttribute("download", `Angles_Poster_${myPageSize}_${speaker}`);
    // a.click();
  }

function generate(pageSize) {

    myPageSize = pageSize;
    start(pageSize)
   
  }


  async function searchMyLocation(){
    let q = document.getElementById('mylocation').value;
    myloc = q;
    let query = 'https://nominatim.openstreetmap.org/search?q=' + q + '&format=geojson';

   fetch(query)
    .then((resp) => resp.json())
    .then((d) => { 
        
        mylat = map(d.features[0].geometry.coordinates[1],-90,90,-10,10);
        mylng = map(d.features[0].geometry.coordinates[0],-180,180,-10,10);

        console.log(d.features[0].geometry.coordinates)
        console.log('updatelatlng', mylat, mylng)

        context.clearRect(0, 0, width, height);
        start('a1');
    })
    

}


//switch between designers
function whichLocation(id){

    myLoc.forEach((d)=>{
        if (d.id == id){
            lat = d.lat;
            lng = d.lng;
            speaker = d.speaker;
            city = d.city,
            intro = d.intro
        }
    })

    document.querySelectorAll('.designerRadio').forEach( (s) => {
     
        s.checked = false;
    }) 
    document.getElementById(id).checked = true;

    context.clearRect(0, 0, width, height);
    start('a1');

}

