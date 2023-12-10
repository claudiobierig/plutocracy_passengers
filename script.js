let MAINBOARD_OFFSET = [0, 0];
const PLANET_POSITION_OFFSET = [-3, 5]
const SHIP_OFFSET = [1, 2]
const TIME_MARKER_OFFSET = [3, 3]

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

const TU_POSITIONS = [[1,258.4],[1,235],[1,211.6],[1,188.2],[1,164.8],[1,141.4],[1,118],[1,94.6],[1,71.2],[1,47.8],[1,24.4],[1,1],[24.4,1],[47.8,1],[71.2,1],[94.6,1],[118,1],[141.4,1],[164.8,1],[188.2,1],[211.6,1],[235,1],[258.4,1],[281.8,1],[305.2,1],[328.6,1],[352,1],[375.4,1],[398.8,1],[422.2,1],[445.6,1],[469,1],[492.4,1],[515.8,1],[539.2,1],[562.6,1],[586,1],[609.4,1],[632.8,1],[656.2,1],[679.6,1],[679.6,24.4],[679.6,47.8],[679.6,71.2],[679.6,94.6],[679.6,118],[679.6,141.4],[679.6,164.8],[679.6,188.2],[679.6,211.6],[679.6,235],[679.6,258.4],[679.6,281.8],[679.6,305.2],[679.6,328.6],[679.6,352],[679.6,375.4],[679.6,398.8],[679.6,422.2],[679.6,445.6],[679.6,469],[656.2,469],[632.8,469],[609.4,469],[586,469],[562.6,469],[539.2,469],[515.8,469],[492.4,469],[469,469],[445.6,469],[422.2,469],[398.8,469],[375.4,469],[352,469]];

let TimeSpent = 0
let CurrentPlanetPosition = [0, 0, 0, 0, 0, 0]
let SpacePosition = [0, 0]

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
    var time_space = time_spent % 75
    /*const SIZE_TIMEBOX = 23.4
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
    x_pos += 1 
    y_pos += 1 
    return [x_pos, y_pos]*/
    return [TU_POSITIONS[time_space][0], TU_POSITIONS[time_space][1]]
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
    let allTU = []
    for (let i = 0; i <= 74; i++) {
        allTU.push(getPosition(i))
        let newDiv = document.createElement('div');
        let position = getPosition(i)
        newDiv.className = 'square';
        newDiv.id = 'TU_' + i
        newDiv.addEventListener('click', function(){
            handleClick(i)});
        newDiv.style.left = position[0] + MAINBOARD_OFFSET[0] + 'px'
        newDiv.style.top = position[1] + MAINBOARD_OFFSET[1] + 'px'
        document.body.appendChild(newDiv);
      }
    console.log(allTU)
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
        image.style.left = Planets[marker][CurrentPlanetPosition[marker]][0] + MAINBOARD_OFFSET[0] + PLANET_POSITION_OFFSET[0] + 'px'
        image.style.top = Planets[marker][CurrentPlanetPosition[marker]][1] + MAINBOARD_OFFSET[1] + PLANET_POSITION_OFFSET[1] + 'px'
        image.style.position = 'absolute';
        image.style.display = 'block';
    }

    let ship_marker = document.getElementById('ship_marker');
    ship_marker.style.left = MAINBOARD_OFFSET[0] + Planets[SpacePosition[0]][SpacePosition[1]][0] + SHIP_OFFSET[0] + 'px'
    ship_marker.style.top = MAINBOARD_OFFSET[1] + Planets[SpacePosition[0]][SpacePosition[1]][1] + SHIP_OFFSET[1] + 'px'
    ship_marker.style.position = 'absolute';
    ship_marker.style.display = 'block';

    let time_marker = document.getElementById('time_marker');
    time_marker.style.left = MAINBOARD_OFFSET[0] + TU_POSITIONS[0][0] + TIME_MARKER_OFFSET[0] + 'px'
    time_marker.style.top = MAINBOARD_OFFSET[1] + TU_POSITIONS[0][1] + TIME_MARKER_OFFSET[1] + 'px'
    time_marker.style.position = 'absolute';
    time_marker.style.display = 'block';
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
    createTimeSpaces();
    createHexSpaces();
    setup()
    
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

