let MAINBOARD_OFFSET = [0, 0];

let CurrentPlanetPosition = [0,0,0,0,0,0]
const EarthPositions = [[328,174], [328,286]]
const MarsPositions = [[255,300],[255,160], [449,244]]
const JupiterPositions = [
    [352,328], [182, 286], [206, 160], [400,132], [497,244]
]
const SaturnPositions = [
    [110,244], [182, 118], [376,90], [497,160], [521,286], [376,370], [206,356]
]
const UranusPositions = [
    [110,329], [85,174], [206, 76], [376,62], [521,118], [595,244], [521,342], [376,398], [231,398]
]
const NeptunPositions = [
    [61,160], [182, 63], [328,34], [449,48], [570,118], [619,230], [570,342], [425,426], [279,426], [158,384], [61,301]
]
const Planets = [EarthPositions, MarsPositions, JupiterPositions, SaturnPositions, UranusPositions, NeptunPositions]

function handleClick(asd) {
    //alert('Clicked on the specified area!' + asd);
    console.log('Clicked on the specified area!' + asd)
    // You can replace the alert with your custom logic
}

function getImagePosition() {
    var image = document.getElementById('mainboard');
    var rect = image.getBoundingClientRect();
    MAINBOARD_OFFSET[0] =rect.left
    MAINBOARD_OFFSET[1] =rect.top
}

function getPosition(time_spent)
{
    const SIZE_TIMEBOX = 23.4
    var time_space = time_spent % 75
    var x_pos = 0
    var y_pos = 0

    if( 0 <= time_space && time_space < 11)
    {
        x_pos = 0
        y_pos = (11 - time_space) * SIZE_TIMEBOX
    }
    else if(11 <= time_space && time_space <= 40)
    {
        x_pos = (time_space - 11) * SIZE_TIMEBOX
        y_pos = 0
    }
    else if( 40 < time_space && time_space <= 60)
    {
        x_pos = 29 * SIZE_TIMEBOX
        y_pos = (time_space - 40) * SIZE_TIMEBOX
    }
    else if( 60 < time_space && time_space < 75)
    {
        x_pos = (89 - time_space) * SIZE_TIMEBOX
        y_pos = 20*SIZE_TIMEBOX
    }
    x_pos += 1 + MAINBOARD_OFFSET[0]
    y_pos += 1 + MAINBOARD_OFFSET[1]
    return [x_pos.toString(), y_pos.toString()]
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}
  

function createTimeSpaces()
{
    //let allTU = []
    for (let i = 0; i <= 74; i++) {
        //allTU.push(getPosition(i))
        let newDiv = document.createElement('div');
        let position = getPosition(i)
        newDiv.className = 'square';
        newDiv.id = 'TU_' + i
        newDiv.addEventListener('click', function(){
            handleClick(i)});
        newDiv.style.left = position[0] + 'px'
        newDiv.style.top = position[1] + 'px'
        document.body.appendChild(newDiv);
      }
    //console.log(allTU)
}

function createHexSpaces()
{
    for(let planet=0;planet<Planets.length;planet++){
        for(let i=0;i<Planets[planet].length;i++){
            let newDiv = document.createElement('div');
            let position = Planets[planet][i]
            newDiv.className = 'hex';
            newDiv.id = 'Planet_' + planet + "_" + i
            newDiv.addEventListener('click', function(){
                handleClick("Neptun" + i)});
            newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
            newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
            document.body.appendChild(newDiv);
        }
    }
}

function setup()
{
    let planet_markers = ['earth_marker', 'mars_marker', 'jupiter_marker', 'saturn_marker', 'uranus_marker', 'neptun_marker']
    for(let marker=0;marker<planet_markers.length;marker++){
        let image = document.getElementById(planet_markers[marker]);
        image.style.left = Planets[marker][CurrentPlanetPosition[marker]][0] + MAINBOARD_OFFSET[0] + 'px'
        image.style.top = Planets[marker][CurrentPlanetPosition[marker]][1] + MAINBOARD_OFFSET[1] + 'px'
        image.style.position = 'absolute';
        console.log(image.style.left)
    }
}


function handleMouseClick(event) {
    // Get the mouse coordinates
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Log the coordinates to the console (you can use them as needed)
    console.log(`Mouse Click Position: X=${mouseX}, Y=${mouseY}`);
}

function handleResize() {
    location.reload()
}

// Call the function when the page is loaded
window.onload = function () {
    getImagePosition();
    //setup()
    createTimeSpaces();
    createHexSpaces();
    
    Math.seedrandom('holymoly');

    // Generate pseudo-random numbers
    for (let i = 0; i < 5; i++) {
        const randomNum = Math.random();
        console.log(`Random number ${i + 1}: ${randomNum}`);
    }
    // Used like so
    var arr = [2, 11, 37, 42];
    shuffle(arr);
    console.log(arr);
};
document.addEventListener('click', handleMouseClick);
window.addEventListener('resize', handleResize);

